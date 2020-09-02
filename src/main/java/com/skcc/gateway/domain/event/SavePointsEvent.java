package com.skcc.gateway.domain.event;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SavePointsEvent {

    Long userId;
    int points;


}
