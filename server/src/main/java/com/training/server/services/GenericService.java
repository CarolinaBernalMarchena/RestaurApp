package com.training.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//Generic service that use the generic repository
//Persistence layer

@Service
public abstract class GenericService<T, ID> {

    @Autowired
    private JpaRepository<T, ID> repository;

    public List<T> findAll() {
        return repository.findAll();
    }

    public Optional<T> findById(ID id) {
        return repository.findById(id);
    }

    public T save(T entity) {
        return repository.save(entity);
    }

    public void deleteById(ID id) {
        repository.deleteById(id);
    }

    public void update(ID id, T entity) {
        if (repository.existsById(id)) {
            repository.save(entity);
        } else {
            throw new RuntimeException("Entity not found");
        }
    }
}

