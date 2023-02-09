import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  INestApplication,
  Logger,
} from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    super({}) // options
  }

  async onModuleInit() {
    this.logger.debug('Connecting to Prisma...')
    await this.$connect()
    this.logger.debug('Connected to Prisma!')

    this.useIgnoreUniqueConstraintViolation()
  }

  private async useIgnoreUniqueConstraintViolation() {
    this.$use(async (params, next) => {
      try {
        return await next(params)
      } catch (e) {
        this.handleErrorOfUniqueConstraintViolation(e)
      }
    })
  }

  handleErrorOfUniqueConstraintViolation(
    error: unknown,
    { throwOtherwise = true }: { throwOtherwise?: boolean } = {},
  ) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const { target } = error.meta
      this.logger.warn(`${error.message} (target: ${target};)`)
    } else if (throwOtherwise) {
      // otherwise, just throw the error
      throw error
    }
  }

  handleErrorOfRecordNotFound(
    error: unknown,
    { throwOtherwise = true }: { throwOtherwise?: boolean } = {},
  ) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      const { cause } = error.meta
      this.logger.warn(`${error.message} (cause: ${cause};)`)
    } else if (throwOtherwise) {
      // otherwise, just throw the error
      throw error
    }
  }

  async onModuleDestroy() {
    this.logger.debug('Disconnecting from Prisma...')
    await this.$disconnect()
    this.logger.debug('Disconnected from Prisma!')
  }

  async enableShutdownHooks(app: INestApplication) {
    this.logger.debug('Enabling Prisma shutdown hooks...')
    this.$on('beforeExit', async () => {
      await app.close()
    })
    this.logger.debug('Enabled Prisma shutdown hooks!')
  }
}
