import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	annotationPlugin
);

// export const annotation = {
// 	type: 'label',
// 	backgroundColor: 'rgba(245, 245, 245)',
// 	callout: {
// 		enabled: true,
// 		borderColor: (ctx) => ctx.chart.data.datasets[0].borderColor,
// 	},
// 	content: (ctx) => `Maximum value is ${maxValue(ctx).toFixed(2)}`,
// 	font: {
// 		size: 16,
// 	},
// 	position: {
// 		x: (ctx) =>
// 			maxIndex(ctx) <= 3 ? 'start' : maxIndex(ctx) >= 10 ? 'end' : 'center',
// 		y: 'center',
// 	},
// 	xAdjust: (ctx) => (maxIndex(ctx) <= 3 ? 60 : maxIndex(ctx) >= 10 ? -60 : 0),
// 	xValue: (ctx) => maxLabel(ctx),
// 	yAdjust: -60,
// 	yValue: (ctx) => maxValue(ctx),
// };

export default function Chart({ data, retirementPoint }) {
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				ticks: {
					color: '#7881a1',
				},
				grid: {
					color: 'rgba(87,87,87,.08)',
				},
			},
			y: {
				beginAtZero: 'true',
				//stacked: "true",
				ticks: {
					color: '#7881a1',
				},
				grid: {
					color: 'rgba(87,87,87,.08)',
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
			annotation: {
				annotations: {
					// 		annotation,
					point1: {
						type: 'point',
						xValue: (context, opts) => {
							return retirementPoint[0];
						},
						yValue: retirementPoint[1],
						backgroundColor: '#b6412d',
						drawTime: 'afterDraw',
						radius: '4',
						borderColor: '#b6412d',
					},
				},
			},
			title: {
				display: true,
				text: 'Portfolio Value Over Time',
				color: '#1b1c1d',
				font: {
					size: '20px',
				},
			},
		},
	};
	return <Line data={data} options={options} />;
}
