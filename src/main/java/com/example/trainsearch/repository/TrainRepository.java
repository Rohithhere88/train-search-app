package com.example.trainsearch.repository;

import com.example.trainsearch.model.Train;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainRepository extends JpaRepository<Train, Long> { }
