import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule as ThrottlerModule_ } from '@nestjs/throttler'
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis'

// https://github.com/nestjs/throttler

@Module({
  imports: [
    ThrottlerModule_.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          ttl: 60,
          limit: 1000,
          storage: new ThrottlerStorageRedisService(
            configService.get('REDIS_HOST'),
          ),
        }
      },
    }),
  ],
})
export class ThrottlerModule {}
