import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {ProjectResponse} from "@/types/ProjectType.ts";


function ProjectCard ({ name, status, iconPath }: ProjectResponse) {
    console.log(iconPath)
    return (
        <Card className="w-[400px]">
            <CardHeader>
                <div className="flex flex-row">
                    <div>
                        <img src={iconPath} width={100} height={100} alt="Project Image" />
                    </div>
                    <div className="flex flex-col items-start">
                        <CardTitle>{name}</CardTitle>
                        <CardDescription className="pt-1">
                            <Badge className="w-[80px]" variant={"blue"}>{status}</Badge>
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default ProjectCard