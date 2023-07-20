import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { PrismaService } from 'nestjs-prisma'

@Controller({
  path: 'prisma',
  version: VERSION_NEUTRAL,
})
@ApiExcludeController()
export class PrismaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/metrics')
  async getMetrics() {
    const metrics = await this.prisma.$metrics.prometheus({
      globalLabels: { server: 'nest_app', app_version: 'v1' },
    })

    return metrics
  }
}
