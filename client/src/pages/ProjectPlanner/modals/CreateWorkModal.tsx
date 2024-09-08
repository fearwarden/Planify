import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useMutation, useQueries, useQueryClient} from "@tanstack/react-query";
import {getAllTypes, getMembershipsForProject, getStatuses} from "@/api/projects/projects.ts";
import {convertToTimestamp} from "@/tools/utils.ts";
import {WorkType} from "@/types/ProjectType.ts";
import {createWork} from "@/api/projects/works.ts";
import {WorkSchema} from "@/validation/schemas.ts";

function CreateWorkModal({ projectId }: {projectId: string}) {
    const [open, setOpen] = useState<boolean>(false);
    const [workName, setWorkName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [targetDate, setTargetDate] = useState<string>("");
    const [targetTime, setTargetTime] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [assignee, setAssignee] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const queryClient = useQueryClient();

    const [types, memberships, statuses] = useQueries({
        queries: [
            {
                queryKey: ["types"],
                queryFn: getAllTypes,
                enabled: open
            },
            {
                queryKey: ["memberships"],
                queryFn: () => getMembershipsForProject(projectId),
                enabled: open
            },
            {
                queryKey: ["statuses"],
                queryFn: getStatuses,
                enabled: open
            }
        ]
    });

    const workMutation = useMutation({
        mutationFn: createWork,
        onError: (error) => {
            setErrorMessage(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["works", projectId] });
        }
    })

    function handleCreateWork() {
        const target = convertToTimestamp(targetDate, targetTime);
        const currentType = types.data?.filter((el) => el.id === type)[0];
        const currentStatus = statuses.data?.filter((el) => el.id === parseInt(status))[0];
        const currentEmployee = memberships.data?.filter((el) => el.userDto.id === assignee)[0];
        if (!currentType || !currentEmployee || !currentStatus) {
            alert("Error while creating, please reload the page and try again.")
            return;
        }
        const body: WorkType = {
            title: workName,
            targetDate: target,
            description: description,
            projectId: projectId,
            type: currentType,
            status: currentStatus,
            user: currentEmployee.userDto
        }
        const validation = WorkSchema.safeParse(body);
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
        workMutation.mutate(validation.data);
    }

    if (open && types.isPending) return <span>Loading...</span>;
    if (open && types.isError) return <span>Error: {types.error.message}</span>;
    if (open && memberships.isPending) return <span>Loading...</span>;
    if (open && memberships.isError) return <span>Error: {memberships.error.message}</span>;
    if (open && statuses.isPending) return <span>Loading...</span>;
    if (open && statuses.isError) return <span>Error: {statuses.error.message}</span>;
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Button>Add new work</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[425px]">
                <SheetHeader>
                    <SheetTitle>Create Work</SheetTitle>
                    <SheetDescription>
                        Create task and organize your project
                    </SheetDescription>
                </SheetHeader>
                <Separator className="mt-4 p-[1px]" />
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-start gap-4">
                        <Label htmlFor="work-name" className="whitespace-nowrap">
                            Work Name
                        </Label>
                        <Input
                            id="work-name"
                            placeholder="Work name"
                            value={workName}
                            onChange={(e) => setWorkName(e.target.value)}
                            className="col-span-3"
                        />
                        <Label htmlFor="description" className="whitespace-nowrap">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-1 items-start gap-4">
                        <Label htmlFor="date" className="whitespace-nowrap">
                            Target Date
                        </Label>
                        <Input type="date" id="date" onChange={(e) => setTargetDate(e.target.value)} />
                        <Label htmlFor="time" className="whitespace-nowrap">
                            Target Time
                        </Label>
                        <Input type="time" onChange={(e) => setTargetTime(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 items-start gap-4">
                        <Select onValueChange={(value) => setType(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Work Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Task Types</SelectLabel>
                                    {types.data?.map((t) => (
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
                                <SelectValue placeholder="Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Task Status</SelectLabel>
                                    {statuses.data?.map((s) => (
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
                        <Select onValueChange={(value) => setAssignee(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Assaign to an employee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Employee</SelectLabel>
                                    {memberships.data?.map((member) => (
                                        <SelectItem
                                            className="hover:cursor-pointer hover:bg-accent"
                                            value={member.userDto.id}
                                            key={member.id}
                                        >
                                            {member.userDto.email}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={handleCreateWork}>Create</Button>
                    </SheetClose>
                </SheetFooter>
                {errorMessage && <h1>{errorMessage}</h1>}
            </SheetContent>
        </Sheet>
    );
}

export default CreateWorkModal;