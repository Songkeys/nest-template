import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule as ThrottlerModule_, minutes } from '@nestjs/throttler'
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis'

// https://github.com/nestjs/throttler

@Module({
  imports: [
    ThrottlerModule_.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          throttlers: [
            {
              ttl: minutes(1),
              limit: 1000,
            },
          ],
          storage: new ThrottlerStorageRedisService(
            configService.get('REDIS_URL'),
          ),
        }
      },
    }),
  ],
})
export class ThrottlerModule {}
