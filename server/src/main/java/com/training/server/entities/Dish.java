package com.training.server.entities;

import com.training.server.enums.FoodType;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Dish {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    FoodType foodType;
    @ManyToMany
    List<Allergen> allergens;
    String name;
    String description;
    Double price;
    String image;

    protected Dish() {}

    public Dish(FoodType foodType, List<Allergen> allergens, String name, String description, Double price, String image) {
        this.foodType = foodType;
        this.allergens = allergens;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
    
    public FoodType getFoodType() {
        return foodType;
    }

    public void setFoodType(FoodType foodType) {
        this.foodType = foodType;
    }

    public List<Allergen> getAllergens() {
        return allergens;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAllergens(List<Allergen> allergens) {
        this.allergens = allergens;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    
    public Long getId() {
        return id;
    }
    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((foodType == null) ? 0 : foodType.hashCode());
        result = prime * result + ((allergens == null) ? 0 : allergens.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((price == null) ? 0 : price.hashCode());
        result = prime * result + ((image == null) ? 0 : image.hashCode());
        return result;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Dish other = (Dish) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (foodType != other.foodType)
            return false;
        if (allergens == null) {
            if (other.allergens != null)
                return false;
        } else if (!allergens.equals(other.allergens))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (price == null) {
            if (other.price != null)
                return false;
        } else if (!price.equals(other.price))
            return false;
        if (image == null) {
            if (other.image != null)
                return false;
        } else if (!image.equals(other.image))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Dish [id=" + id + ", foodType=" + foodType + ", allergens=" + allergens + ", name=" + name
                + ", description=" + description + ", price=" + price + ", image=" + image + "]";
    }

}
