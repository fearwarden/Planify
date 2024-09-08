import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge";
import {WorkResponse} from "@/types/ProjectType.ts";

function WorkCard({title, typeDto, statusDto, assignee}: WorkResponse) {

    return (
        <Card className="w-full hover:cursor-pointer hover:border-accent-foreground">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    <div className="flex flex-row gap-3 pt-3 justify-between items-center">
                        <div className="flex flex-row gap-1">
                            <Badge>
                                {statusDto.progress}
                            </Badge>
                            <Badge>
                                {typeDto.type}
                            </Badge>
                        </div>
                        <div className="flex items-end">
                            <Avatar>
                                <AvatarFallback>{assignee.userDto.firstName.split("")[0] + assignee.userDto.lastName.split("")[0]}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}

export default WorkCard;