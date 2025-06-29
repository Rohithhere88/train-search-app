package com.example.trainsearch.repository;

import com.example.trainsearch.model.TrainStop;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TrainStopRepository extends JpaRepository<TrainStop, Long> {
    List<TrainStop> findByTrainId(Long trainId);
}