import {StatusEnum} from "@/types/TaskType.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {WorkResponse} from "@/types/ProjectType.ts";
import WorkSheet from "@/pages/ProjectPlanner/components/WorkSheet.tsx";
import {rectSortingStrategy, SortableContext} from "@dnd-kit/sortable";


export interface WorkTableProps {
    data: WorkResponse[]
    status: StatusEnum;
}

export interface ColumnType {
    id: number;
    status: StatusEnum;
    workCards: WorkResponse[];
}

function WorkTable({data, status}: WorkTableProps) {

    function filteredWorks(filter: StatusEnum) {
        const filteredData = data!.filter(work => {
            const name = work.statusDto.progress.toUpperCase();
            return name.includes(filter)
        });
        //filteredData.sort((a, b) => (a.workOrder > b.workOrder) ? 1 : -1)
        return filteredData;
    }

    return (
        <SortableContext id={status} items={data} strategy={rectSortingStrategy}>
        <ScrollArea className="w-full rounded-md border bg-accent/[0.5]">
            <div className="p-4 max-h-[35rem]">
                <h4 className="mb-4 text-lg font-medium leading-none">{status}</h4>
                {filteredWorks(status).map((work) => (
                    <>
                        <div key={`work-table-${work.id}-div`} className="text-sm">
                            <WorkSheet
                                key={`${work.id}-work-sheet`}
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
                        </div>
                        <Separator className="my-2"/>
                    </>
                ))}
            </div>
        </ScrollArea>
        </SortableContext>
    );
}

export default WorkTable;