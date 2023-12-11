package com.fearwarden.diaries.tasks.repositories;

import com.fearwarden.diaries.tasks.models.PriorityEntity;
import org.springframework.data.repository.CrudRepository;

public interface PriorityRepository extends CrudRepository<PriorityEntity, Integer> {
}
