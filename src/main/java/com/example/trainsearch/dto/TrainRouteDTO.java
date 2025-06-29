package com.example.trainsearch.dto;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class TrainRouteDTO {
    private String trainName;
    private String departureTime;
    private String arrivalTime;
    private int distance;
    private double price;
}

