import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './app/health/health.module';
import { environmentConfig } from './config/environment.config';
import { RedisModule } from './infrastructure/redis/redis.module';
import { StorageModule } from './infrastructure/storage/storage.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentConfig,
    }),
    RedisModule,
    StorageModule,
    PrismaModule,
    HealthModule,
  ],
})
export class AppModule {}
