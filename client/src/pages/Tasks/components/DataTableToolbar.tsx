import { Input } from "@/components/ui/input";
import {
  DesktopIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";

import DataTableFacetedFilter from "./DataTableFacetedFilter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { filter, FilterState } from "@/store/slice/filterSlice";
import { Button } from "@/components/ui/button";
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
        <Input
          placeholder="Filter tasks..."
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DataTableFacetedFilter
          title="category"
          options={[
            { label: "work", icon: DesktopIcon },
            { label: "personal", icon: DesktopIcon },
            { label: "health", icon: DesktopIcon },
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
        {filters.isActive && (
          <Button size="sm" variant="outline" onClick={clearFilters}>
            Clear Filter
          </Button>
        )}
      </div>
    </div>
  );
}

export default DataTableToolbar;
