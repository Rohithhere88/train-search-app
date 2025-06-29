package com.example.trainsearch.model;

import lombok.Data;
import jakarta.persistence.*;
@Data
@Entity
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}

