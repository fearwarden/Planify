import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { PlusCircledIcon } from "@radix-ui/react-icons";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterState, filter } from "@/store/slice/filterSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface DataTableFacetedFilterProps {
  title?: string;
  options: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

function DataTableFacetedFilter({
  title,
  options,
}: DataTableFacetedFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const handleFilter = (params: string) => {
    if (!title) return;
    setSelectedFilter(params);
    const payload: FilterState = {
      isActive: true,
      filter: params,
      type: title,
    };
    dispatch(filter(payload));
  };

  const clearFilters = () => {
    const payload: FilterState = {
      isActive: false,
      filter: "",
      type: "",
    };
    dispatch(filter(payload));
  };
  return (
    <div className="flex gap-5">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            {title}
            {selectedFilter.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedFilter}
                </Badge>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <RadioGroup
            className="p-1"
            defaultValue={selectedFilter}
            onValueChange={handleFilter}
          >
            {options.map((option) => {
              return (
                <div
                  className="flex items-center space-x-3 p-2 hover:hover:bg-muted/50 hover:rounded-md"
                  key={option.label}
                >
                  <RadioGroupItem
                    className="rounded-sm"
                    value={option.label}
                    id={option.label}
                    checked={option.label === filters.filter}
                  />
                  {option.icon && (
                    <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  )}
                  <Label
                    htmlFor={option.label}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </PopoverContent>
      </Popover>
      {filters.isActive && (
        <Button size="sm" variant="outline" onClick={clearFilters}>
          Clear Filter
        </Button>
      )}
    </div>
  );
}

export default DataTableFacetedFilter;
