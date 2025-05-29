package com.training.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

//Generic repository that manage the basic CRUD operations for any type of entity
//Persistence layer
@NoRepositoryBean
public interface GenericRepository<T, ID> extends JpaRepository<T, ID> {
}
