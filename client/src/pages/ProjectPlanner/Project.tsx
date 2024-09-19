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
    DndContext, DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    rectIntersection,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {WorkResponse} from "@/types/ProjectType.ts";
import WorkCard from "@/pages/ProjectPlanner/components/WorkCard.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

function Project() {
    const {projectId} = useParams();
    const [columns, setColumns] = useState<ColumnType[]>([]);
    const [worksState, setWorksState] = useState<WorkResponse[]>([]);
    const [activeWork, setActiveWork] = useState<WorkResponse | null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

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

    function onDragStart(event: DragStartEvent) {
        const {active} = event;
        const activeWork = worksState.find(work => work.id === active.id);
        setActiveWork(activeWork || null);
    }

    function onDragOver(event: DragOverEvent) {
        const {active, over} = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveWork = active.data.current?.type === "Work";
        const isOverWork = active.data.current?.type === "Work";
        const isOverAColumn = over.data.current?.type === "Column";

        if (!isActiveWork) return;

        // dropping a task over another task
        if (isActiveWork && isOverWork) {
            setWorksState((works) => {
                const activeIndex = works.findIndex((w) => w.id === activeId);
                const overIndex = works.findIndex((w) => w.id == overId);

                // Ensure that the statusDto of the over work is not null before assigning
                if (works[overIndex]?.statusDto) {
                    works[activeIndex].statusDto = works[overIndex].statusDto;
                }
                return arrayMove(works, activeIndex, overIndex);
            });
        }


        // Dropping a work over a column
        if (isActiveWork && isOverAColumn) {
            setWorksState((works) => {
                const activeIndex = works.findIndex((w) => w.id === activeId);
                // Update the status of the active work to match the new column
                const newColumnStatus = over.data.current?.status;
                if (newColumnStatus) {
                    works[activeIndex].statusDto = {
                        ...works[activeIndex].statusDto,
                        progress: newColumnStatus
                    };
                }
                return arrayMove(works, activeIndex, activeIndex);
            })
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveWork(null);
        onDragOver(event);
        // Here I will make an API call to update the work's status on the server
    }

    useEffect(() => {
        if (works.data && statuses.data) {
            const statusOrder = Object.values(StatusEnum);
            const columnData: ColumnType[] = statuses.data
                .sort((a, b) => statusOrder.indexOf(a.progress as StatusEnum) - statusOrder.indexOf(b.progress as StatusEnum))
                .map((status) => ({
                    id: status.id,
                    status: status.progress as StatusEnum,
                }));
            setColumns(columnData);
            const workData: WorkResponse[] = works.data.map((work) => ({
                id: work.id,
                workOrder: work.workOrder,
                description: work.description,
                createdAt: work.createdAt,
                assignee: work.assignee,
                targetDate: work.targetDate,
                typeDto: work.typeDto,
                statusDto: work.statusDto,
                title: work.title
            }))
            setWorksState(workData);
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
                            collisionDetection={rectIntersection}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDragEnd={onDragEnd}
                        >
                            <div className="flex flex-row gap-10 justify-between">
                                {columns.map((column) => (
                                    <WorkTable
                                        key={`${column.id}-work-table`}
                                        data={worksState.filter((work) => work.statusDto.progress === column.status)}
                                        status={column.status}/>
                                ))}
                            </div>
                            {createPortal(
                                <DragOverlay>
                                    {activeWork ?
                                        <WorkCard
                                            id={activeWork.id}
                                            title={activeWork.title}
                                            targetDate={activeWork.targetDate}
                                            description={activeWork.description}
                                            createdAt={activeWork.createdAt}
                                            workOrder={activeWork.workOrder}
                                            typeDto={activeWork.typeDto}
                                            statusDto={activeWork.statusDto}
                                            assignee={activeWork.assignee}
                                            isDragging
                                        /> : null
                                    }
                                </DragOverlay>,
                                document.body
                            )}
                        </DndContext>
                    </div>
                    <Toaster/>
                </div>
            </ProjectMetadataContext.Provider>
        </main>
    );
}

export default Project;