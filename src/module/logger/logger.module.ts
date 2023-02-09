import { Module } from '@nestjs/common'
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino'
import { pino } from 'pino'
import { trace, context } from '@opentelemetry/api'
import { ConfigService } from '@nestjs/config'

const isProd = process.env.NODE_ENV === 'production'

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          pinoHttp: {
            // https://github.com/pinojs/pino-http#pinohttpopts-stream
            level: isProd ? 'info' : 'debug',
            transport: {
              targets: [
                {
                  target: isProd ? 'pino/file' : 'pino-pretty',
                  level: 'trace',
                  options: {
                    colorize: true,
                    translateTime: true,
                    singleLine: true,
                  },
                },
                isProd &&
                  configService.get('SENTRY_DSN') && {
                    target: 'pino-sentry-transport',
                    options: {
                      sentry: {
                        dsn: configService.get('SENTRY_DSN'),
                        // additional options for Sentry
                      },
                      withLogRecord: true, // default false - send the log record to sentry as a context.(if its more then 8Kb Sentry will throw an error)
                      minLevel: 40, // which level to send to sentry
                    },
                    level: 'error',
                  },
              ].filter(Boolean),
            },
            serializers: {
              err: pino.stdSerializers.err,
            },
            formatters: {
              log: (object) => {
                const span = trace.getSpan(context.active())
                if (!span) return object
                const { spanId, traceId } = trace
                  .getSpan(context.active())
                  ?.spanContext()
                object.span_id = spanId
                object.trace_id = traceId
                return object
              },
            },
          },
        }
      },
    }),
  ],
})
export class LoggerModule {}
