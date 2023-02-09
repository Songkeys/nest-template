import { AppModule } from '@/module/app.module'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { configure } from '@/config.main'

async function bootstrap() {
  const PORT = process.env.PORT || 3000

  let app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
      forceCloseConnections: true,
    }),
    { bufferLogs: true },
  )

  app = await configure(app)

  // start server
  await app.listen(PORT, '0.0.0.0') // to accept connections on other hosts

  const logger = new Logger('Bootstrap')
  logger.log(`Nest.js API is running on port ${PORT}: http://localhost:${PORT}`)
  logger.log(`API is running on port ${PORT}: http://localhost:${PORT}/docs`)
}

// process.on('warning', (e) => console.warn(e.stack));

bootstrap()
