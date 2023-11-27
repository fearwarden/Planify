package com.fearwarden.tasks.repositories;

import com.fearwarden.tasks.models.StatusEntity;
import org.springframework.data.repository.CrudRepository;

public interface StatusRepository extends CrudRepository<StatusEntity, Integer> {
}
