import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisModule as RedisModule_ } from "@songkeys/nestjs-redis";

// https://github.com/songkeys/nestjs-redis/blob/main/docs/latest/redis.md

@Module({
	imports: [
		RedisModule_.forRootAsync({
			inject: [ConfigService],
			useFactory(configService: ConfigService) {
				return {
					config: {
						url: configService.get("REDIS_URL"),
					},
				};
			},
		}),
	],
})
export class RedisModule {}
