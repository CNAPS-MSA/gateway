package com.skcc.gateway.adaptor;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.concurrent.ExecutionException;

public interface GatewayProducer {

     void createRental(Long userId) throws ExecutionException, InterruptedException, JsonProcessingException;
}
