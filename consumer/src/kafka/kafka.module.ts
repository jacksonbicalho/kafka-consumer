import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaService } from './kafka.service';

@Global()
@Module({})
export class KafkaModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: KafkaModule,
      imports: [ConfigModule],
      providers: [KafkaService],
      exports: [KafkaService, ConfigModule],
    };
  }
}
