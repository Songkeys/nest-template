import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { HttpModule } from "./http/http.module";
import { LoggerModule } from "./logger/logger.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";
import { ThrottlerModule } from "./throttler/throttle.module";

@Module({
	imports: [
		ConfigModule,
		LoggerModule,
		PrismaModule,
		RedisModule,
		HttpModule,
		ThrottlerModule,
	],
})
export class AppModule {}
