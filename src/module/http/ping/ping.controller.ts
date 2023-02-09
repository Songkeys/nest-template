import { Controller, Get, Param, Query, VERSION_NEUTRAL } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PingService } from './ping.service'

@Controller({
  path: '/',
  version: VERSION_NEUTRAL,
})
@ApiTags('Ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get('/ping')
  @ApiOperation({ summary: 'Ping' })
  async ping(): Promise<string> {
    return this.pingService.ping()
  }
}
