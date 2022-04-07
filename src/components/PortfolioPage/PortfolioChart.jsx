import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import zoomPlugin from 'chartjs-plugin-zoom'
import React from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  zoomPlugin
)

export default function PortfolioChart({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#7881a1',
        },
        grid: {
          color: 'rgba(87,87,87,.15)',
        },
      },
      y: {
        beginAtZero: 'true',
        ticks: {
          color: '#7881a1',
        },
        grid: {
          color: 'rgba(87,87,87,.15)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#7881a1',
          font: {
            size: '15px',
          },
        },
      },
      zoom: {
        zoom: {
          drag: {
            enabled: true,
          },
          mode: 'x',

          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
        },
      },
      annotation: {},
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: 'Projected Portfolio Value Over Time',
        color: '#1b1c1d',
        font: {
          size: '20px',
        },
      },
    },
  }
  return <Line datasetIdKey='id' data={data} options={options} redraw={false} />
}
