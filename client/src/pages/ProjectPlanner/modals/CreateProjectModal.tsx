import { Button } from "@/components/ui/button";
import { CaretDownIcon } from "@radix-ui/react-icons"
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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAllUsers} from "@/api/user/user.ts";
import {IUser} from "@/types/UserTypes.ts";
import {ProjectSchema} from "@/validation/schemas.ts";
import {ProjectDataType} from "@/types/ProjectType.ts";
import {createProject} from "@/api/projects/projects.ts";
import {AxiosResponse} from "axios";
import {Separator} from "@/components/ui/separator.tsx";

type Checked = DropdownMenuCheckboxItemProps["checked"];

function CreateProjectModal() {
    const [open, setOpen] = useState<boolean>(false);
    const [showStatusBar, setShowStatusBar] = useState<Record<string, Checked>>({});
    const [projectName, setProjectName] = useState<string>("");
    const [employees, setEmployees] = useState<IUser[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const queryClient = useQueryClient();

    const { data, isError, isPending, error } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });

    const projectMutation = useMutation({
        mutationFn: createProject,
        onError: (error: AxiosResponse) => {
            setErrorMessage(error.request.response);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    })

    function handleCheckedChange(userId: string, checked: boolean) {
        setShowStatusBar((prevState) => ({
            ...prevState,
                [userId]: checked
        }));
    }

    function handleEmployeesState(newEmployee: IUser) {
        if (employees.includes(newEmployee)) {
            setEmployees(employees.filter((employee) => employee.id !== newEmployee.id))
            setShowStatusBar((prevState) => ({
                ...prevState,
                [newEmployee.id]: false
            }));
        } else {
            setEmployees([...employees, newEmployee]);
            setShowStatusBar((prevState) => ({
                ...prevState,
                [newEmployee.id]: true
            }))
        }
    }

    function handleCreateProject() {
        const payload: ProjectDataType = {
            name: projectName,
            employees: employees
        }
        const validation = ProjectSchema.safeParse(payload);
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
        projectMutation.mutate(validation.data);
    }

    if (isPending) return <span>Loading...</span>
    if (isError) return <span>Error: {error.message}</span>
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Button variant={"blue"}>New Project</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[425px]">
                <SheetHeader>
                    <SheetTitle>Create Project</SheetTitle>
                    <SheetDescription>
                        Create project and organize your team
                    </SheetDescription>
                </SheetHeader>
                <Separator className="mt-4 p-[1px]" />
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-start gap-4">
                        <Label htmlFor="project-name" className="whitespace-nowrap">
                            Project Name
                        </Label>
                        <Input
                            id="project-name"
                            placeholder="Project name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-1/2 flex flex-row justify-between items-center">
                                Employees <CaretDownIcon className="size-5"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Employees</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {data?.map((user) => (
                                <div key={`${user.id}-div`}>
                                    <DropdownMenuCheckboxItem
                                        key={user.id}
                                        className="hover:cursor-pointer hover:bg-accent"
                                        checked={showStatusBar[user.id] || false}
                                        onCheckedChange={(checked) => handleCheckedChange(user.id, checked)}
                                        onClick={() => handleEmployeesState(user)}
                                    >
                                        {`${user.firstName} ${user.lastName}`}
                                    </DropdownMenuCheckboxItem>
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="blue" onClick={handleCreateProject}>Create</Button>
                    </SheetClose>
                </SheetFooter>
                {errorMessage && <h1>{errorMessage}</h1>}
            </SheetContent>
        </Sheet>
    );
}

export default CreateProjectModal;