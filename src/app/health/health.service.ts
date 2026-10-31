import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor() {}

  health(): string {
    return 'This server is running';
  }
}
