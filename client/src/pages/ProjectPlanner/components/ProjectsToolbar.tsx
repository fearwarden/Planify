import {Input} from "@/components/ui/input.tsx";
import CreateProjectModal from "@/pages/ProjectPlanner/modals/CreateProjectModal.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";
import {Role} from "@/enums/Role.ts";

function ProjectsToolbar() {
    const user = useSelector((state: RootState) => state.users);
    return (
        <div className="flex flex-row items-center justify-between gap-4 h-16 mb-2">
            <Input placeholder="search projects"/>
            {user.role === Role.USER ? "" : <CreateProjectModal/>}
        </div>
    )
}

export default ProjectsToolbar;