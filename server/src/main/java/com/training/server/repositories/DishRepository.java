package com.training.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.training.server.entities.Dish;
import com.training.server.enums.FoodType;

public interface DishRepository extends JpaRepository<Dish, Long> {
    List<Dish> findAllByFoodType(FoodType type);

}
