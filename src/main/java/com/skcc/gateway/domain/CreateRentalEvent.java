package com.skcc.gateway.domain;

public class CreateRentalEvent {

    private Long userId;

    public CreateRentalEvent(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
