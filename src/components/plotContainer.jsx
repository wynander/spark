import Chart from './chart';
import portfolioReturnCalculator from './portfolioReturnCalculator';
import assetArrayCalculator from './assetArrayCalculator';
import React from 'react';

export default function PlotContainer({ assetValues, userInput }) {
	//turn assetValues into datasets w/ factory function
	//append them to the default datasets variable,
	//change default portfolio data to adjusted to show change w/ assets

	let data = React.useMemo(() => {
		const { userSetVal } = propsParseInt(userInput); //parse Prop strings to floats so that these variables have number values
		const assetValuesParsed = assetParseFloat(assetValues);
		console.log('', assetValuesParsed);
		const { investmentValue, retirementDraw, labels, retirementIndex } = portfolioReturnCalculator(userSetVal);

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

		const assetArrays = assetArrayCalculator(userSetVal, labels, assetValuesParsed);

		let assetTotals = {
			pricePortfolioEffect: [],
			salePortfolioEffect: [],
			cashFlowEffect: [],
			equityAppreciationEffect: [],
			equityPaydownEffect: [],
		};

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
				+assetTotals.salePortfolioEffect[index];
			return temp;
		});

		let assetsEquityValue = portfolioValue.map((item, index) => {
			let temp = assetTotals.equityAppreciationEffect[index] + assetTotals.equityPaydownEffect[index];
			return temp === 0 ? NaN : temp;
		});

		let temp = datasets;

		let dataColor = '#' + (((1 << 24) * Math.random()) | 0).toString(16);

		let safeDraw = new Array(labels.length),
			unsafeDraw = new Array(labels.length);

		if (assetValues.length !== 0) {
			temp[0].label = 'Adjusted Portfolio Value';
			temp[0].data = tempPortfolioValue;

			if (retirementIndex) {
				for (let i = 0; i < labels.length; i++) {
					if (i >= retirementIndex) {
						safeDraw[i] =
							portfolioValue[retirementIndex] * (1 + (userSetVal.getNormalizedReturn - 0.03)) ** (i - retirementIndex);
						unsafeDraw[i] =
							portfolioValue[retirementIndex] * (1 + (userSetVal.getNormalizedReturn - 0.05)) ** (i - retirementIndex);
					} else {
						safeDraw[i] = portfolioValue[i];
						unsafeDraw[i] = portfolioValue[i];
					}
				}
			}

			temp.push({
				id: 'safeDraw',
				label: 'Very Safe',
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
				label: 'Unsafe',
				data: unsafeDraw,
				borderDash: [10, 10],
				borderColor: '#964336',
				fill: true,
				backgroundColor: 'rgba(182, 65, 45,.15)',
				radius: '0',
				key: new Date(),
			});
			temp.push({
				id: 'safeDraw',
				label: 'Equity in Assets',
				data: assetsEquityValue,
				borderColor: 'rgba(66, 135, 245,1)',
				fill: true,
				borderDash: [0, 0],
				backgroundColor: 'rgba(66, 135, 245,1)',
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
							portfolioValue[retirementIndex] * (1 + (userSetVal.getNormalizedReturn - 0.03)) ** (i - retirementIndex);
						unsafeDraw[i] =
							portfolioValue[retirementIndex] * (1 + (userSetVal.getNormalizedReturn - 0.05)) ** (i - retirementIndex);
					} else {
						safeDraw[i] = portfolioValue[i];
						unsafeDraw[i] = portfolioValue[i];
					}
				}
				temp.push({
					id: 'safeDraw',
					label: 'Very Safe',
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
					label: 'Less Safe',
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
	}, [userInput, assetValues]);

	return (
		<>
			<Chart data={data} />
		</>
	);

	//-----------------Functions--------------------------------
}

function propsParseInt(userInput) {
	let userSetVal = {};
	userSetVal.birthYear = parseInt(userInput.birthYear, 10);
	userSetVal.retirementAge = parseInt(userInput.retirementAge, 10);
	userSetVal.netMonthlyIncome = parseInt(userInput.netMonthlyIncome, 10);
	userSetVal.yearlyRaise = 1 + parseInt(userInput.yearlyRaise, 10) / 100;
	userSetVal.netSavingsRate = parseInt(userInput.netSavingsRate, 10) / 100;
	userSetVal.currentInvestments = parseInt(userInput.currentInvestments, 10);
	userSetVal.estimatedROI = 1 + parseInt(userInput.estimatedROI, 10) / 100;
	userSetVal.yearlyInflation = 1 + parseInt(userInput.yearlyInflation, 10) / 100;
	userSetVal.retirementSalary = parseInt(userInput.retirementSalary, 10);
	userSetVal.getNormalizedReturn = userSetVal.estimatedROI - userSetVal.yearlyInflation;
	return {
		userSetVal,
	};
}

function assetParseFloat(assetValues) {
	let assetValuesParsed = assetValues.map((entry) =>
		Object.entries(entry).reduce((obj, [key, value]) => ((obj[key] = parseFloat(value)), obj), {})
	);
	return assetValuesParsed;
}
