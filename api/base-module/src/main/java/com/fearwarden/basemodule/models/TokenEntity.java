package com.fearwarden.basemodule.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tokens")
public class TokenEntity {
    @Id
    private UUID id;
    private String refreshToken;

    @ToString.Exclude
    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

}
