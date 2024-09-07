import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getProject} from "@/api/projects/projects.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import ProjectToolbar from "@/pages/ProjectPlanner/components/ProjectToolbar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import CreateWorkModal from "@/pages/ProjectPlanner/modals/CreateWorkModal.tsx";

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

function Project() {
    const { projectId } = useParams();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["projects", projectId],
        queryFn: () => getProject(projectId!)
    })

    if (isPending) return <span>Loading Project...</span>;
    if (isError) return <span>Error: {error.message}</span>;
    return (
        <main className="flex flex-col items-center relative min-h-screen">
            <div className="flex-1 w-2/3 flex flex-col items-center p-8">
                <div className="flex flex-col gap-10 flex-1 w-full relative">
                    <div className="flex flex-row items-center justify-between gap-5">
                        <h1 className="text-3xl">{data?.name}</h1>
                        <CreateWorkModal projectId={projectId!} />
                    </div>
                    <div>
                        <ProjectToolbar/>
                    </div>
                    <div className="flex flex-row justify-between">
                        {/*TODO: separate ScrollArea to its own component*/}
                        <ScrollArea className="w-64 rounded-md border">
                            <div className="p-4 max-h-96">
                                <h4 className="mb-4 text-sm font-medium leading-none">On Hold</h4>
                                {tags.map((tag) => (
                                    <>
                                        <div key={tag} className="text-sm">
                                            {tag}
                                        </div>
                                        <Separator className="my-2"/>
                                    </>
                                ))}
                            </div>
                        </ScrollArea>
                        <ScrollArea className="w-64 rounded-md border">
                            <div className="p-4 max-h-96">
                                <h4 className="mb-4 text-sm font-medium leading-none">To Do</h4>
                                {tags.map((tag) => (
                                    <>
                                        <div key={tag} className="text-sm">
                                            {tag}
                                        </div>
                                        <Separator className="my-2"/>
                                    </>
                                ))}
                            </div>
                        </ScrollArea>
                        <ScrollArea className="w-64 rounded-md border">
                            <div className="p-4 max-h-96">
                                <h4 className="mb-4 text-sm font-medium leading-none">In Progress</h4>
                                {tags.map((tag) => (
                                    <>
                                        <div key={tag} className="text-sm">
                                            {tag}
                                        </div>
                                        <Separator className="my-2"/>
                                    </>
                                ))}
                            </div>
                        </ScrollArea>
                        <ScrollArea className="w-64 rounded-md border">
                            <div className="p-4 max-h-96">
                                <h4 className="mb-4 text-sm font-medium leading-none">Done</h4>
                                {tags.map((tag) => (
                                    <>
                                        <div key={tag} className="text-sm">
                                            {tag}
                                        </div>
                                        <Separator className="my-2"/>
                                    </>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Project;