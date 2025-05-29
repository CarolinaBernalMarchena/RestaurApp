package com.training.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.training.server.entities.Allergen;

public interface AllergenRepository extends JpaRepository<Allergen, Long> {

}
