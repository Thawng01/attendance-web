import React, { useState, type Dispatch, type SetStateAction } from "react";
import {
    format,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    subDays,
    subWeeks,
    subMonths,
    subYears,
} from "date-fns";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type DateRange = {
    from: Date;
    to: Date;
};

export type DateFilterType =
    | "today"
    | "yesterday"
    | "week"
    | "lastWeek"
    | "month"
    | "lastMonth"
    | "year"
    | "lastYear"
    | "custom";

interface DateFilterProps {
    onDateRangeChange: (range: DateRange, filterType: string) => void;
    className?: string;
    dateRange: DateRange;
    setDateRange: Dispatch<SetStateAction<DateRange>>;
    onSingleDate: Dispatch<SetStateAction<boolean>>;
}

export const DateFilter: React.FC<DateFilterProps> = ({
    onDateRangeChange,
    className,
    dateRange,
    setDateRange,
    onSingleDate,
}) => {
    const [selectedFilter, setSelectedFilter] =
        useState<DateFilterType>("today");

    const handleFilterChange = (filterType: DateFilterType) => {
        setSelectedFilter(filterType);

        const today = new Date();
        let range: DateRange;

        switch (filterType) {
            case "today":
                range = { from: today, to: today };
                onSingleDate(true);
                break;
            case "yesterday":
                const yesterday = subDays(today, 1);
                range = { from: yesterday, to: yesterday };
                onSingleDate(true);
                break;
            case "week":
                range = { from: subDays(today, 6), to: today };
                onSingleDate(false);
                break;
            case "lastWeek":
                const startOfLastWeek = startOfWeek(subWeeks(today, 1));
                const endOfLastWeek = endOfWeek(subWeeks(today, 1));
                range = { from: startOfLastWeek, to: endOfLastWeek };
                onSingleDate(false);
                break;
            case "month":
                range = { from: startOfMonth(today), to: endOfMonth(today) };
                onSingleDate(false);
                break;
            case "lastMonth":
                const startOfLastMonth = startOfMonth(subMonths(today, 1));
                const endOfLastMonth = endOfMonth(subMonths(today, 1));
                range = { from: startOfLastMonth, to: endOfLastMonth };
                onSingleDate(false);
                break;
            case "year":
                range = { from: startOfYear(today), to: endOfYear(today) };
                onSingleDate(false);
                break;
            case "lastYear":
                const startOfLastYear = startOfYear(subYears(today, 1));
                const endOfLastYear = endOfYear(subYears(today, 1));
                range = { from: startOfLastYear, to: endOfLastYear };
                onSingleDate(false);
                break;
            default:
                range = dateRange;
        }

        setDateRange(range);
        onDateRangeChange(range, filterType);
    };

    const getSelectOptions = () => {
        const baseOptions = [
            <SelectItem key="today" value="today">
                Today
            </SelectItem>,
            <SelectItem key="yesterday" value="yesterday">
                Yesterday
            </SelectItem>,
            <SelectItem key="week" value="week">
                Last 7 days
            </SelectItem>,
            <SelectItem key="month" value="month">
                This month
            </SelectItem>,
            <SelectItem key="year" value="year">
                This year
            </SelectItem>,
        ];

        baseOptions.push(
            <SelectItem key="custom" value="custom">
                Custom range
            </SelectItem>
        );

        return baseOptions;
    };

    const handleCustomDateChange = (range: any) => {
        if (range?.from && range?.to) {
            setDateRange(range);
            setSelectedFilter("custom");
            onDateRangeChange(range, "custom");
        }
    };

    const formatDateRange = (range: DateRange) => {
        if (range.from.getTime() === range.to.getTime()) {
            return format(range.from, "MMM dd, yyyy");
        }
        return `${format(range.from, "MMM dd, yyyy")} - ${format(
            range.to,
            "MMM dd, yyyy"
        )}`;
    };

    return (
        <div className={`flex flex-col sm:flex-row gap-4 ${className} `}>
            {/* Filter Type Selector */}
            <Select
                value={selectedFilter}
                onValueChange={(value) =>
                    handleFilterChange(value as DateFilterType)
                }
            >
                <SelectTrigger className="bg-white/30 backdrop-blur-md">
                    <SelectValue placeholder="Select filter" />
                </SelectTrigger>
                <SelectContent>{getSelectOptions()}</SelectContent>
            </Select>

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="bg-white/30 backdrop-blur-md justify-start text-left font-normal"
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formatDateRange(dateRange)}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 " align="start">
                    <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={(range) => handleCustomDateChange(range)}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
