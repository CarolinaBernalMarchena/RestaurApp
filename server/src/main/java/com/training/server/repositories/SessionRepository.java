package com.training.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.training.server.entities.Session;



public interface SessionRepository extends JpaRepository<Session, Long> {

    Optional<Session> findByUuid(String uuid);
}
