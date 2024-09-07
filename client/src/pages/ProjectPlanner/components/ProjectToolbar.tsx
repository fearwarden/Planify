import {
    CheckCircledIcon,
    FileTextIcon,
    LapTimerIcon,
    QuestionMarkCircledIcon,
    ActivityLogIcon
} from "@radix-ui/react-icons";
import {ClipboardCheck, Bug} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import ProjectFacetedFilter from "@/pages/ProjectPlanner/components/ProjectFacetedFilter.tsx";

function ProjectToolbar() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input type="search" className="h-8 w-[150px] lg:w-[250px]" placeholder="Search work" />
            </div>
            <div className="flex flex-row gap-2">
            <ProjectFacetedFilter
                title="type"
                options={[
                    {label: "FEATURE", icon: ActivityLogIcon},
                    {label: "BUG", icon: Bug},
                    {label: "TASK", icon: ClipboardCheck},
                ]}
            />
            <ProjectFacetedFilter
                title="status"
                options={[
                    {label: "COMPLETE", icon: CheckCircledIcon},
                    {label: "PROGRESS", icon: QuestionMarkCircledIcon},
                    {label: "ON HOLD", icon: LapTimerIcon},
                    {label: "TO DO", icon: FileTextIcon}
                ]}
            />
            </div>
        </div>
    );
}

export default ProjectToolbar;