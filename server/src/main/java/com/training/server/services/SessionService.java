package com.training.server.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.training.server.entities.Session;
import com.training.server.enums.Status;
import com.training.server.repositories.SessionRepository;

@Service
public class SessionService {
    SessionRepository sessionRepository;

    SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Scheduled(fixedRate = 60000) // Runs every minute
    public void closeExpiredSessions() {
        List<Session> openSessions = sessionRepository.findAll().stream().filter(session -> session.getStatus() == Status.OPEN).toList();
        for (Session session : openSessions) {
            if(session.getStartDateTime().isBefore(LocalDateTime.now().minusHours(1))) { // Cancels session if an hour has passed and it is still open
                session.setStatus(Status.CANCELLED);
                session.setCloseDateTime(LocalDateTime.now());
                sessionRepository.save(session);
            }
        }
    }

}
