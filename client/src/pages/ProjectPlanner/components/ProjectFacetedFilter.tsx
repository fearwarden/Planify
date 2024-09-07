import {DataTableFacetedFilterProps} from "@/pages/Tasks/components/DataTableFacetedFilter.tsx";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PlusCircledIcon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";

function ProjectFacetedFilter({title, options}: DataTableFacetedFilterProps) {
    const [selectedFilter, setSelectedFilter] = useState<string>("");

    const handleFilter = (params: string) => {
        setSelectedFilter(params);
    };

    return (
        <div className="flex gap-5">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 border-dashed">
                        <PlusCircledIcon className="mr-2 h-4 w-4"/>
                        {title}
                        {selectedFilter.length > 0 && (
                            <>
                                <Separator orientation="vertical" className="mx-2 h-4"/>
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
                                        checked={false}
                                    />
                                    {option.icon && (
                                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
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
        </div>
    );
}

export default ProjectFacetedFilter;