package com.fearwarden.diaries.tasks.specifications;

import com.fearwarden.diaries.tasks.models.TaskEntity;
import com.fearwarden.diaries.users.models.UserEntity;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public class TaskSpecifications {
    public static Specification<TaskEntity> withCategory(String category) {
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.join("categoryEntity").get("name"), category));
    }

    public static Specification<TaskEntity> withPriority(String priority) {
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.join("priorityEntity").get("level"), priority));
    }

    public static Specification<TaskEntity> withStatus(String status) {
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.join("statusEntity").get("progress"), status));
    }

    public static Specification<TaskEntity> withPageable(Pageable pageable) {
        return (root, query, criteriaBuilder) -> {
            query.orderBy(criteriaBuilder.desc(root.get("due")));
            return query.getRestriction();
        };
    }

    public static Specification<TaskEntity> withDescriptionSearch(String params, UserEntity user) {
        return (root, query, criteriaBuilder) -> {
            String queryParams = "%" + params.toLowerCase() + "%";
            Predicate descriptionLike =
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), queryParams);
            Predicate userPredicate = criteriaBuilder.equal(root.get("userEntity").get("id"), user.getId());
            return criteriaBuilder.and(descriptionLike, userPredicate);
        };
    }
}
