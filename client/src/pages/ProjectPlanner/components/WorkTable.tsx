import {StatusEnum} from "@/types/TaskType.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {WorkResponse} from "@/types/ProjectType.ts";
import WorkSheet from "@/pages/ProjectPlanner/components/WorkSheet.tsx";


interface WorkTableProps {
    data: WorkResponse[]
    status: StatusEnum;
}

function WorkTable({data, status}: WorkTableProps) {

    function filteredWorks(filter: StatusEnum) {
        return data!.filter(work => {
            const name = work.statusDto.progress.toUpperCase();
            return name.includes(filter)
        })
    }

    return (
        <ScrollArea className="w-full rounded-md border bg-accent/[0.5]">
            <div className="p-4 max-h-[35rem]">
                <h4 className="mb-4 text-lg font-medium leading-none">{status}</h4>
                {filteredWorks(status).map((work) => (
                    <>
                        <div key={`${work.id}-div`} className="text-sm">
                            <WorkSheet
                                key={work.id}
                                id={work.id}
                                title={work.title}
                                targetDate={work.targetDate}
                                description={work.description}
                                createdAt={work.createdAt}
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
    );
}

export default WorkTable;