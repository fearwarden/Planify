import SearchProjects from "@/pages/ProjectPlanner/components/SearchProjects.tsx";
import {useQuery} from "@tanstack/react-query";
import {getProjects} from "@/api/projects/projects.ts";
import ProjectCard from "@/pages/ProjectPlanner/components/ProjectCard.tsx";

function Projects() {

    const {isPending, isError, data, error} = useQuery({
        queryKey: ["projects"],
        queryFn: getProjects
    })

    if (isPending) return <span>Loading Tasks...</span>;
    if (isError) return <span>Error: {error.message}</span>;
    return (
        <main className="flex w-full flex-1 flex-col py-10">
            <div className="container px-4 lg:px-20 w-full mx-auto pt-0">
                <h1 className="flex text-[28px] leading-[34px] tracking-[-0.416px] text-neutral-12 font-bold pt-4">
                    Projects
                </h1>
                <SearchProjects/>
            </div>
            <div className="flex-1 flex pb-12">
                <div className="mx-auto w-full container lg:px-20 pt-0">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto">
                        {data?.map((project) => (
                            <ProjectCard
                                key={project.id}
                                id={project.id}
                                name={project.name}
                                iconPath={project.iconPath}
                                status={project.status}
                                url={project.url}
                                createdAt={project.createdAt}
                                updatedAt={project.updatedAt}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Projects;