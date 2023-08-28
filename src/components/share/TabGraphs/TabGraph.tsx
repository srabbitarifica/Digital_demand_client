import InputField from "@/components/share/InputField/InputField";
import {
  getFilterSearchData,
  getUniqueKeywords,
} from "@/components/hooks/globalHooks";
import { Loader, Tabs } from "@mantine/core";
import dynamic from "next/dynamic";
import { Data } from "plotly.js";

import React, { useState, useEffect } from "react";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface TabGraphProps {
  filteredData: any;
  data: any;
  setData: (value: any) => void;
  setFilteredData: (value: any) => void;
  dataLoading: boolean;
  showAverage: boolean;
  currTab: string;
  setCurrTab: (value: string) => void;
}

const TabGraph = ({
  data,
  filteredData,
  setFilteredData,
  dataLoading,
  showAverage,
  currTab,
  setCurrTab,
}: TabGraphProps) => {
  const [input, setInput] = useState("");
  const [traces, setTraces] = useState<Data[]>();
  const [barTraces, setBarTraces] = useState<any>();
  const [averageTraces, setAverageTraces] = useState<any>();
  const [filteredKeywords, setFilteredKeywords] = useState<any>();
  const [trendTraces, setTrendTraces] = useState<any>();

  useEffect(() => {
    setFilteredKeywords(getUniqueKeywords(data));
  }, [filteredData]);

  useEffect(() => {
    if (showAverage) {
      averageGraph();
    } else {
      trendLine();
      graph();
      movingAverageGraph();
    }
  }, [filteredData, filteredKeywords, data, showAverage]);

  const graph = () => {
    setTraces(
      filteredKeywords?.map((keyword: any) => {
        const filteredVlValues = filteredData?.vl_value.filter(
          (value: any, index: number) => {
            return filteredData?.keywords[index] === keyword;
          }
        );
        return {
          x: filteredData?.dates,
          y: filteredVlValues,
          type: "scatter",
          name: keyword,
          hoverinfo: "y+name",
        };
      })
    );
  };

  const averageGraph = () => {
    const keywordAverages: Record<string, number[]> = {};
    filteredData?.keywords.forEach((keyword: string, index: number) => {
      if (!keywordAverages[keyword]) {
        keywordAverages[keyword] = [];
      }

      keywordAverages[keyword].push(parseFloat(filteredData.vl_value[index]));
    });
    const keywordTraces = Object.keys(keywordAverages).map((keyword) => {
      const averageValue =
        keywordAverages[keyword].reduce((acc, value) => acc + value, 0) /
        keywordAverages[keyword].length;
      return {
        x: [keyword],
        y: [averageValue],
        type: "bar",
        name: `${keyword}`,
        hoverinfo: "y+name",
      };
    });
    setBarTraces(keywordTraces);
  };

  const movingAverageGraph = () => {
    const calculateMovingAverage = (data: any, windowSize: number) => {
      const rollingAvg = [];
      for (let i = 0; i < data.length - windowSize + 1; i++) {
        const avg =
          data
            .slice(i, i + windowSize)
            .reduce((sum: number, val: string) => sum + parseFloat(val), 0) /
          windowSize;
        rollingAvg.push(avg);
      }
      return rollingAvg;
    };

    const windowSize = 15;
    const averageValue = filteredKeywords?.map(
      (keyword: string, index: number) => {
        const filteredVlValues = filteredData?.vl_value.filter(
          (value: string, index: number) =>
            filteredData?.keywords[index] === keyword
        );
        const rollingAvg = calculateMovingAverage(filteredVlValues, windowSize);
        return {
          x: filteredData?.dates.slice(windowSize - 1),
          y: rollingAvg,
          type: "scatter",
          name: keyword,
          hoverinfo: "y+name",
        };
      }
    );
    setAverageTraces(averageValue);
  };

  const trendLine = () => {
    const trendLines = filteredKeywords?.map((keyword: any) => {
      const filteredVlValues = filteredData?.vl_value.filter(
        (value: any, index: number) => filteredData?.keywords[index] === keyword
      );
      const n = filteredVlValues.length;
      const sumX = (n * (n - 1)) / 2;
      const sumY = filteredVlValues.reduce(
        (sum: number, value: string) => sum + parseFloat(value),
        0
      );
      const sumXY = filteredVlValues.reduce(
        (sum: number, value: string, index: number) =>
          sum + index * parseFloat(value),
        0
      );
      const sumX2 = filteredVlValues.reduce(
        (sum: number, value: number, index: number) => sum + index * index,
        0
      );

      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;

      const trendLineData = filteredVlValues.map(
        (value: number, index: number) => ({
          x: filteredData?.dates[index],
          y: slope * index + intercept,
        })
      );

      return {
        x: trendLineData.map((point: any) => point.x),
        y: trendLineData.map((point: any) => point.y),
        type: "scatter",
        mode: "lines",
        name: `${keyword} Trend`,
      };
    });

    setTrendTraces(trendLines);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilteredData(getFilterSearchData(filteredData, input));
  };

  return (
    <div className="w-full h-full">
      <Tabs value={currTab} onTabChange={(value: any) => setCurrTab(value)}>
        <Tabs.List>
          <Tabs.Tab value="scatter">Timeseries of Digital Demand</Tabs.Tab>
          <Tabs.Tab value="trend-average">
            Moving Average & Trend of Digital Demand
          </Tabs.Tab>
        </Tabs.List>
        <div className="py-3 flex justify-end">
          <InputField input={input} setInput={setInput} onSubmit={onSubmit} />
        </div>
        <Tabs.Panel className="w-full h-full" value="scatter" pt="xs">
          {traces && !dataLoading ? (
            <Plot
              className="w-full"
              data={showAverage ? barTraces : traces}
              layout={{
                title: "Digital Demand",
                yaxis: {
                  title: "Vl Value",
                  automargin: true,
                },
                xaxis: {
                  title: showAverage ? "Keywords" : "Date",
                  automargin: true,
                },
                autosize: true,
                height: 800,
                margin: {
                  l: 60,
                  r: 10,
                  t: 60,
                  b: 60,
                },
                legend: {
                  font: {
                    size: 12,
                  },
                },
              }}
              config={{
                toImageButtonOptions: {
                  format: "svg",
                  width: 1900,
                  height: 1000,
                },
              }}
            />
          ) : (
            <Loader />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="trend-average">
          {averageTraces && trendTraces && !dataLoading ? (
            <Plot
              className="w-full"
              data={[...averageTraces, ...trendTraces]}
              layout={{
                title: "Digital Demand",
                yaxis: {
                  title: "Vl Value",
                  automargin: true,
                },
                xaxis: {
                  title: "Date",
                  automargin: true,
                },
                height: 900,
                autosize: true,
                margin: {
                  l: 80,
                  r: 100,
                  t: 100,
                  b: 80,
                },
                legend: {
                  font: {
                    size: 12,
                  },
                },
              }}
              config={{
                toImageButtonOptions: {
                  format: "svg",
                  width: 1900,
                  height: 1000,
                },
              }}
            />
          ) : (
            <Loader />
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default TabGraph;
