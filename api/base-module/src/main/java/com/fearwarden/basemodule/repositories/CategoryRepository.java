package com.fearwarden.basemodule.repositories;

import com.fearwarden.basemodule.models.CategoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<CategoryEntity, Integer> {
}
