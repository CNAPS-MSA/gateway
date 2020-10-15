package com.skcc.gateway.adaptor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skcc.gateway.config.KafkaProperties;
import com.skcc.gateway.domain.event.UserIdCreated;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.concurrent.ExecutionException;

@Service
public class GatewayProducerImpl implements GatewayProducer {
    private final Logger log = LoggerFactory.getLogger(GatewayProducerImpl.class);

    private static final String TOPIC_RENTAL = "topic_rental";

    private final KafkaProperties kafkaProperties;

    private final static Logger logger = LoggerFactory.getLogger(GatewayProducerImpl.class);
    private KafkaProducer<String, String> producer;
    private final ObjectMapper objectMapper = new ObjectMapper();


    public GatewayProducerImpl(KafkaProperties kafkaProperties) {
        this.kafkaProperties = kafkaProperties;
    }

    @PostConstruct
    public void initialize(){
        log.info("Kafka producer initializing...");
        this.producer = new KafkaProducer<>(kafkaProperties.getProducerProps());
        Runtime.getRuntime().addShutdownHook(new Thread(this::shutdown));
        log.info("Kafka producer initialized");
    }

    public void createRental(Long userId) throws ExecutionException, InterruptedException, JsonProcessingException{

        UserIdCreated userIdCreated = new UserIdCreated(userId);
        String message = objectMapper.writeValueAsString(userIdCreated);
        producer.send(new ProducerRecord<>(TOPIC_RENTAL, message)).get();

    }


    @PreDestroy
    public void shutdown(){
        log.info("Shutdown Kafka producer");
        producer.close();
    }


}
