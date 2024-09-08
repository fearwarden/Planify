import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button.tsx";
import {WorkResponse} from "@/types/ProjectType.ts";
import WorkCard from "@/pages/ProjectPlanner/components/WorkCard.tsx";

function WorkSheet({id, title, description, targetDate, createdAt, typeDto, statusDto, assignee}: WorkResponse) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <a className="w-full">
                    <WorkCard
                        key={id}
                        id={id}
                        title={title}
                        targetDate={targetDate}
                        description={description}
                        createdAt={createdAt}
                        typeDto={typeDto}
                        statusDto={statusDto}
                        assignee={assignee}
                    />
                </a>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">

                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default WorkSheet;