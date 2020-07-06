package com.skcc.gateway.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class LatefeeDTO implements Serializable {
    Long userId;
    int latefee;


}
