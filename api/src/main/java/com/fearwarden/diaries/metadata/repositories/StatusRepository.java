package com.fearwarden.diaries.metadata.repositories;

import com.fearwarden.diaries.metadata.models.StatusEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface StatusRepository extends CrudRepository<StatusEntity, Integer> {
    @Query("SELECT s FROM StatusEntity s WHERE s.progress = 'COMPLETE'")
    StatusEntity findCompleteStatus();
}
