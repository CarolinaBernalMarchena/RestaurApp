package com.training.server;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.training.server.entities.Dish;
import com.training.server.entities.RestaurantTable;
import com.training.server.entities.Allergen;
import com.training.server.enums.FoodType;
import com.training.server.repositories.AllergenRepository;
import com.training.server.repositories.DishRepository;
import com.training.server.repositories.RestaurantTableRepository;

@Configuration
public class LoadDishes {
    
    private static final Logger log = LoggerFactory.getLogger(LoadDishes.class);
    
    @Bean
    CommandLineRunner initDishes(DishRepository dishRepository, RestaurantTableRepository tableRepository, AllergenRepository allergenRepository) {
        return args -> {
            log.info("Loading allergens...");
            Allergen milkAllergen = allergenRepository.save(new Allergen("Milk"));
            Allergen eggsAllergen = allergenRepository.save(new Allergen("Eggs"));
            Allergen fishAllergen = allergenRepository.save(new Allergen("Fish"));
            Allergen shellfishAllergen = allergenRepository.save(new Allergen("Crustacean Shellfish"));
            Allergen treeNutAllergen = allergenRepository.save(new Allergen("Tree Nuts"));
            Allergen peanutAllergen = allergenRepository.save(new Allergen("Peanuts"));
            Allergen wheatAllergen = allergenRepository.save(new Allergen("Wheat"));
            Allergen soybeanAllergen = allergenRepository.save(new Allergen("Soybeans"));
            Allergen sesameAllergen = allergenRepository.save(new Allergen("Sesame"));
            log.info("Loaded allergen: " + milkAllergen);
            log.info("Loaded allergen: " + eggsAllergen);
            log.info("Loaded allergen: " + fishAllergen);
            log.info("Loaded allergen: " + shellfishAllergen);
            log.info("Loaded allergen: " + treeNutAllergen);
            log.info("Loaded allergen: " + peanutAllergen);
            log.info("Loaded allergen: " + wheatAllergen);
            log.info("Loaded allergen: " + soybeanAllergen);
            log.info("Loaded allergen: " + sesameAllergen);

            log.info("Loading food items...");
            log.info("Loaded dish: " + dishRepository.save(new Dish(FoodType.DISH, List.of(wheatAllergen, sesameAllergen),"Hamburger", "A beef patty with various ingredients", 6.99, "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Celebration_Burger_%2849116811283%29.jpg/450px-Celebration_Burger_%2849116811283%29.jpg")));
            log.info("Loaded dish: " + dishRepository.save(new Dish(FoodType.DISH, List.of(eggsAllergen), "Omelette", "An seasoned omelette served with some bread", 5.49, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_%2816600947041%29.jpg/330px-Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_%2816600947041%29.jpg")));
            log.info("Loaded dish: " + dishRepository.save(new Dish(FoodType.DISH, List.of(eggsAllergen, fishAllergen), "Fish & Chips", "The classic British dish. Includes some lemon for seasoning", 4.99, "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Fish_and_chips_blackpool.jpg/413px-Fish_and_chips_blackpool.jpg")));
            log.info("Loaded dish: " + dishRepository.save(new Dish(FoodType.DISH, List.of(wheatAllergen), "Spaghetti w. Meatballs", "Pork meatballs adorn this classic Italian dish", 10.49, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spaghetti_and_meatballs_1.jpg/330px-Spaghetti_and_meatballs_1.jpg")));
            log.info("Loaded dish: " + dishRepository.save(new Dish(FoodType.DISH, List.of(), "Steak", "Includes a sauce that gives it its characteristic smokey flavor", 12.99, "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Steak_with_shitaki_mushrooms.jpg/450px-Steak_with_shitaki_mushrooms.jpg")));
            log.info("Loaded drink: " + dishRepository.save(new Dish(FoodType.DRINK, List.of(), "Water", "A simple water bottle", 1.49, "https://images.thdstatic.com/productImages/2c12c804-7728-4112-9a79-d3dbb0c33548/svn/dasani-water-049000026566-64_600.jpg")));
            log.info("Loaded drink: " + dishRepository.save(new Dish(FoodType.DRINK, List.of(), "Coke", "The emblematic drink, we over both regular and zero varieties", 2.99, "https://m.media-amazon.com/images/I/71booHxo0YL._SL1500_.jpg")));
            log.info("Loaded drink: " + dishRepository.save(new Dish(FoodType.DRINK, List.of(), "Sprite", "We offer lime and orange flavors", 2.49, "https://5sentidos.es/wp-content/uploads/2024/03/SPRITE-LATA-33-CL.png")));
            log.info("Loaded drink: " + dishRepository.save(new Dish(FoodType.DRINK, List.of(wheatAllergen), "Beer", "Straight from our beer barrels", 1.99, "https://www.clawhammersupply.com/cdn/shop/articles/how_to_make_beer.jpg?v=1682910375&width=1532")));
            log.info("Loaded drink: " + dishRepository.save(new Dish(FoodType.DRINK, List.of(), "Wine", "Our restaurant serves the hightest quality wine", 3.49, "https://www.thespruceeats.com/thmb/N9TEoqtQz-R9zkjMXM8I530sj30=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/red-wine-is-poured-into-a-glass-from-a-bottle--light-background--1153158143-98320451802c485cb6d7b5437c7fd60a.jpg")));

            log.info("Loading tables...");
            log.info("Loaded table: " + tableRepository.save(new RestaurantTable("Table 1", "ea96c788")));
            log.info("Loaded table: " + tableRepository.save(new RestaurantTable("Table 2", "cf1dbdbb")));
            log.info("Loaded table: " + tableRepository.save(new RestaurantTable("Table 3", "f8b63906")));
            log.info("Loaded table: " + tableRepository.save(new RestaurantTable("Table 4", "f7a1b0a0")));
            log.info("Loaded table: " + tableRepository.save(new RestaurantTable("Table 5", "98422016")));
        };
    }

}
