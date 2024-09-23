import {DotsVerticalIcon, TrashIcon,} from "@radix-ui/react-icons";

import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {Command, CommandGroup, CommandItem, CommandList,} from "@/components/ui/command";
import useGenericMutation from "@/hooks/useGenericMutation.ts";
import {deleteProject} from "@/api/projects/projects.ts";
import {toast} from "@/hooks/use-toast.ts";
import {format} from "date-fns";

interface ProjectActionProps {
    projectId: string
}

const useDeleteProjectMutation = () => {
    return useGenericMutation({
        mutationFn: deleteProject,
        invalidateQueries: [['projects']],
        onSuccess: () => {
            const date = new Date();
            const formattedDate = format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");
            toast({
                title: `Project has been deleted`,
                description: `${formattedDate}`
            });
        }
    })
}

function ProjectAction({ projectId }: ProjectActionProps) {
    const deleteMutation = useDeleteProjectMutation();

    return (
        <Popover>
            <PopoverTrigger asChild className="hover:cursor-pointer">
                <DotsVerticalIcon
                    className="absolute top-6 right-3 size-4 hover:cursor-pointer hover:bg-accent hover:border-2 hover:rounded"
                />
            </PopoverTrigger>
            <PopoverContent className="w-40">
                <Command>
                    <CommandList>
                        <CommandGroup heading="Project Actions">
                            <CommandItem className="gap-2 hover:cursor-pointer">
                            </CommandItem>
                            <a onClick={() => deleteMutation.mutate(projectId!)}>
                                <CommandItem className="gap-2 hover:cursor-pointer">
                                    <TrashIcon/>
                                    <span>Delete</span>
                                </CommandItem>
                            </a>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default ProjectAction;