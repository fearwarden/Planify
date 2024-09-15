import {Link, useParams} from "react-router-dom";
import {useQueries} from "@tanstack/react-query";
import {getAllTypes, getMembershipsForProject, getProject, getStatuses} from "@/api/projects/projects.ts";
import ProjectToolbar from "@/pages/ProjectPlanner/components/ProjectToolbar.tsx";
import CreateWorkModal from "@/pages/ProjectPlanner/modals/CreateWorkModal.tsx";
import {getWorksForProject} from "@/api/projects/works.ts";
import {StatusEnum} from "@/types/TaskType.ts";
import WorkTable from "@/pages/ProjectPlanner/components/WorkTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PROJECT_PLANNER} from "@/constants/constants.ts";
import {ProjectMetadataContext, ProjectMetadataContextType} from "@/hooks/contexts.ts";
import {Toaster} from "@/components/ui/toaster.tsx";

function Project() {
    const {projectId} = useParams();

    const [project, works, types, memberships, statuses] = useQueries({
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
            },
            {
                queryKey: ["types"],
                queryFn: getAllTypes,
            },
            {
                queryKey: ["memberships"],
                queryFn: () => getMembershipsForProject(projectId!),
            },
            {
                queryKey: ["statuses"],
                queryFn: getStatuses,
            }
        ]
    });

    const metadata: ProjectMetadataContextType = {
        types: types.data!,
        memberships: memberships.data!,
        statuses: statuses.data!
    }

    if (project.isPending) return <span>Loading Project...</span>;
    if (project.isError) return <span>Error: {project.error.message}</span>;
    if (works.isPending) return <span>Loading Project...</span>;
    if (works.isError) return <span>Error: {works.error.message}</span>;
    if (types.isPending) return <span>Loading Project...</span>;
    if (types.isError) return <span>Error: {types.error.message}</span>;
    if (memberships.isPending) return <span>Loading Project...</span>;
    if (memberships.isError) return <span>Error: {memberships.error.message}</span>;
    if (statuses.isPending) return <span>Loading Project...</span>;
    if (statuses.isError) return <span>Error: {statuses.error.message}</span>;
    return (
        <main className="flex flex-col items-center relative min-h-screen">
            <ProjectMetadataContext.Provider value={metadata}>
                <div className="flex-1 w-[80%] flex flex-col items-center p-8">
                    <div className="flex flex-col gap-10 flex-1 w-full relative">
                        <div className="flex flex-row items-center justify-between gap-5">
                            <div className="flex items-center gap-3">
                                <Link to={PROJECT_PLANNER}><Button>Back to Projects</Button></Link>
                                <h1 className="text-3xl">{project.data?.name}</h1>
                            </div>
                            <CreateWorkModal
                                projectId={projectId!}
                            />
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
                    <Toaster />
                </div>
            </ProjectMetadataContext.Provider>
        </main>
    );
}

export default Project;