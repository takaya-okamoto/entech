import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

export const data = {
  labels: ["リーダーシップ", "社交性", "協調性", "主体性", "開放性"],
  datasets: [
    {
      data: [2, 9, 3, 5, 2],
      backgroundColor: "rgba(18, 157, 167, 0.2)",
      borderColor: "rgba(18, 157, 167, 1)",
      borderWidth: 0.5,
    },
  ],
};

export function SampleChart() {
  return (
    <Box w={"140px"} ml={"1.6rem"}>
      <Radar data={data} />
    </Box>
  );
}
