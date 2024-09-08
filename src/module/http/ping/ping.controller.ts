import { Controller, Get, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PingService } from "./ping.service";

@Controller({
	path: "/",
	version: VERSION_NEUTRAL,
})
@ApiTags("Ping")
export class PingController {
	constructor(private readonly pingService: PingService) {}

	@Get("/ping")
	@ApiOperation({ summary: "Ping" })
	async ping(): Promise<string> {
		return this.pingService.ping();
	}

	@Get("/hello")
	@ApiOperation({ summary: "Hello" })
	async hello(@Query("name") name: string): Promise<string> {
		return `Hello, ${name}!`;
	}
}
