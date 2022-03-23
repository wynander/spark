import usePlotVariablesCalculator from './plotVariablesCalculator';
let defaultXAxisLength = 50;

export default function usePortfolioReturnCalculator(userSetVal) {
	const {
		xAxisLength,
		startYear,
		periodUntilRetirement,
	} = usePlotVariablesCalculator(userSetVal, defaultXAxisLength);
	//--
	let retirementIndex = periodUntilRetirement.length - 1;
	const investmentValue = [userSetVal.currentInvestments];
	const InvestmentGainsData = [
		12 * userSetVal.netMonthlyIncome * userSetVal.netSavingsRate,
	];
	const arrayLength = xAxisLength - startYear + userSetVal.birthYear;
	const retirementDraw = [0];
	//--
	let preRetirementLength = periodUntilRetirement.length;
	if (
		periodUntilRetirement.length === 'undefined' ||
		periodUntilRetirement.length === 0
	) {
		preRetirementLength = defaultXAxisLength;
	}

	let retirementSalaryValid = userSetVal.retirementSalary
		? userSetVal.retirementSalary
		: 0;

	for (
		let i = 1;
		i < (arrayLength > 0 ? arrayLength : defaultXAxisLength);
		i++
	) {
		//Calculate investment gains based on saving
		if (i < preRetirementLength) {
			investmentValue.push(
				investmentValue[i - 1] * (1 + userSetVal.getNormalizedReturn) +
					12 *
						userSetVal.netMonthlyIncome *
						userSetVal.netSavingsRate *
						Math.pow(userSetVal.yearlyRaise, i - 1)
			);
			InvestmentGainsData.push(investmentValue[i] - investmentValue[i - 1]);
			retirementDraw.push(0);
		}

		//Calculate retirement period savings gains
		if (i >= preRetirementLength) {
			investmentValue.push(
				investmentValue[i - 1] * (1 + userSetVal.getNormalizedReturn)
			);
			InvestmentGainsData.push(investmentValue[i] - investmentValue[i - 1]);
			retirementDraw.push(
				-(
					-1 * retirementDraw[i - 1] * (1 + userSetVal.getNormalizedReturn) +
					retirementSalaryValid
				)
			);
		}
	}

	let labels = [...Array(defaultXAxisLength)].map((_, i) => i + startYear);
	if (xAxisLength - startYear + userSetVal.birthYear > 0) {
		labels = [...Array(xAxisLength - startYear + userSetVal.birthYear)].map(
			(_, i) => i + startYear
		);
	}
	return {
		investmentValue,
		InvestmentGainsData,
		retirementDraw,
		labels,
		retirementIndex,
	};
}
