import React, { useState } from "react";
import {
  ChartContainer,
  ChartRow,
  Charts,
  EventChart,
} from "react-timeseries-charts";
import { TimeSeries, TimeRangeEvent, TimeRange } from "pondjs";

// Define the schedule dates
const currentDate = new Date();
const startDate = new Date();
startDate.setMonth(startDate.getMonth() - 4); // Start date 4 months ago

const midExamStartDate = new Date(startDate);
midExamStartDate.setMonth(startDate.getMonth() + 2); // Midterm start date

const midExamEndDate = new Date(midExamStartDate);
midExamEndDate.setDate(midExamEndDate.getDate() + 7); // Midterm end date

const endExamStartDate = new Date(startDate);
endExamStartDate.setMonth(startDate.getMonth() + 4); // End-of-term start date

const endExamEndDate = new Date(endExamStartDate);
endExamEndDate.setDate(endExamEndDate.getDate() + 7); // End-of-term end date

// Define periods for the schedule
const periods = [
  {
    since: startDate.toISOString(),
    till: midExamStartDate.toISOString(),
    title: "Initial Period",
  },
  {
    since: midExamStartDate.toISOString(),
    till: midExamEndDate.toISOString(),
    title: "Midterm Exams",
  },
  {
    since: endExamStartDate.toISOString(),
    till: endExamEndDate.toISOString(),
    title: "End-of-Term Exams",
  },
];

// Create events from periods
const events = periods.map(({ since, till, ...data }) => {
  const range = new TimeRange(new Date(since), new Date(till));
  return new TimeRangeEvent(range, data);
});

// Create a TimeSeries with a name property
const series = new TimeSeries({
  name: "exam_schedule", // Add a name property
  events,
});

// Define the style for the events
function outageEventStyleFunc(
  event: TimeRangeEvent,
  state: string
): { fill: string; opacity?: number } {
  const COLOR = "#998ec3";
  switch (state) {
    case "normal":
      return {
        fill: COLOR,
      };
    case "hover":
      return {
        fill: COLOR,
        opacity: 0.4,
      };
    default:
      return {
        fill: COLOR,
      };
  }
}

const ExamScheduleChart: React.FC = () => {
  const [timerange, setTimerange] = useState<TimeRange>(series.timerange());

  return (
    <ChartContainer
      timeRange={timerange}
      enablePanZoom={true}
      onTimeRangeChanged={setTimerange}
    >
      <ChartRow height="30">
        <Charts>
          <EventChart
            series={series}
            size={45}
            style={outageEventStyleFunc}
            label={(e: TimeRangeEvent) => e.get("title")}
          />
        </Charts>
      </ChartRow>
    </ChartContainer>
  );
};

export default ExamScheduleChart;
