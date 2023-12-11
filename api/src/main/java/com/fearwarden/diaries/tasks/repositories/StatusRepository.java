package com.fearwarden.diaries.tasks.repositories;

import com.fearwarden.diaries.tasks.models.StatusEntity;
import org.springframework.data.repository.CrudRepository;

public interface StatusRepository extends CrudRepository<StatusEntity, Integer> {
}
