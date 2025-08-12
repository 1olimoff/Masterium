"use client";
import { useAdvertiseStore } from "../../AdvertiseStore";
import { FilterBar } from "./FilterClient";


export const Filter = () => {
  const { dateFrom, setDateFrom, dateTo, setDateTo } = useAdvertiseStore();

  return (
    <div className="space-y-6 w-full md:px-4">
      <FilterBar
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
      />
    </div>
  );
};