import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

function SearchProjects() {
    return (
        <div className="flex flex-row items-center justify-between gap-4 h-16 mb-2">
            <Input placeholder="search projects"/>
            <Button variant={"blue"}>New Project</Button>
        </div>
    )
}

export default SearchProjects;