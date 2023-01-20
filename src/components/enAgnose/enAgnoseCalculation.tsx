import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartOptions,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import { Box } from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { WriteAgnose } from "../../lib/clientSide/firestore/writeAgnose";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

type Props = {
  answer_: { num: number; val: string }[];
  leadership: number;
  setLeadership: Dispatch<SetStateAction<number>>;
  sociability: number;
  setSociability: Dispatch<SetStateAction<number>>;
  cooperativeness: number;
  setCooperativeness: Dispatch<SetStateAction<number>>;
  independence: number;
  setIndependence: Dispatch<SetStateAction<number>>;
  openness: number;
  setOpenness: Dispatch<SetStateAction<number>>;
};

export const EnAgnoseCalculation = (props: Props): JSX.Element => {
  let num: number;
  let str: string;
  const ColorAssets = useColorAssets();
  const agnoseData: number[][] = [
    [0.2, 0, 0.5, 0, 0.3],
    [0, 0.2, 0, 0.6, 0.2],
    [0.4, 0.2, 0, 0.1, 0.3],
    [0.2, 0.7, 0.1, 0, 0],
    [0.2, 0.1, 0.4, 0.1, 0.2],
    [0.1, 0, 0.1, 0.3, 0.5],
    [0.1, 0.4, 0.2, 0.2, 0.1],
    [0.1, 0.1, 0.2, 0.3, 0.3],
    [0.3, 0.1, 0.2, 0.4, 0],
    [0.4, 0.2, 0.3, 0, 0.1],
  ];

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      //リーダーシップ
      num = agnoseData[i][0] * Number(props.answer_[i].val);
      num = Math.floor(num * 10) / 10;
      props.setLeadership((prev) => prev + num);

      //社会性
      num = agnoseData[i][1] * Number(props.answer_[i].val);
      num = Math.floor(num * 10) / 10;
      props.setSociability((prev) => prev + num);

      //協調性
      num = agnoseData[i][2] * Number(props.answer_[i].val);
      num = Math.floor(num * 10) / 10;
      props.setCooperativeness((prev) => prev + num);

      //主体性
      num = agnoseData[i][3] * parseInt(props.answer_[i].val);
      num = Math.floor(num * 10) / 10;
      props.setIndependence((prev) => prev + num);

      //開放性
      num = agnoseData[i][4] * parseInt(props.answer_[i].val);
      num = Math.floor(num * 10) / 10;
      props.setOpenness((prev) => prev + num);
    }
  }, [props.answer_]);

  const calculateData = (
    leadership_: number,
    sociability_: number,
    cooperativeness_: number,
    independence_: number,
    openness_: number
  ) => {
    //リーダーシップ整数化
    str = String(leadership_);
    if (str.length > 2) {
      props.setLeadership(Number(str.substring(2, 0)));
    }
    // 社交性
    str = String(sociability_);
    if (str.length > 2) {
      props.setSociability(Number(str.substring(2, 0)));
    }

    // 協調性
    if (str.length > 2) {
      props.setCooperativeness(Number(str.substring(2, 0)));
    }

    // 主体性
    str = String(independence_);
    if (str.length > 2) {
      props.setIndependence(Number(str.substring(2, 0)));
    }
    // 開放性
    str = String(openness_);
    if (str.length > 2) {
      props.setOpenness(Number(str.substring(2, 0)));
    }
    return {
      labels: ["リーダーシップ", "社交性", "協調性", "主体性", "開放性"],
      datasets: [
        {
          data: [
            props.leadership,
            props.sociability,
            props.cooperativeness,
            props.independence,
            props.openness,
          ],
          backgroundColor: "rgba(18, 157, 167, 0.2)",
          borderColor: "rgba(18, 157, 167, 1)",
          borderWidth: 0.5,
        },
      ],
    };
  };

  const options: {} = {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Radar Chart",
    },
    scale: {
      reverse: false,
      gridLines: {
        color: [
          "black",
          "red",
          "orange",
          "yellow",
          "green",
          "blue",
          "indigo",
          "violet",
        ],
      },
      r: {
        min: 0,
        max: 10,
      },
    },
  };

  const result = calculateData(
    props.leadership,
    props.sociability,
    props.cooperativeness,
    props.independence,
    props.openness
  );

  return (
    <Box
      w={"160px"}
      ml={"1.6rem"}
      bgColor={"#FFFFFF"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      rounded={"20"}
    >
      <Radar data={result} options={options} />
    </Box>
  );
};
