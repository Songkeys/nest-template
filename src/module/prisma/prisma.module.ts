import { Global, Logger, Module } from '@nestjs/common'
import { PrismaController } from './prisma.controller'
import { PrismaModule as PrismaModule_ } from 'nestjs-prisma'
import { Prisma } from '@prisma/client'

const logger = new Logger('PrismaModule')

@Global()
@Module({
  imports: [
    PrismaModule_.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log:
            process.env.NODE_ENV !== 'production'
              ? [{ emit: 'event', level: 'query' }]
              : undefined,
        },
        middlewares: [
          async (params, next) => {
            try {
              return await next(params)
            } catch (error) {
              if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
              ) {
                const { target } = error.meta
                logger.warn(`${error.message} (target: ${target};)`)
              } else {
                // otherwise, just throw the error
                throw error
              }
            }
          },
        ],
      },
    }),
  ],
  controllers: [PrismaController],
})
export class PrismaModule {}
