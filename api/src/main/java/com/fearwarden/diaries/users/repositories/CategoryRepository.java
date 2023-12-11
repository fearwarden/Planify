package com.fearwarden.diaries.users.repositories;

import com.fearwarden.diaries.users.models.CategoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<CategoryEntity, Integer> {
}
