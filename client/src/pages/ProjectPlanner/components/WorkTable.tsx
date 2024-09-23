import {StatusEnum} from "@/types/TaskType.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {WorkResponse} from "@/types/ProjectType.ts";
import WorkSheet from "@/pages/ProjectPlanner/components/WorkSheet.tsx";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";


interface WorkTableProps {
    data: WorkResponse[]
    status: StatusEnum;
}

function WorkTable({data, status}: WorkTableProps) {
    const {setNodeRef} = useDroppable({
        id: status,
        data: {type: "Column", status}
    })
    const works = data.filter(work => work.statusDto.progress === status);

    return (
        <div ref={setNodeRef} className="w-full">
        <SortableContext id={status} items={data} strategy={verticalListSortingStrategy}>
            <ScrollArea className="w-full rounded-md border bg-accent/[0.5]">
                <div className="p-4 h-[35rem]">
                    <h4 className="mb-4 text-lg font-medium leading-none">{status}</h4>
                    {works.length === 0 ? (
                        // Render a placeholder if no works are present
                        <div className="text-sm text-gray-500">
                            <p>No tasks available. Create or Drag here to add tasks.</p>
                        </div>
                    ) : (
                        works.map((work) => (
                            <div key={`work-table-${work.id}-div`} className="text-sm">
                                <WorkSheet
                                    key={`${work.id}`}
                                    id={work.id}
                                    title={work.title}
                                    targetDate={work.targetDate}
                                    description={work.description}
                                    createdAt={work.createdAt}
                                    workOrder={work.workOrder}
                                    typeDto={work.typeDto}
                                    statusDto={work.statusDto}
                                    assignee={work.assignee}
                                />
                                <Separator className="my-2"/>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>
        </SortableContext>
        </div>
    );
}

export default WorkTable;