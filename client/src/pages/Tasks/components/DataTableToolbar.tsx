import { Input } from "@/components/ui/input";
import { DesktopIcon } from "@radix-ui/react-icons";

import DataTableFacetedFilter from "./DataTableFacetedFilter";
function DataTableToolbar() {
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
      </div>
    </div>
  );
}

export default DataTableToolbar;
