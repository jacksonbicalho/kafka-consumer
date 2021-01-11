import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka, KafkaConfig } from 'kafkajs';


@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {

  private kafka: Kafka;
  private consumer: Consumer;
  private topic: string;

  constructor(private configService: ConfigService) {
    this.kafka = new Kafka(
      this.configService.get('KafkaConfig')
    );

    this.consumer = this.kafka.consumer(
      this.configService.get('ConsumerConfig')
    );

    this.topic = this.configService.get('TopicConfig')

  }

  async onModuleInit(): Promise<void> {

    this.connect();
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: false })

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(message.value.toString());
      },
    });
    this.consumer.seek({ topic: this.topic, partition: 0, offset: '0' })
  }

  async onModuleDestroy(): Promise<void> {
    await this.consumer.disconnect();
  }

  async connect() {
    await this.consumer.connect();
  }


}
