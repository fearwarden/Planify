package com.fearwarden.diaries.metadata.repositories;

import com.fearwarden.diaries.metadata.models.CategoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<CategoryEntity, Integer> {
}
