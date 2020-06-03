package com.skcc.gateway.adaptor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skcc.gateway.config.KafkaProperties;
import com.skcc.gateway.domain.CreateRentalEvent;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Service
public class GatewayKafkaProducer {
    private final Logger log = LoggerFactory.getLogger(GatewayKafkaProducer.class);

    private static final String TOPIC = "topic_user";

    private final KafkaProperties kafkaProperties;

    private final static Logger logger = LoggerFactory.getLogger(GatewayKafkaProducer.class);
    private KafkaProducer<String, String> producer;
    private final ObjectMapper objectMapper = new ObjectMapper();


    public GatewayKafkaProducer(KafkaProperties kafkaProperties) {
        this.kafkaProperties = kafkaProperties;
    }

    @PostConstruct
    public void initialize(){
        log.info("Kafka producer initializing...");
        this.producer = new KafkaProducer<>(kafkaProperties.getProducerProps());
        Runtime.getRuntime().addShutdownHook(new Thread(this::shutdown));
        log.info("Kafka producer initialized");
    }

    public void createRental(Long userId){
        try {
            CreateRentalEvent createRentalEvent = new CreateRentalEvent(userId);
            String message = objectMapper.writeValueAsString(createRentalEvent);
            ProducerRecord<String, String> record = new ProducerRecord<>(TOPIC, message);
            producer.send(record);

        } catch (JsonProcessingException e) {
            logger.error("Could not send book List",e);
            e.printStackTrace();
        }
    }


    @PreDestroy
    public void shutdown(){
        log.info("Shutdown Kafka producer");
        producer.close();
    }
}
