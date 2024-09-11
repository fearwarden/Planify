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
import {Trash2} from "lucide-react";
import {WorkResponse} from "@/types/ProjectType.ts";
import WorkCard from "@/pages/ProjectPlanner/components/WorkCard.tsx";
import {formatArrayDate} from "@/tools/utils.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useContext, useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {ProjectMetadataContext} from "@/hooks/contexts.ts";
import {Textarea} from "@/components/ui/textarea.tsx";

function WorkSheet({id, title, description, targetDate, createdAt, typeDto, statusDto, assignee, workOrder}: WorkResponse) {
    const [open, setOpen] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);
    const [newDesc, setNewDesc] = useState<string>(description);
    const [newAssignee, setNewAssignee] = useState<string>(assignee.userDto.id);
    const [type, setType] = useState<string>(typeDto.id);
    const [status, setStatus] = useState<string>(statusDto.id.toString());

    const context = useContext(ProjectMetadataContext);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <a className="w-full">
                    <WorkCard
                        key={id}
                        id={id}
                        title={title}
                        targetDate={targetDate}
                        workOrder={workOrder}
                        description={newDesc}
                        createdAt={createdAt}
                        typeDto={typeDto}
                        statusDto={statusDto}
                        assignee={assignee}
                    />
                </a>
            </SheetTrigger>
            <SheetContent className="min-w-[35rem]">
                <SheetHeader>
                    <div className="flex flex-row justify-between py-4">
                        <div>
                            <SheetTitle className="text-xl">Edit work item</SheetTitle>
                            <SheetDescription>
                                Created {formatArrayDate(createdAt)}
                            </SheetDescription>
                        </div>
                        <div>
                            <Button variant="destructive"><Trash2/></Button>
                        </div>
                    </div>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <Label htmlFor="title" className="text-lg">Title</Label>
                    <Input
                        id="title"
                        className="h-10 text-[1rem]"
                        value={newTitle}
                        onChange={(e) => {setNewTitle(e.target.value)}}
                    />
                    <Label className="text-lg" htmlFor="assignee">Assignee</Label>
                    <Select onValueChange={(value) => setNewAssignee(value)}>
                        <SelectTrigger id="assignee" className="h-10 text-[1rem]">
                            <SelectValue placeholder={assignee.userDto.email} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Employee</SelectLabel>
                                {context?.memberships.map((member) => (
                                    <SelectItem
                                        className="hover:cursor-pointer hover:bg-accent"
                                        value={member.userDto.id}
                                        key={`${member.id}-edit`}
                                    >
                                        {member.userDto.email}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="flex flex-row justify-between gap-10">
                        <Select onValueChange={(value) => setType(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={typeDto.type} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Task Types</SelectLabel>
                                    {context?.types.map((t) => (
                                        <SelectItem
                                            className="hover:cursor-pointer hover:bg-accent"
                                            value={t.id}
                                            key={t.id}
                                        >
                                            {t.type}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => setStatus(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={statusDto.progress} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Task Status</SelectLabel>
                                    {context?.statuses.map((s) => (
                                        <SelectItem
                                            className="hover:cursor-pointer hover:bg-accent"
                                            value={s.id.toString()}
                                            key={s.id}
                                        >
                                            {s.progress}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Textarea className="h-72" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
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