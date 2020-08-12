package com.skcc.gateway.web.rest.errors;

public class UsePointsUnavailableException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    public UsePointsUnavailableException(){

    }

    public UsePointsUnavailableException(String message){
        super(message);
    }
}
