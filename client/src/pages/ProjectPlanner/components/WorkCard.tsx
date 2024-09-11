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
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"

function WorkCard({id, title, typeDto, statusDto, assignee}: WorkResponse) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
    });

    return (
        <Card
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="w-full hover:cursor-pointer hover:scale-105" style={{
            boxShadow: '15px 10px 30px rgb(2, 8, 23)',
            // 36, 59, 85 right color
            background: 'linear-gradient(to right, rgb(2, 8, 23), rgb(30, 41, 59))',
            transform: CSS.Transform.toString(transform),
            transition: transition
        }}>
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
                                <AvatarFallback className="bg-card/[.38]">{assignee.userDto.firstName.split("")[0] + assignee.userDto.lastName.split("")[0]}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}

export default WorkCard;