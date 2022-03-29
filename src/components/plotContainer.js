import Chart from './chart.js';
import portfolioReturnCalculator from './portfolioReturnCalculator';
import assetArrayCalculator from './assetArrayCalculator';
import React from 'react';

export default function PlotContainer({ assetValues, assetCount, propsInput }) {
	//turn assetValues into datasets w/ factory function
	//append them to the default datasets variable,
	//change default portfolio data to adjusted to show change w/ assets

	let data = React.useMemo(() => {
		const { userSetVal } = propsParseInt(propsInput); //parse Prop strings to floats so that these variables have number values
		const assetValuesParsed = assetParseFloat(assetValues);
		console.log('', assetValuesParsed);
		const {
			investmentValue,
			retirementDraw,
			labels,
			retirementIndex,
		} = portfolioReturnCalculator(userSetVal);

		let portfolioValue = investmentValue.map((item, index) => {
			return item + retirementDraw[index];
		});

		let datasets = [
			{
				id: '0',
				label: 'Portfolio Value',
				data: portfolioValue,
				borderColor: '#b6412d',
				fill: false,
				backgroundColor: 'rgba(80, 80, 80,0)',
				radius: '0',
				key: new Date(),
			},
		];

		const data = {
			labels: labels,
			datasets: datasets,
		};

		const assetArrays = assetArrayCalculator(
			userSetVal,
			labels,
			assetValuesParsed,
			assetCount
		);

		let assetTotals = {
			pricePortfolioEffect: [],
			salePortfolioEffect: [],
			cashFlowEffect: [],
			equityAppreciationEffect: [],
			equityPaydownEffect: [],
		};

		console.log(assetTotals);
		if (assetValues.length > 0) {
			//sum the asset arrays to get cumulative effects
			for (let i = 0; i < labels.length; i++) {
				assetTotals.pricePortfolioEffect[i] = assetArrays
					.map((item) => item.assetPricePortfolioEffect[i])
					.reduce((prev, next) => prev + next);
				assetTotals.salePortfolioEffect[i] = assetArrays
					.map((item) => item.assetSalePortfolioEffect[i])
					.reduce((prev, next) => prev + next);
				assetTotals.cashFlowEffect[i] = assetArrays
					.map((item) => item.assetCashFlowEffect[i])
					.reduce((prev, next) => prev + next);
				assetTotals.equityAppreciationEffect[i] = assetArrays
					.map((item) => item.assetEquityAppreciationEffect[i])
					.reduce((prev, next) => prev + next);
				assetTotals.equityPaydownEffect[i] = assetArrays
					.map((item) => item.assetEquityPaydownEffect[i])
					.reduce((prev, next) => prev + next);
			}
		}

		let tempPortfolioValue = portfolioValue.map((item, index) => {
			let temp =
				item -
				assetTotals.pricePortfolioEffect[index] +
				assetTotals.cashFlowEffect[index] +
				assetTotals.equityAppreciationEffect[index] +
				assetTotals.equityPaydownEffect[index] +
				assetTotals.salePortfolioEffect[index];
			return temp;
		});

		let assetsPortfolioValue = portfolioValue.map((item, index) => {
			let temp =
				assetTotals.cashFlowEffect[index] +
				assetTotals.equityAppreciationEffect[index] +
				assetTotals.equityPaydownEffect[index] +
				assetTotals.salePortfolioEffect[index] -
				assetTotals.pricePortfolioEffect[index];
			return temp;
		});

		let temp = datasets;

		let dataColor = '#' + (((1 << 24) * Math.random()) | 0).toString(16);

		let safeDraw = new Array(labels.length),
			unsafeDraw = new Array(labels.length);
		if (assetCount !== 0) {
			temp[0].label = 'Adjusted Portfolio Value';
			temp[0].data = tempPortfolioValue;

			if (retirementIndex) {
				for (let i = 0; i < labels.length; i++) {
					if (i >= retirementIndex) {
						safeDraw[i] =
							tempPortfolioValue[retirementIndex] *
							1.04 ** (i - retirementIndex);
						unsafeDraw[i] =
							tempPortfolioValue[retirementIndex] *
							1.02 ** (i - retirementIndex);
					} else {
						safeDraw[i] = tempPortfolioValue[i];
						unsafeDraw[i] = tempPortfolioValue[i];
					}
				}
			}
			temp.push({
				id: 'safeDraw',
				label: 'Very Safe Retirement Draw',
				data: safeDraw,
				borderColor: '#36964d',
				fill: '+1',
				backgroundColor: 'rgba(45, 100, 45,.25)',
				borderDash: [10, 10],
				radius: '0',
				key: new Date(),
			});
			temp.push({
				id: 'unsafeDraw',
				label: 'Unsafe Retirement Draw',
				data: unsafeDraw,
				borderDash: [10, 10],
				borderColor: '#964336',
				fill: true,
				backgroundColor: 'rgba(182, 65, 45,.15)',
				radius: '0',
				key: new Date(),
			});
			datasets = temp;
			return data;
		} else {
			if (retirementIndex) {
				for (let i = 0; i < labels.length; i++) {
					if (i >= retirementIndex) {
						safeDraw[i] =
							portfolioValue[retirementIndex] *
							(1 + (userSetVal.getNormalizedReturn - 0.03)) **
								(i - retirementIndex);
						unsafeDraw[i] =
							portfolioValue[retirementIndex] *
							(1 + (userSetVal.getNormalizedReturn - 0.05)) **
								(i - retirementIndex);
					} else {
						safeDraw[i] = portfolioValue[i];
						unsafeDraw[i] = portfolioValue[i];
					}
				}
				temp.push({
					id: 'safeDraw',
					label: 'Safe Retirement Draw',
					data: safeDraw,
					borderColor: '#36964d',
					fill: '+1',
					backgroundColor: 'rgba(45, 100, 45,.25)',
					borderDash: [10, 10],
					radius: '0',
					key: new Date(),
				});
				temp.push({
					id: 'unsafeDraw',
					label: 'Unsafe Retirement Draw',
					data: unsafeDraw,
					borderDash: [10, 10],
					borderColor: '#964336',
					fill: true,
					backgroundColor: 'rgba(182, 65, 45,.15)',
					radius: '0',
					key: new Date(),
				});
			}

			datasets = temp;
			return data;
		}
	}, [propsInput, assetCount, assetValues]);

	return (
		<>
			<Chart data={data} />
		</>
	);

	//-----------------Functions--------------------------------
}

function propsParseInt(propsInput) {
	let userSetVal = {};
	userSetVal.birthYear = parseInt(propsInput.birthYear, 10);
	userSetVal.retirementAge = parseInt(propsInput.retirementAge, 10);
	userSetVal.netMonthlyIncome = parseInt(propsInput.netMonthlyIncome, 10);
	userSetVal.yearlyRaise = 1 + parseInt(propsInput.yearlyRaise, 10) / 100;
	userSetVal.netSavingsRate = parseInt(propsInput.netSavingsRate, 10) / 100;
	userSetVal.currentInvestments = parseInt(propsInput.currentInvestments, 10);
	userSetVal.estimatedROI = 1 + parseInt(propsInput.estimatedROI, 10) / 100;
	userSetVal.yearlyInflation =
		1 + parseInt(propsInput.yearlyInflation, 10) / 100;
	userSetVal.retirementSalary = parseInt(propsInput.retirementSalary, 10);
	userSetVal.getNormalizedReturn =
		userSetVal.estimatedROI - userSetVal.yearlyInflation;
	return {
		userSetVal,
	};
}

function assetParseFloat(assetValues) {
	let assetValuesParsed = assetValues.map((entry) =>
		Object.entries(entry).reduce(
			(obj, [key, value]) => ((obj[key] = parseFloat(value)), obj),
			{}
		)
	);
	return assetValuesParsed;
}
