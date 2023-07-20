import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import compression from '@fastify/compress'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { HttpAdapterHost } from '@nestjs/core'

export async function configure(
  app: NestFastifyApplication,
): Promise<NestFastifyApplication> {
  // logger
  const logger = app.get(Logger)
  app.useLogger(logger)
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  logger.debug('loaded: Logger')

  // prisma
  const prismaService: PrismaService = app.get(PrismaService)
  // @ts-ignore
  prismaService.$on('query', async (e: any) => {
    let queryString = e.query
    JSON.parse(e.params).forEach((param, index) => {
      queryString = queryString.replace(
        `$${index + 1}`,
        typeof param === 'string' ? `'${param}'` : param,
      )
    })
    logger.debug(queryString)
  })

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
  logger.debug('loaded: PrismaService')

  // dto validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  logger.debug('loaded: ValidationPipe')

  // versioning
  app.enableVersioning({
    type: VersioningType.URI,
  })

  // swagger
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('App API')
      .setDescription('The API description of App')
      .setVersion('1.0')
      .addTag('App')
      .build(),
  )
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'App Doc',
    // customfavIcon: '',
  })
  logger.debug('loaded: SwaggerModule')

  // cors
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: true,
    credentials: true,
  })

  // compression
  app.register(compression, { encodings: ['gzip', 'deflate'] })

  return app
}
