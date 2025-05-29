package com.training.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.training.server.entities.RestaurantTable;
import java.util.Optional;


public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
    Optional<RestaurantTable> findByExternalId(String externalId);

}
