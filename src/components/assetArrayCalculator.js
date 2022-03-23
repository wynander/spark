export default function useAssetArrayCalculator(userSetVal, labels) {
	let eventIdx = 20;
	let savingsUsed = 60000; //$
	let otherCashUsed = 40000; //$
	let totalPrice = 500000; //$
	let amountFinanced = totalPrice - otherCashUsed - savingsUsed;
	let financeTerm = 30; //years
	let financeRate = 0.04; //%
	let assetAppreciation = 1.02; //%
	let cashOnCashReturn = 0.1; //%
	let cashOnCashAppreciation = 1.02;
	let ownershipLength = 10; //years
	let assetSalePrice = 800000;
	let assetPricePortfolioEffect = new Array(labels.length);
	let assetCashFlowEffect = new Array(labels.length);
	let assetEquityAppreciationEffect = new Array(labels.length);
	let assetEquityPaydownEffect = new Array(labels.length);
	let assetSalePortfolioEffect = new Array(labels.length);

	for (let i = 0; i < labels.length; ++i) {
		assetPricePortfolioEffect[i] = 0;
		assetCashFlowEffect[i] = 0;
		assetEquityPaydownEffect[i] = 0;
		assetEquityAppreciationEffect[i] = 0;
		assetSalePortfolioEffect[i] = 0;
	}
	let balance = [amountFinanced];
	let getTotalPayedDown = [0];
	let yearlyPayment =
		12 *
		amountFinanced *
		(financeRate /
			12 /
			(1 - Math.pow(1 + financeRate / 12, -financeTerm * 12)));

	for (let i = 1; i < ownershipLength; i++) {
		let thisYearInterestPayment = balance[i - 1] * financeRate;
		balance.push(balance[i - 1] - yearlyPayment + thisYearInterestPayment);
		getTotalPayedDown.push(amountFinanced - balance[i]);
	}

	for (let i = eventIdx; i < eventIdx + ownershipLength; i++) {
		//assess cash flow accumulation / return assuming it is invested w/ returns matching inflation
		assetCashFlowEffect[i] =
			i - eventIdx === 0
				? 0 //if it is the year that it is bought, no cash flow shown until next year
				: (savingsUsed + otherCashUsed) *
						cashOnCashReturn *
						Math.pow(cashOnCashAppreciation, i - eventIdx - 1) +
				  assetCashFlowEffect[i - 1] * userSetVal.yearlyInflation;
		//assess how the asset appreciates over time
		assetEquityAppreciationEffect[i] =
			totalPrice * Math.pow(assetAppreciation, i - eventIdx) -
			amountFinanced -
			(otherCashUsed + savingsUsed);
		//calculate asset loan paydown per year
		assetEquityPaydownEffect[i] = getTotalPayedDown[i - eventIdx];
	}

	for (let i = eventIdx; i < assetPricePortfolioEffect.length; i++) {
		//assess how spending of savings affects portfolio value over time
		assetPricePortfolioEffect[i] =
			savingsUsed * Math.pow(1 + userSetVal.getNormalizedReturn, i - eventIdx);
		if (i >= eventIdx + ownershipLength && assetSalePrice) {
			//assess how the cash from sale of asset affects portfolio over time
			assetSalePortfolioEffect[i] =
				assetSalePrice *
				Math.pow(
					1 + userSetVal.getNormalizedReturn,
					i - eventIdx - ownershipLength
				);
		}
	}
	return {
		assetSalePortfolioEffect,
		assetPricePortfolioEffect,
		assetCashFlowEffect,
		assetEquityAppreciationEffect,
		assetEquityPaydownEffect,
	};
}
