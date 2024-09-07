package com.fearwarden.diaries.metadata.dto;

import java.io.Serializable;

/**
 * DTO for {@link com.fearwarden.diaries.metadata.models.StatusEntity}
 */
public record StatusDto(Integer id, String progress) implements Serializable {
  }