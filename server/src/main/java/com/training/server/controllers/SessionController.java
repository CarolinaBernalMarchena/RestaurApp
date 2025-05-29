package com.training.server.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.training.server.entities.Dish;
import com.training.server.entities.OrderItem;
import com.training.server.entities.RestaurantTable;
import com.training.server.entities.Session;
import com.training.server.enums.Status;
import com.training.server.repositories.DishRepository;
import com.training.server.repositories.RestaurantTableRepository;
import com.training.server.repositories.SessionRepository;
import com.training.server.services.JWTService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:8100")
public class SessionController {

    private final SessionRepository sessionRepository;
    private final RestaurantTableRepository tableRepository;
    private final DishRepository dishRepository;

    SessionController(SessionRepository sessionRepository, RestaurantTableRepository tableRepository, DishRepository dishRepository) {
        this.sessionRepository = sessionRepository;
        this.tableRepository = tableRepository;
        this.dishRepository = dishRepository;
    }

    @GetMapping("/session") // If no or invalid token, generates a new token, else, returns the session related to the token
    ResponseEntity<Object> getSession(@RequestHeader(name = "Authorization", required = false) String jwtToken) {
        if (jwtToken != null) {
            if (JWTService.verifyToken(jwtToken)) {
                String sessionUuid = JWTService.getUUIDFromToken(jwtToken); 
                Optional<Session> sessionOptional = sessionRepository.findByUuid(sessionUuid);
                if (sessionOptional.isPresent()) return ResponseEntity.ok(sessionOptional.get());
            }
        }  
        Session newSession = new Session();
        sessionRepository.save(newSession);
        String newToken = JWTService.generateToken(newSession.getUuid());
        JSONObject returnToken = new JSONObject().put("token", newToken);
        return ResponseEntity.ok(returnToken.toMap());
    }

    @GetMapping("/tables")
    ResponseEntity<List<RestaurantTable>> getAvailableTables() {
        List<RestaurantTable> tables = tableRepository.findAll();
        List<Session> sessions = sessionRepository.findAll();
        List<RestaurantTable> busyTables = sessions.stream().filter(session -> session.getStatus() == Status.OPEN).map(session -> session.getTable()).distinct().toList();
        return(ResponseEntity.ok(tables.stream().filter(table -> !busyTables.contains(table)).toList()));
    }

    @PutMapping("/cancel")
    ResponseEntity<Object> cancelOrder(@RequestHeader("Authorization") String jwtToken) {
        if (JWTService.verifyToken(jwtToken)) {
            String sessionUUid = JWTService.getUUIDFromToken(jwtToken);
            Optional<Session> sessionOptional = sessionRepository.findByUuid(sessionUUid);
            if (sessionOptional.isPresent()) {
                Session session = sessionOptional.get();
                session.setStatus(Status.CANCELLED);
                session.setCloseDateTime(LocalDateTime.now());
                sessionRepository.save(session);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/table/{id}") // If the token is valid, assigns the indicated table to the session related to the token
    ResponseEntity<Object> setSessionTable(@PathVariable String id, @RequestHeader("Authorization") String jwtToken) {
        if (JWTService.verifyToken(jwtToken)) {
            String sessionUUid = JWTService.getUUIDFromToken(jwtToken);
            Optional<Session> sessionOptional = sessionRepository.findByUuid(sessionUUid);
            Optional<RestaurantTable> tableOptional = tableRepository.findByExternalId(id);
            if (sessionOptional.isPresent() && tableOptional.isPresent()) {
                Session session = sessionOptional.get();
                session.setTable(tableOptional.get());
                sessionRepository.save(session);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/sessions") // Returns all sessions (debug)
    ResponseEntity<List<Session>> getSessions() {
        return(ResponseEntity.ok(sessionRepository.findAll()));
    }

    @GetMapping("/order")
    ResponseEntity<List<OrderItem>> getOrder(@RequestHeader("Authorization") String jwtToken) {
        if (JWTService.verifyToken(jwtToken)) {
            Optional<Session> sessionOptional = sessionRepository.findByUuid(JWTService.getUUIDFromToken(jwtToken));
            if (sessionOptional.isPresent()) {
                return ResponseEntity.ok(sessionOptional.get().getBasket());
            } return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/order/add/{productId}")
    ResponseEntity<Void> addToOrder(@PathVariable Long productId, @RequestHeader("Authorization") String jwtToken) {
        if (JWTService.verifyToken(jwtToken)) {
            Optional<Session> sessionOptional = sessionRepository.findByUuid(JWTService.getUUIDFromToken(jwtToken));
            Optional<Dish> dishOptional = dishRepository.findById(productId);
            if (dishOptional.isPresent() && sessionOptional.isPresent()) {
                Session updatedSession = sessionOptional.get();
                updatedSession.addToBasket(dishOptional.get());
                sessionRepository.save(updatedSession);
                return ResponseEntity.noContent().build();
            } return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/order/remove/{productId}")
    ResponseEntity<Void> removeFromOrder(@PathVariable Long productId, @RequestHeader("Authorization") String jwtToken) {
        if (JWTService.verifyToken(jwtToken)) {
            Optional<Session> sessionOptional = sessionRepository.findByUuid(JWTService.getUUIDFromToken(jwtToken));
            Optional<Dish> dishOptional = dishRepository.findById(productId);
            if (dishOptional.isPresent() && sessionOptional.isPresent()) {
                Session updatedSession = sessionOptional.get();
                Optional<OrderItem> orderOptional = updatedSession.getBasket().stream().filter(orderItem -> orderItem.getProduct().getId() == productId).findFirst();
                if (orderOptional.isPresent()) {
                    updatedSession.removeFromBasket(orderOptional);
                    sessionRepository.save(updatedSession);
                    return ResponseEntity.noContent().build();
                }
            } return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
