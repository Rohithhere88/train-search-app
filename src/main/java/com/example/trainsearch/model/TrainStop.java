package com.example.trainsearch.model;

import jakarta.persistence.*;
import lombok.Data;
@Data

@Entity
public class TrainStop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Train train;

    @ManyToOne
    private Station station;

    private int distanceFromPrevious;
    private String departureTime;
}

