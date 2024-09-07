package com.fearwarden.diaries.metadata.dto;

import lombok.Value;

import java.io.Serializable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.UUID;

/**
 * DTO for {@link com.fearwarden.diaries.metadata.models.TypeEntity}
 */
public record TypeEntityDto(UUID id, String type) implements Serializable {
}