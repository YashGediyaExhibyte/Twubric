import React, { ChangeEvent } from "react";

interface DateFilterProps {
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  handleDateFilter: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleDateFilter,
}) => {
  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="flex md:gap-5 gap-1 md:items-center items-end flex-wrap">
      <div className="flex items-center sm:gap-2 gap-1 md:flex-row flex-col">
        <label
          htmlFor="startDate"
          className="font-medium text-gray-700 md:text-base text-sm"
        >
          Start Date
        </label>
        <input
          className="border border-gray-300 rounded-lg md:px-4 md:py-2 py-2 px-2 md:text-base text-sm"
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="flex items-center sm:gap-2 gap-1 md:flex-row flex-col">
        <label
          htmlFor="endDate"
          className="font-medium text-gray-700 md:text-base text-sm"
        >
          End Date
        </label>
        <input
          className="border border-gray-300 rounded-lg md:px-4 md:py-2 py-2 px-2 md:text-base text-sm"
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      <button
        onClick={handleDateFilter}
        className="sm:px-7 px-3 py-2 sm:text-base text-sm bg-blue-400 text-white font-semibold rounded-md"
      >
        Filter
      </button>
    </div>
  );
};

export default DateFilter;
