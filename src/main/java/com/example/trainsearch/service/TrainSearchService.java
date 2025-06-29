package com.example.trainsearch.service;

import com.example.trainsearch.dto.TrainRouteDTO;
import com.example.trainsearch.model.Train;
import com.example.trainsearch.model.TrainStop;
import com.example.trainsearch.repository.TrainRepository;
import com.example.trainsearch.repository.TrainStopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TrainSearchService {

    @Autowired
    private TrainRepository trainRepo;
    @Autowired
    private TrainStopRepository stopRepo;

    public List<TrainRouteDTO> findDirectTrains(String source, String destination) {
        List<TrainRouteDTO> results = new ArrayList<>();

        for (Train train : trainRepo.findAll()) {
            List<TrainStop> stops = stopRepo.findByTrainId(train.getId());
            Map<String, TrainStop> map = new HashMap<>();
            for (TrainStop stop : stops) map.put(stop.getStation().getName(), stop);

            if (map.containsKey(source) && map.containsKey(destination)) {
                TrainStop src = map.get(source);
                TrainStop dest = map.get(destination);
                if (stops.indexOf(dest) > stops.indexOf(src)) {
                    int dist = calculateDistance(stops, src, dest);
                    double price = dist * 1.25;
                    results.add(new TrainRouteDTO(train.getName(), src.getDepartureTime(), dest.getDepartureTime(), dist, price));
                }
            }
        }
        return results;
    }

    private int calculateDistance(List<TrainStop> stops, TrainStop src, TrainStop dest) {
        int dist = 0;
        boolean inRange = false;
        for (TrainStop stop : stops) {
            if (stop.equals(src)) inRange = true;
            if (inRange) dist += stop.getDistanceFromPrevious();
            if (stop.equals(dest)) break;
        }
        return dist;
    }
}