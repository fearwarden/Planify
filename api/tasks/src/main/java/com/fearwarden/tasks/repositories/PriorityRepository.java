package com.fearwarden.tasks.repositories;

import com.fearwarden.tasks.models.PriorityEntity;
import org.springframework.data.repository.CrudRepository;

public interface PriorityRepository extends CrudRepository<PriorityEntity, Integer> {
}
