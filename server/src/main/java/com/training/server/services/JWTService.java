package com.training.server.services;

import java.util.Date;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;

@Service
public class JWTService {
    private final static long jwtExpirationInMs = 3600000; // 1 hora
    private final static SecretKey secret_key = Jwts.SIG.HS256.key().build();


    public static String generateToken(String uuid) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
            .subject(uuid)
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(secret_key)
            .compact();
    }

    public static String getUUIDFromToken(String token) {
        token = token.replace("Bearer ", ""); // Removes "Bearer " text added by requests
        Claims claims = Jwts.parser()
            .verifyWith(secret_key)
            .build()
            .parseSignedClaims(token)
            .getPayload();

        return claims.getSubject();
    }

    public static Boolean verifyToken(String token) {
        token = token.replace("Bearer ", ""); // Removes "Bearer " text added by requests
        try {
            Jwts.parser()
                .verifyWith(secret_key)
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (SignatureException ex) {
            System.out.println("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty.");
        }
        return false;
    }
    
}
