import { useState } from "react";
import {IColumn, SortedColumn } from "../types";

export const useSorting = () => {
    const [sortedColumn, setSortedColumn] = useState<SortedColumn | null>(null);
    const [sortedOrder, setSortedOrder] = useState<"asc" | "desc">("asc");

    const handleSort = (column: IColumn) => {
        if (["name", "balance", "isActive"].includes(column.key)) {
            const isAsc = sortedColumn === column.key && sortedOrder === "asc";
            const newSortedOrder = isAsc ? "desc" : "asc";
            setSortedColumn(column.key as SortedColumn);
            setSortedOrder(newSortedOrder);
        }
    };

    return { sortedColumn, sortedOrder, handleSort };
};