import {useParams} from "react-router-dom";
import {useQueries} from "@tanstack/react-query";
import {getProject} from "@/api/projects/projects.ts";
import ProjectToolbar from "@/pages/ProjectPlanner/components/ProjectToolbar.tsx";
import CreateWorkModal from "@/pages/ProjectPlanner/modals/CreateWorkModal.tsx";
import {getWorksForProject} from "@/api/projects/works.ts";
import {StatusEnum} from "@/types/TaskType.ts";
import WorkTable from "@/pages/ProjectPlanner/components/WorkTable.tsx";

function Project() {
    const {projectId} = useParams();

    const [project, works] = useQueries({
        queries: [
            {
                queryKey: ["projects", projectId],
                queryFn: () => getProject(projectId!)
            },
            {
                queryKey: ["works", projectId],
                queryFn: () => getWorksForProject(projectId!),
                refetchInterval: 3000,
                refetchIntervalInBackground: true,
            }
        ]
    });

    if (project.isPending) return <span>Loading Project...</span>;
    if (project.isError) return <span>Error: {project.error.message}</span>;
    if (works.isPending) return <span>Loading Project...</span>;
    if (works.isError) return <span>Error: {works.error.message}</span>;
    return (
        <main className="flex flex-col items-center relative min-h-screen">
            <div className="flex-1 w-[80%] flex flex-col items-center p-8">
                <div className="flex flex-col gap-10 flex-1 w-full relative">
                    <div className="flex flex-row items-center justify-between gap-5">
                        <h1 className="text-3xl">{project.data?.name}</h1>
                        <CreateWorkModal projectId={projectId!}/>
                    </div>
                    <div>
                        <ProjectToolbar/>
                    </div>
                    <div className="flex flex-row gap-10 justify-between">
                            <WorkTable data={works.data} status={StatusEnum.ON_HOLD}/>
                            <WorkTable data={works.data} status={StatusEnum.TO_DO}/>
                            <WorkTable data={works.data} status={StatusEnum.PROGRESS}/>
                            <WorkTable data={works.data} status={StatusEnum.COMPLETE}/>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Project;