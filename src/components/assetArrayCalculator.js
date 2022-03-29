export default function assetArrayCalculator(
	userSetVal,
	labels,
	assetValuesParsed,
	assetCount
) {
	labels = labels ? labels : []; //handle error boundary if assets are added without base user info
	console.log(assetCount);
	if (assetCount > 0) {
		let assetArrays = new Array(assetValuesParsed.length);

		for (let assetNum = 0; assetNum < assetValuesParsed.length; assetNum++) {
			let eventIdx = labels.findIndex(
				(item) => item === assetValuesParsed[assetNum].purchaseYear
			);
			let ownerShipLength =
				assetValuesParsed[assetNum].ownerShipLength > 0
					? assetValuesParsed[assetNum].ownerShipLength
					: labels.length - eventIdx;

			let otherCashUsed =
				assetValuesParsed[assetNum].totalCost -
				assetValuesParsed[assetNum].amountFinanced -
				assetValuesParsed[assetNum].savingsUsed; //$
			let cashOnCashAppreciation = 1.02;
			let assetPricePortfolioEffect = new Array(labels.length),
				assetCashFlowEffect = new Array(labels.length),
				assetEquityAppreciationEffect = new Array(labels.length),
				assetEquityPaydownEffect = new Array(labels.length),
				assetSalePortfolioEffect = new Array(labels.length);

			for (let i = 0; i < labels.length; ++i) {
				assetPricePortfolioEffect[i] = 0;
				assetCashFlowEffect[i] = 0;
				assetEquityPaydownEffect[i] = 0;
				assetEquityAppreciationEffect[i] = 0;
				assetSalePortfolioEffect[i] = 0;
			}
			let balance = [assetValuesParsed[assetNum].amountFinanced];
			let getTotalPayedDown = [0];
			let yearlyPayment =
				assetValuesParsed[assetNum].amountFinanced *
				(assetValuesParsed[assetNum].financeRate /
					100 /
					(1 -
						Math.pow(
							1 + assetValuesParsed[assetNum].financeRate / 100 / 12,
							-assetValuesParsed[assetNum].financeTerm * 12
						)));

			for (let i = 1; i < ownerShipLength; i++) {
				let thisYearInterestPayment =
					(balance[i - 1] * assetValuesParsed[assetNum].financeRate) / 100;
				if (i <= assetValuesParsed[assetNum].financeTerm) {
					balance.push(
						balance[i - 1] - yearlyPayment + thisYearInterestPayment
					);
					getTotalPayedDown.push(
						assetValuesParsed[assetNum].amountFinanced - balance[i]
					);
					console.log('total payed', getTotalPayedDown);
				} else if (i > assetValuesParsed[assetNum].financeTerm) {
					balance.push(0);
					getTotalPayedDown.push(getTotalPayedDown[i - 1]);
				}
			}

			for (let i = eventIdx; i < eventIdx + ownerShipLength; i++) {
				//assess cash flow accumulation / return assuming it is invested w/ returns matching inflation
				assetCashFlowEffect[i] =
					i - eventIdx === 0
						? 0 //if it is the year that it is bought, no cash flow shown until next year
						: (assetValuesParsed[assetNum].savingsUsed + otherCashUsed) *
								(assetValuesParsed[assetNum].cocReturn / 100) *
								Math.pow(cashOnCashAppreciation, i - eventIdx - 1) +
						  assetCashFlowEffect[i - 1];
				//calculate appreciation per year
				assetEquityAppreciationEffect[i] =
					assetValuesParsed[assetNum].totalCost *
						Math.pow(
							1 + assetValuesParsed[assetNum].appreciationRate / 100,
							i - eventIdx
						) -
					assetValuesParsed[assetNum].amountFinanced -
					(otherCashUsed + assetValuesParsed[assetNum].savingsUsed);
				//calculate asset loan paydown per year
				assetEquityPaydownEffect[i] = getTotalPayedDown[i - eventIdx];
			}

			for (let i = eventIdx; i < assetPricePortfolioEffect.length; i++) {
				//calculate opportunity loss for savings used on purchasing asset
				assetPricePortfolioEffect[i] =
					assetValuesParsed[assetNum].savingsUsed *
					Math.pow(1 + userSetVal.getNormalizedReturn, i - eventIdx);
				if (
					i >= eventIdx + ownerShipLength &&
					assetValuesParsed[assetNum].salesPrice
				) {
					//assess how the cash from sale of asset affects portfolio over time
					assetSalePortfolioEffect[i] =
						assetValuesParsed[assetNum].salesPrice *
						Math.pow(
							1 + userSetVal.getNormalizedReturn,
							i - eventIdx - ownerShipLength
						);
				}
			}

			assetArrays[assetNum] = {
				id: assetNum + 1,
				assetSalePortfolioEffect,
				assetPricePortfolioEffect,
				assetCashFlowEffect,
				assetEquityAppreciationEffect,
				assetEquityPaydownEffect,
			};
		}
		return assetArrays;
	} else {
		console.log('assetCount is 0');
		let assetArrays = [];
		return assetArrays;
	}
}
