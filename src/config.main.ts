import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { PrismaService } from '@/module/prisma/prisma.service'
import compression from '@fastify/compress'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export async function configure(
  app: NestFastifyApplication,
): Promise<NestFastifyApplication> {
  // logger
  const logger = app.get(Logger)
  app.useLogger(logger)
  logger.debug('loaded: Logger')

  app.useGlobalInterceptors(new LoggerErrorInterceptor())

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

  // prisma
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  logger.debug('loaded: PrismaService')

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
