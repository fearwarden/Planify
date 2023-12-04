package com.fearwarden.tasks.models;

import com.fearwarden.basemodule.models.CategoryEntity;
import com.fearwarden.basemodule.models.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ToString.Exclude
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    @ToString.Exclude
    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id")
    private CategoryEntity categoryEntity;

    @ToString.Exclude
    @ManyToOne(optional = false)
    @JoinColumn(name = "priority_id", nullable = false)
    private PriorityEntity priorityEntity;

    @ToString.Exclude
    @ManyToOne(optional = false)
    @JoinColumn(name = "status_id", nullable = false)
    private StatusEntity statusEntity;

}
