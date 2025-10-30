package com.parkease.parkease_api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RadarGeocodeResponse {
    private List<RadarAddress> addresses;

    public List<RadarAddress> getAddresses(){
        return addresses;
    }

    public void setAddresses(List<RadarAddress> addresses){
        this.addresses = addresses;
    }
}
