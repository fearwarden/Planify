package com.fearwarden.diaries.metadata.dto;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link com.fearwarden.diaries.metadata.models.TypeEntity}
 */
public record TypeDto(UUID id, String type) implements Serializable {
}