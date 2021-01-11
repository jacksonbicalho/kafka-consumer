import { KafkaConfig, ConsumerConfig } from 'kafkajs';

export default () => ({

    KafkaConfig: <KafkaConfig>{
        clientId: process.env.KAFKA_CLIENT_ID || 1,
        brokers: [process.env.KAFKA_BROKERS],
    },

    ConsumerConfig: <ConsumerConfig>{
        groupId: process.env.CONSUMER_CONFIG_GROUP_ID
    },

    TopicConfig: process.env.CONSUMER_CONFIG_TOPIC

});