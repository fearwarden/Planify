import {
  DotsHorizontalIcon,
  TrashIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { TaskResponse } from "@/types/TaskType";
import EditTaskModal from "../modals/EditTaskModal";

export interface DataTableRowActionProps<TData> {
  data: TData;
}

function DataTableRowAction({ data }: DataTableRowActionProps<TaskResponse>) {
  return (
    <Popover>
      <PopoverTrigger asChild className="hover:cursor-pointer">
        <DotsHorizontalIcon />
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <Command>
          <CommandList>
            <CommandGroup heading="Task Actions">
              <CommandItem className="gap-2 hover:cursor-pointer">
                <EditTaskModal taskData={data} />
              </CommandItem>
              <a>
                <CommandItem className="gap-2 hover:cursor-pointer">
                  <TrashIcon />
                  <span>Delete</span>
                </CommandItem>
              </a>
              <a>
                <CommandItem className="gap-2 hover:cursor-pointer">
                  <CheckCircledIcon />
                  <span>Complete</span>
                </CommandItem>
              </a>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default DataTableRowAction;
