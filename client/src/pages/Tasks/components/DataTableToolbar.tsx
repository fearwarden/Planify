import {
    ArrowUpIcon,
    ArrowDownIcon,
    ArrowRightIcon,
    PersonIcon,
    LaptopIcon,
    TokensIcon,
    ClockIcon,
    CheckCircledIcon,
    QuestionMarkCircledIcon,
    LapTimerIcon,
    KeyboardIcon,
    TrashIcon, FileTextIcon,
} from "@radix-ui/react-icons";
import {
  CircleDollarSign,
  Lightbulb,
  HeartPulse,
  GraduationCap,
} from "lucide-react";

import DataTableFacetedFilter from "./DataTableFacetedFilter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { filter, FilterState } from "@/store/slice/filterSlice";
import { Button } from "@/components/ui/button";
import CreateTask from "../modals/CreateTask";
import SearchTasksModal from "../modals/SearchTasksModal";

function DataTableToolbar() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const clearFilters = () => {
    const payload: FilterState = {
      isActive: false,
      filter: "",
      type: "",
    };
    dispatch(filter(payload));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <SearchTasksModal />
        <DataTableFacetedFilter
          title="category"
          options={[
            { label: "work", icon: LaptopIcon },
            { label: "personal", icon: PersonIcon },
            { label: "health", icon: HeartPulse },
            { label: "education", icon: GraduationCap },
            { label: "finance", icon: CircleDollarSign },
            { label: "urgent", icon: ClockIcon },
            { label: "ideas", icon: Lightbulb },
            { label: "games", icon: KeyboardIcon },
            { label: "other", icon: TokensIcon },
          ]}
        />
        <DataTableFacetedFilter
          title="priority"
          options={[
            { label: "HIGH", icon: ArrowUpIcon },
            { label: "MEDIUM", icon: ArrowRightIcon },
            { label: "LOW", icon: ArrowDownIcon },
          ]}
        />
        <DataTableFacetedFilter
          title="status"
          options={[
            { label: "COMPLETE", icon: CheckCircledIcon },
            { label: "PROGRESS", icon: QuestionMarkCircledIcon },
            { label: "ON HOLD", icon: LapTimerIcon },
              { label: "TO DO", icon:  FileTextIcon}
          ]}
        />
        {filters.isActive && (
          <Button size="sm" variant="outline" onClick={clearFilters}>
            {<TrashIcon />} Clear Filter
          </Button>
        )}
      </div>
      <CreateTask />
    </div>
  );
}

export default DataTableToolbar;
