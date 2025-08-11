import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {ProjectResponse} from "@/types/ProjectType.ts";
import {Progress} from "@/components/ui/progress";
import {calculateDaysAgo} from "@/tools/utils.ts";
import {useQuery} from "@tanstack/react-query";
import {countAllByProject} from "@/api/projects/works.ts";

function ProjectCard({id, name, status, iconPath, createdAt}: ProjectResponse) {

    const {isPending, isError, data, error} = useQuery({
        queryKey: ["works-count-by-project", id],
        queryFn: () => countAllByProject(id)
    })

    function calculatePercentageOfCompleted(): number {
        if (data === undefined) return 0;
        if (data.total === 0) return 0;
        return (data?.totalCompleted / data?.total) * 100;
    }

    if (isPending) return <span>Loading Statistics Data...</span>;
    if (isError) return <span>Error: {error.message}</span>;
    return (
        <Card className="w-[400px] hover: cursor-pointer hover:border-accent-foreground">
            <CardHeader className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-5">
                    <div>
                        <img src={iconPath} width={80} height={80} alt="Project Image"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <CardTitle>{name}</CardTitle>
                        <CardDescription className="pt-1">
                            <Badge className="w-[80px]">
                                {status}
                            </Badge>
                        </CardDescription>
                    </div>
                </div>
                <div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3">
                    <div className="w-full flex flex-row justify-between">
                        <h1>{calculatePercentageOfCompleted()}% Completed</h1>
                        <h1>{data?.totalCompleted}/{data?.total}</h1>
                    </div>
                    <Progress/>
                    <h1>Created {calculateDaysAgo(createdAt)}</h1>
                </div>
            </CardContent>
        </Card>
    );
}

export default ProjectCard;
