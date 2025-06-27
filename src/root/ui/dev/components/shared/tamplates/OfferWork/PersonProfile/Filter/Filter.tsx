"use client"; // kerak, chunki useState ishlatilyapti

import { useState } from "react";
import { FilterBar } from "./FilterClient";

export const Filter = () => {
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);

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


