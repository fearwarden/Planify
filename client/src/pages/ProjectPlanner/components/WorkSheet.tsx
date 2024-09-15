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
import {CalendarIcon, Trash2} from "lucide-react";
import {EditWorkDataType, WorkResponse} from "@/types/ProjectType.ts";
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
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {EditWorkSchema} from "@/validation/schemas.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast.ts";
import {editWork} from "@/api/projects/works.ts";

function WorkSheet({
                       id,
                       title,
                       description,
                       workOrder,
                       targetDate,
                       createdAt,
                       typeDto,
                       statusDto,
                       assignee
                   }: WorkResponse) {
    const [open, setOpen] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);
    const [newDesc, setNewDesc] = useState<string>(description);
    const [newAssignee, setNewAssignee] = useState<string>(assignee.userDto.id);
    const [newTargetDate, setNewTargetDate] = useState<Date>(new Date(formatArrayDate(targetDate)));
    const [type, setType] = useState<string>(typeDto.id);
    const [status, setStatus] = useState<string>(statusDto.id.toString());
    const [errorMessage, setErrorMessage] = useState<string>("");

    const context = useContext(ProjectMetadataContext);
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const editWorkMutation = useMutation({
        mutationFn: editWork,
        onError: (error) => {
            setErrorMessage(error.message);
        },
        onSuccess: () => {
            const date = new Date();
            const formattedDate = format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");
            toast({
                title: `${newTitle} - has been updated`,
                description: `${formattedDate}`
            });
            queryClient.invalidateQueries({queryKey: ["works"]})
        }
    })

    function handleDateSelect(date: Date | undefined) {
        if (date) {
            setNewTargetDate(date);
        }
    }

    async function handleEditWork() {
        const payload: EditWorkDataType = {
            title: newTitle,
            description: newDesc,
            targetDate: newTargetDate.toISOString(),
            typeId: type,
            statusId: parseInt(status),
            assigneeId: newAssignee
        };
        const validation = EditWorkSchema.safeParse(payload);
        if (!validation.success) {
            setErrorMessage(
                JSON.parse(
                    validation.error.message
                        .slice(validation.error.message.search("message"))
                        .split(":")[1]
                        .split(",")[0]
                )
            );
            return;
        }
        editWorkMutation.mutate({ workId: id, data: validation.data });
    }

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
                        onChange={(e) => {
                            setNewTitle(e.target.value)
                        }}
                    />
                    <Label className="text-lg" htmlFor="assignee">Assignee</Label>
                    <Select onValueChange={(value) => setNewAssignee(value)}>
                        <SelectTrigger id="assignee" className="h-10 text-[1rem]">
                            <SelectValue placeholder={assignee.userDto.email}/>
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
                                <SelectValue placeholder={typeDto.type}/>
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
                                <SelectValue placeholder={statusDto.progress}/>
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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full",
                                        !targetDate && "text-muted-foreground"
                                    )}
                                >
                                    {newTargetDate ? (
                                        format(newTargetDate, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )
                                    }
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={newTargetDate}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Textarea className="h-72" value={newDesc} onChange={(e) => setNewDesc(e.target.value)}/>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={handleEditWork}>Save changes</Button>
                    </SheetClose>
                    {errorMessage && <span>{errorMessage}</span>}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default WorkSheet;