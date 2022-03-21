import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: "#7881a1"
      },
      grid: {
        color: "rgba(87,87,87,.5)"
      }
    },
    y: {
      beginAtZero: "true",
      ticks: {
        color: "#7881a1"
      },
      grid: {
        color: "rgba(87,87,87,.5)"
      }
    }
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#7881a1",
        font: {
          size: "15px"
        }
      }
    },
    title: {
      display: true,
      text: "Investment Value Over Time"
    }
  }
};

export default function Chart(props) {
  return <Line data={props.data} options={options} />;
}
