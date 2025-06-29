package com.example.trainsearch.controller;

import com.example.trainsearch.dto.TrainRouteDTO;
import com.example.trainsearch.repository.StationRepository;
import com.example.trainsearch.service.TrainSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/trains")
@CrossOrigin(origins = "http://localhost:3000")
public class TrainController {

    @Autowired
    private TrainSearchService service;

    @GetMapping("/search")
    public ResponseEntity<List<TrainRouteDTO>> searchTrains(
            @RequestParam String source,
            @RequestParam String destination
    ) {
        return ResponseEntity.ok(service.findDirectTrains(source, destination));
    }

    @Autowired
    private StationRepository stationRepo;

    @GetMapping("/stations")
    public ResponseEntity<List<String>> getAllStations() {
        return ResponseEntity.ok(stationRepo.findAll().stream()
                .map(s -> s.getName())
                .collect(Collectors.toList()));
    }

}
