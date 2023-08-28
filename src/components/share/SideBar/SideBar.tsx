import DateRangePicker from "@/components/share/DateRangerPicker/DateRangerPicker";
import {
  getFilterCategory,
  getFilterCountry,
  getFilterKeywords,
  getUniqueCatgeory,
  getUniqueCountry,
  getFilterDate,
  getUniqueKeywords,
} from "@/components/hooks/globalHooks";
import { Button, Checkbox, Divider, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getDateArray } from "@/libs/date";
import MultiSelectDropdown from "../MultiSelctDropdown/MultiSelectDropdown";

interface SideBarProps {
  data: any;
  setFilteredData: (value: any) => void;
  filteredData: any;
  showAverage: boolean;
  setShowAverage: (value: boolean) => void;
  currTab: string;
}

const SideBar = ({
  data,
  setFilteredData,
  filteredData,
  showAverage,
  setShowAverage,
  currTab,
}: SideBarProps) => {
  const [selectedKeyword, setSelectedKeyword] = useState<string[] | []>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[] | []>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>();
  const allKeywords = getUniqueKeywords(data);
  const allCountries = getUniqueCountry(data);
  const allCatageories = getUniqueCatgeory(data);

  useEffect(() => {
    setSelectedKeyword(getUniqueKeywords(filteredData) as string[]);
    setSelectedCountry(getUniqueCountry(filteredData) as string[]);
    setSelectedCategory(getUniqueCatgeory(filteredData) as string[]);
  }, [filteredData]);

  const handleDateChange = (dates: any) => {
    console.log(dates);
    if (dates.length === 2) {
      setSelectedDates(getDateArray(dates));
    }
  };

  const submit = (e: any) => {
    e.preventDefault();
    const filteredDateDate = getFilterDate(selectedDates, data);
    const getFilteredKeywords = getFilterKeywords(
      selectedKeyword,
      filteredDateDate
    );
    const getFilterCountries = getFilterCountry(
      selectedCountry,
      getFilteredKeywords
    );
    const getFilterCategories = getFilterCategory(
      selectedCategory,
      getFilterCountries
    );
    setFilteredData(getFilterCategories);
  };

  return (
    <div className="w-64 flex-shrink-0 space-y-2 ">
      <MultiSelectDropdown
        label="Keywords"
        placeholder="Pick any Keyword"
        value={selectedKeyword}
        allData={allKeywords}
        setSelectedValue={setSelectedKeyword}
      />
      {selectedCountry && (
        <MultiSelectDropdown
          label="Country"
          placeholder="Pick any Keyword"
          value={selectedCountry}
          allData={allCountries}
          setSelectedValue={setSelectedCountry}
        />
      )}
      {selectedCategory && (
        <MultiSelectDropdown
          label="Catgeory"
          placeholder="Pick any Catgeory"
          value={selectedCategory}
          allData={allCatageories}
          setSelectedValue={setSelectedCategory}
        />
      )}
      <DateRangePicker
        label={
          <div className="flex w-full justify-between">
            <span>Date</span>
          </div>
        }
        placeholder="Select Date Range"
        classNames={{ label: "w-full" }}
        onChange={handleDateChange}
      />
      <Divider />
      <Button
        className="w-full py-3"
        placeholder="Select Dates"
        variant="outline"
        onClick={submit}
      >
        Submit
      </Button>
      <Divider />
      {currTab === "scatter" && (
        <div>
          <Divider />
          <Text>Conputational Value Filters</Text>
          <Checkbox
            label="Show Averages"
            onChange={() => setShowAverage(!showAverage)}
          />
        </div>
      )}
    </div>
  );
};

export default SideBar;
