package com.fearwarden.diaries.projects.models;

import com.fearwarden.diaries.metadata.models.StatusEntity;
import com.fearwarden.diaries.metadata.models.TypeEntity;
import com.fearwarden.diaries.projects.dto.request.CreateWorkDto;
import com.fearwarden.diaries.projects.dto.request.EditWorkDto;
import com.fearwarden.diaries.tasks.tools.HelperFunctions;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "work_entity")
public class WorkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private String title;

    @Column(name = "target_date", nullable = false)
    @JdbcTypeCode(SqlTypes.TIMESTAMP)
    private LocalDateTime targetDate;

    @Column(name = "description", nullable = false)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private String description;

    @Column(name = "work_order", nullable = false, columnDefinition = "integer default 0")
    @JdbcTypeCode(SqlTypes.INTEGER)
    private int workOrder;

    @Column(name = "created_at", nullable = false)
    @JdbcTypeCode(SqlTypes.TIMESTAMP)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ToString.Exclude
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "project_entity_id", nullable = false)
    private ProjectEntity projectEntity;

    @ToString.Exclude
    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private TypeEntity typeEntity;

    @ToString.Exclude
    @ManyToOne(optional = false)
    @JoinColumn(name = "status_entity_id", nullable = false)
    private StatusEntity statusEntity;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "project_membership_id")
    private ProjectMembershipEntity assignee;

    public static WorkEntity getWork(
            CreateWorkDto createWorkDto,
            ProjectEntity project,
            TypeEntity typeEntity,
            StatusEntity status,
            ProjectMembershipEntity membership,
            int order
    ) {
        WorkEntity work = new WorkEntity();
        work.setTitle(createWorkDto.title());
        work.setDescription(createWorkDto.description());
        LocalDateTime targetDate = HelperFunctions.convertStringToLocalDateTime(createWorkDto.targetDate());
        work.setTargetDate(targetDate);
        work.setProjectEntity(project);
        work.setTypeEntity(typeEntity);
        work.setStatusEntity(status);
        work.setAssignee(membership);
        work.setWorkOrder(order + 1);
        return work;
    }

    public WorkEntity editWork(
            WorkEntity work,
            EditWorkDto body,
            StatusEntity status,
            TypeEntity type,
            ProjectMembershipEntity membership) {
        work.setTitle(body.title());
        work.setDescription(body.description());
        work.setTargetDate(body.targetDate());
        work.setTypeEntity(type);
        work.setStatusEntity(status);
        work.setAssignee(membership);
        return work;
    }
}