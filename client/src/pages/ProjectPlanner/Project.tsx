import {Link, useParams} from "react-router-dom";
import {useQueries} from "@tanstack/react-query";
import {getAllTypes, getMembershipsForProject, getProject, getStatuses} from "@/api/projects/projects.ts";
import ProjectToolbar from "@/pages/ProjectPlanner/components/ProjectToolbar.tsx";
import CreateWorkModal from "@/pages/ProjectPlanner/modals/CreateWorkModal.tsx";
import {getWorksForProject} from "@/api/projects/works.ts";
import {StatusEnum} from "@/types/TaskType.ts";
import WorkTable, {ColumnType} from "@/pages/ProjectPlanner/components/WorkTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PROJECT_PLANNER} from "@/constants/constants.ts";
import {ProjectMetadataContext, ProjectMetadataContextType} from "@/hooks/contexts.ts";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {useEffect, useState} from "react";

function Project() {
    const {projectId} = useParams();
    const [columns, setColumns] = useState<ColumnType[]>([]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    const [project, works, types, memberships, statuses] = useQueries({
        queries: [
            {
                queryKey: ["projects", projectId],
                queryFn: () => getProject(projectId!)
            },
            {
                queryKey: ["works", projectId],
                queryFn: () => getWorksForProject(projectId!),
                refetchInterval: 3000,
                refetchIntervalInBackground: true,
            },
            {
                queryKey: ["types"],
                queryFn: getAllTypes,
            },
            {
                queryKey: ["memberships"],
                queryFn: () => getMembershipsForProject(projectId!),
            },
            {
                queryKey: ["statuses"],
                queryFn: getStatuses,
            }
        ]
    });

    const metadata: ProjectMetadataContextType = {
        types: types.data!,
        memberships: memberships.data!,
        statuses: statuses.data!
    }

    const findColumn = (unique: number | string | null) => {
        if (!unique) return null;

        if (columns.some((c) => c.id === unique)) {
            return columns.find((c) => c.id === unique) ?? null;
        }

        const uniqueStr = String(unique);

        const itemWithColumnId = columns.flatMap((c) => {
            const columnId = c.id;
            return c.workCards.map((card) => ({ itemId: card.id, columnId }))
        });
        const columnId = itemWithColumnId.find((i) => i.itemId === uniqueStr)?.columnId;
        return columns.find((c) => c.id === columnId) ?? null;
    }

    function handleDragOver(event: DragOverEvent) {
        const {active, over, delta} = event;
        const activeId = String(active.id);
        const overId = over ? String(over.id) : null;
        const activeColumn = findColumn(activeId);
        const overColumn = findColumn(overId);

        if (!activeColumn || !overColumn || activeColumn === overColumn) {
            return null;
        }

        setColumns((prevState) => {
            const activeItems = activeColumn.workCards;
            const overItems = overColumn.workCards;
            const activeIndex = activeItems.findIndex((i) => i.id === activeId);
            const overIndex = overItems.findIndex((i) => i.id === overId);
            const newIndex = () => {
                const putOnBelowLastItem =
                    overIndex === overItems.length - 1 && delta.y > 0;
                const modifier = putOnBelowLastItem ? 1 : 0;
                return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            };
            return prevState.map((c) => {
                if (c.id === activeColumn.id) {
                    c.workCards = activeItems.filter((i) => i.id !== activeId);
                    return c;
                } else if (c.id === overColumn.id) {
                    c.workCards = [
                        ...overItems.slice(0, newIndex()),
                        activeItems[activeIndex],
                        ...overItems.slice(newIndex(), overItems.length)
                    ];
                    return c;
                } else {
                    return c;
                }
            });
        })
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const activeId = String(active.id);
        const overId = over ? String(over.id) : null;
        const activeColumn = findColumn(activeId);
        const overColumn = findColumn(overId);
        if (!activeColumn || !overColumn || activeColumn !== overColumn) {
            return null;
        }

        const activeIndex = activeColumn.workCards.findIndex((i) => i.id === activeId);
        const overIndex = overColumn.workCards.findIndex((i) => i.id === overId);
        if (activeIndex !== overIndex) {
            setColumns((prevState) => {
                return prevState.map((column) => {
                    if (column.id === activeColumn.id) {
                        column.workCards = arrayMove(overColumn.workCards, activeIndex, overIndex);
                        return column;
                    } else {
                        return column;
                    }
                });
            });
        }
    }

    useEffect(() => {
        if (works.data && statuses.data) {
            const statusOrder = Object.values(StatusEnum);
            const columnData: ColumnType[] = statuses.data
                .sort((a, b) => statusOrder.indexOf(a.progress as StatusEnum) - statusOrder.indexOf(b.progress as StatusEnum))
                .map((status) => ({
                id: status.id,
                status: status.progress as StatusEnum,
                workCards: works.data.filter(work => work.statusDto.id === status.id)
                    .map(work => ({
                        id: work.id,
                        title: work.title,
                        targetDate: work.targetDate,
                        typeDto: work.typeDto,
                        statusDto: work.statusDto,
                        assignee: work.assignee,
                        workOrder: work.workOrder,
                        description: work.description,
                        createdAt: work.createdAt
                    }))
            }));
            setColumns(columnData);
        }
    }, [works.data, statuses.data]);

    if (project.isPending) return <span>Loading Project...</span>;
    if (project.isError) return <span>Error: {project.error.message}</span>;
    if (works.isPending) return <span>Loading Project...</span>;
    if (works.isError) return <span>Error: {works.error.message}</span>;
    if (types.isPending) return <span>Loading Project...</span>;
    if (types.isError) return <span>Error: {types.error.message}</span>;
    if (memberships.isPending) return <span>Loading Project...</span>;
    if (memberships.isError) return <span>Error: {memberships.error.message}</span>;
    if (statuses.isPending) return <span>Loading Project...</span>;
    if (statuses.isError) return <span>Error: {statuses.error.message}</span>;
    return (
        <main className="flex flex-col items-center relative min-h-screen">
            <ProjectMetadataContext.Provider value={metadata}>
                <div className="flex-1 w-[80%] flex flex-col items-center p-8">
                    <div className="flex flex-col gap-10 flex-1 w-full relative">
                        <div className="flex flex-row items-center justify-between gap-5">
                            <div className="flex items-center gap-3">
                                <Link to={PROJECT_PLANNER}><Button>Back to Projects</Button></Link>
                                <h1 className="text-3xl">{project.data?.name}</h1>
                            </div>
                            <CreateWorkModal
                                projectId={projectId!}
                            />
                        </div>
                        <div>
                            <ProjectToolbar/>
                        </div>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragOver={handleDragOver}
                            onDragEnd={handleDragEnd}
                        >
                            <div className="flex flex-row gap-10 justify-between">
                                {columns.map((column) => (
                                    <WorkTable key={`${column.id}-work-table-project`} data={column.workCards} status={column.status} />
                                ))}
                            </div>
                        </DndContext>
                    </div>
                </div>
            </ProjectMetadataContext.Provider>
        </main>
    );
}

export default Project;