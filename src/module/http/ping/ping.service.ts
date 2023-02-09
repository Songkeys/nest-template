import { Injectable } from '@nestjs/common'

@Injectable()
export class PingService {
  async ping() {
    return 'pong'
  }
}
