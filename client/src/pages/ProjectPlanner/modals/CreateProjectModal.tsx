import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {useState} from "react";

function CreateModal() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant={"blue"}>Create Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Create project and organize your team
                    </DialogDescription>
                </DialogHeader>
                <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">

                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button onClick={() => setOpen(false)}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateModal;