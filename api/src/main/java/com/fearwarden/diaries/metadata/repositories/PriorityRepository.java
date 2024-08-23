package com.fearwarden.diaries.metadata.repositories;

import com.fearwarden.diaries.metadata.models.PriorityEntity;
import org.springframework.data.repository.CrudRepository;

public interface PriorityRepository extends CrudRepository<PriorityEntity, Integer> {
}
