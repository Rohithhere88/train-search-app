package com.example.trainsearch.model;

import jakarta.persistence.Entity;
import lombok.Data;


import jakarta.persistence.*;

@Data
@Entity
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}

