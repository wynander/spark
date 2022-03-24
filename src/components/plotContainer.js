import Chart from './chart.js';
import usePortfolioReturnCalculator from './portfolioReturnCalculator';
import useAssetArrayCalculator from './assetArrayCalculator';

export default function PlotContainer({ propsInput }) {
	const { userSetVal } = usePropsParseFloat(propsInput); //parse Prop strings to floats so that these variables have number values

	const {
		investmentValue,
		//InvestmentGainsData,
		retirementDraw,
		labels,
		retirementIndex,
	} = usePortfolioReturnCalculator(userSetVal);

	//--------------------------------------------------------------Test for Asset Purchase-----

	// const {
	// 	assetSalePortfolioEffect,
	// 	assetPricePortfolioEffect,
	// 	assetCashFlowEffect,
	// 	assetEquityAppreciationEffect,
	// 	assetEquityPaydownEffect,
	// } = useAssetArrayCalculator(userSetVal, labels);
	//----------------------------------------------------------------------------------------

	// conditional to return 0 when asset not added
	let portfolioValue = investmentValue.map((item, index) => {
		return item + retirementDraw[index];
	});

	let tempPortfolioValue = portfolioValue.map((item, index) => {
		let temp = item;
		// item -
		// assetPricePortfolioEffect[index] +
		// assetCashFlowEffect[index] +
		// assetEquityAppreciationEffect[index] +
		// assetEquityPaydownEffect[index] +
		// assetSalePortfolioEffect[index];
		return temp > 0 ? temp : 0;
	});

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Portfolio Value',
				data: tempPortfolioValue,
				borderColor: '#b6412d',
				backgroundColor: 'rgba(182, 65, 45,1)',
				radius: '0',
			},
			// {
			// 	label: 'Investment Value',
			// 	data: portfolioValue,
			// 	borderColor: 'rgba(44, 44, 44, 1)',
			// 	backgroundColor: 'rgba(44, 44, 44, 1)',
			// 	radius: '0',
			// },
		],
	};

	//chart.js event on click
	let retirementY = tempPortfolioValue[retirementIndex]
		? tempPortfolioValue[retirementIndex]
		: 0;
	let retirementPoint = [
		retirementIndex > 0 ? retirementIndex : -5,
		retirementY,
	];

	return (
		<>
			<Chart data={data} retirementPoint={retirementPoint} />
		</>
	);

	//-----------------Functions--------------------------------
}

function usePropsParseFloat(propsInput) {
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
