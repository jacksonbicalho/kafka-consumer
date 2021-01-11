import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';

@Injectable()
export class AppService {

  constructor(private KafkaService: KafkaService) {
    this.KafkaService.onModuleInit();
  }

}