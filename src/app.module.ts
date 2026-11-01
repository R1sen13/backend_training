import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './app/health/health.module';
import { environmentConfig } from './config/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentConfig,
    }),
    HealthModule,
  ],
})
export class AppModule {}
