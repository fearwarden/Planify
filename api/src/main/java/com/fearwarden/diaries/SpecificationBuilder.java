package com.fearwarden.diaries;

import org.springframework.data.jpa.domain.Specification;

public class SpecificationBuilder<T> {
    private Specification<T> specification;

    public SpecificationBuilder(Specification<T> initialSpecification) {
        this.specification = initialSpecification;
    }

    public SpecificationBuilder() {
        this.specification = Specification.where(null);
    }

    public SpecificationBuilder<T> with(boolean condition, Specification<T> spec) {
        if (condition) {
            this.specification = this.specification.and(spec);
        }
        return this;
    }

    public Specification<T> build() {
        return this.specification;
    }
}
