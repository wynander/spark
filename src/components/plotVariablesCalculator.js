export default function usePlotVariablesCalculator(
	userSetVal,
	defaultXAxisLength
) {
	const startYear = new Date().getFullYear(); //create Current Year
	const endYear = userSetVal.birthYear + userSetVal.retirementAge;
	const xAxisLength = 80;
	let periodUntilRetirement = [];
	if (endYear - startYear + 1 > 0) {
		periodUntilRetirement = [...Array(endYear - startYear + 1)].map(
			(_, i) => i + startYear
		);
	}
	if (endYear - startYear + 1 <= 0) {
		periodUntilRetirement = [...Array(defaultXAxisLength)].map(
			(_, i) => i + startYear
		);
	}

	return {
		periodUntilRetirement,
		xAxisLength,
		startYear,
	};
}
