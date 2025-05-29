package com.training.server.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.training.server.entities.Allergen;
import com.training.server.entities.Dish;
import com.training.server.enums.FoodType;
import com.training.server.repositories.AllergenRepository;
import com.training.server.repositories.DishRepository;

@RestController
@CrossOrigin(origins = "http://localhost:8100")
public class ServerController {
    
    private final DishRepository dishRepository;
    private final AllergenRepository allergenRepository;
    
    ServerController(DishRepository dishRepository, AllergenRepository allergenRepository) {
        this.dishRepository = dishRepository;
        this.allergenRepository = allergenRepository;
    }
    
    //GET request to get all dishes or filter them by type
    @GetMapping("/dishes")
    ResponseEntity<List<Dish>> getDishes(@RequestParam(name = "type", required = false) String foodType) {
        if (foodType == null) return ResponseEntity.ok(dishRepository.findAll());
        else {
            switch (foodType) {
                case "dish":
                    return ResponseEntity.ok(dishRepository.findAllByFoodType(FoodType.DISH));
                case "drink":
                    return ResponseEntity.ok(dishRepository.findAllByFoodType(FoodType.DRINK));
                default:
                    return ResponseEntity.badRequest().build();
            }
        }
    }
    
    //GET request to get dish by ID
    @GetMapping("/dishes/{id}")
    ResponseEntity<Dish> getDishById(@PathVariable Long id) {
    	Optional<Dish> dish = dishRepository.findById(id);
    	return dish.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //POST request to create an entirely new dish
    @PostMapping("/dishes")
    ResponseEntity<Dish> createDish(@RequestBody Dish dish) {
       Dish savedDish = dishRepository.save(dish);
       return ResponseEntity.created(UriComponentsBuilder.fromHttpUrl("http://localhost:8080/dishes/" + savedDish.getId()).build().toUri()).body(savedDish);
    }
    
    
    //POST request to create a new dish with specific type
    @PostMapping("/dishes/type")
    ResponseEntity<Dish> createDishForType(@RequestBody Dish dish, @RequestParam("type") String foodType) {
    	switch (foodType) {
    	case "dish":
    		dish.setFoodType(FoodType.DISH);
    		break;
    	case "drink":
    		dish.setFoodType(FoodType.DRINK);
    		break;
    	default:
    		return ResponseEntity.badRequest().build();
    	}
    	Dish savedDish = dishRepository.save(dish);
    	return ResponseEntity.created(UriComponentsBuilder.fromHttpUrl("http://localhost:8080/dishes/" + savedDish.getId()).build().toUri()).body(savedDish);
    }
    
    //PUT request to update a dish completely
    @PutMapping("/dishes/{id}")
    ResponseEntity<Dish> updateDish(@PathVariable Long id, @RequestBody Dish newDish) {
    	Optional<Dish> optionalDish = dishRepository.findById(id);
    	if (optionalDish.isPresent()) {
    		newDish.setId(id);
            dishRepository.save(newDish);
            return ResponseEntity.ok(newDish);
    	} else {
    		return ResponseEntity.notFound().build();
    	}	
    }
    
    //PUT request to update the type of a dish
    @PutMapping("/dishes/{id}/type")
    ResponseEntity<Dish> updateDishType(@PathVariable Long id, @RequestParam("type") String foodType) {
        Optional<Dish> optionalDish = dishRepository.findById(id);
        if (optionalDish.isPresent()) {
            Dish existingDish = optionalDish.get();
            switch (foodType) {
                case "dish":
                    existingDish.setFoodType(FoodType.DISH);
                    break;
                case "drink":
                    existingDish.setFoodType(FoodType.DRINK);
                    break;
                default:
                    return ResponseEntity.badRequest().build();
            }
            dishRepository.save(existingDish);
            return ResponseEntity.ok(existingDish);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    //DELETE request to delete a dish by ID
    @DeleteMapping("/dishes/{id}")
    ResponseEntity<Dish> deleteDish(@PathVariable Long id) {
    	Optional<Dish> optionalDish = dishRepository.findById(id);
    	if (optionalDish.isPresent()) {
    		dishRepository.deleteById(id);
    		return ResponseEntity.noContent().build(); // 204 No Content
    	} else {
    		return ResponseEntity.notFound().build(); // 404 Not Found
    	}
    }

    //GET request to get all allergens
    @GetMapping("/allergens")
    ResponseEntity<List<Allergen>> getAllergens() {
        return ResponseEntity.ok(allergenRepository.findAll());
    }
    
}
