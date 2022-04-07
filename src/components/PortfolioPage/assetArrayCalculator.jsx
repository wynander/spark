export default function assetArrayCalculator(
  userSetVal,
  labels,
  assetValuesParsed
) {
  labels = labels ? labels : [] //handle error boundary if assets are added without base user info
  if (assetValuesParsed.length > 0) {
    let assetArrays = new Array(assetValuesParsed.length)

    for (let assetNum = 0; assetNum < assetValuesParsed.length; assetNum++) {
      let eventIdx = labels.findIndex(
        (item) => item === assetValuesParsed[assetNum].purchaseYear
      )
      let ownershipLength =
        assetValuesParsed[assetNum].ownershipLength > 0
          ? assetValuesParsed[assetNum].ownershipLength
          : labels.length - eventIdx

      let otherCashUsed =
        assetValuesParsed[assetNum].totalCost -
        assetValuesParsed[assetNum].amountFinanced -
        assetValuesParsed[assetNum].savingsUsed //$

      let cashOnCashAppreciation = 1.02

      let assetPricePortfolioEffect = new Array(labels.length),
        assetCashFlowEffect = new Array(labels.length),
        assetEquityAppreciationEffect = new Array(labels.length),
        assetEquityPaydownEffect = new Array(labels.length),
        assetSalePortfolioEffect = new Array(labels.length)

      for (let i = 0; i < labels.length; ++i) {
        assetPricePortfolioEffect[i] = 0
        assetCashFlowEffect[i] = 0
        assetEquityPaydownEffect[i] = 0
        assetEquityAppreciationEffect[i] = 0
        assetSalePortfolioEffect[i] = 0
      }

      let balance = [assetValuesParsed[assetNum].amountFinanced]
      let getTotalPayedDown = [0]
      let yearlyPayment =
        assetValuesParsed[assetNum].amountFinanced *
        (assetValuesParsed[assetNum].financeRate /
          100 /
          (1 -
            Math.pow(
              1 + assetValuesParsed[assetNum].financeRate / 100 / 12,
              -assetValuesParsed[assetNum].financeTerm * 12
            )))

      for (let i = 1; i < ownershipLength; i++) {
        let thisYearInterestPayment =
          (balance[i - 1] * assetValuesParsed[assetNum].financeRate) / 100
        if (i <= assetValuesParsed[assetNum].financeTerm) {
          balance.push(balance[i - 1] - yearlyPayment + thisYearInterestPayment)
          getTotalPayedDown.push(
            assetValuesParsed[assetNum].amountFinanced - balance[i]
          )
        } else if (i > assetValuesParsed[assetNum].financeTerm) {
          balance.push(0)
          getTotalPayedDown.push(getTotalPayedDown[i - 1])
        }
      }

      for (let i = eventIdx; i < labels.length; i++) {
        //assess cash flow accumulation
        assetCashFlowEffect[i + 1] =
          (assetValuesParsed[assetNum].savingsUsed + otherCashUsed) *
            (assetValuesParsed[assetNum].cocReturn / 100) *
            Math.pow(cashOnCashAppreciation, i - eventIdx) +
          assetCashFlowEffect[i]

        //calculate appreciation per year
        assetEquityAppreciationEffect[i] =
          assetValuesParsed[assetNum].totalCost *
            Math.pow(
              1 + assetValuesParsed[assetNum].appreciationRate / 100,
              i - eventIdx
            ) -
          assetValuesParsed[assetNum].amountFinanced

        //calculate asset loan paydown per year
        assetEquityPaydownEffect[i] = getTotalPayedDown[i - eventIdx]

        //calculate opportunity loss for savings used on purchasing asset
        assetPricePortfolioEffect[i] =
          assetValuesParsed[assetNum].savingsUsed *
          Math.pow(1 + userSetVal.getNormalizedReturn, i - eventIdx)
        if (
          i >= eventIdx + ownershipLength - 1 &&
          assetValuesParsed[assetNum].salesPrice
        ) {
          //if there is a sale do the following
          //calculate appreciation of accumulated cashflow for the remainder of the years
          assetCashFlowEffect[i] =
            assetCashFlowEffect[eventIdx + ownershipLength - 1] *
            Math.pow(
              1 + userSetVal.getNormalizedReturn,
              i - eventIdx - ownershipLength + 1
            )
        }

        if (
          i >= eventIdx + ownershipLength &&
          assetValuesParsed[assetNum].salesPrice
        ) {
          //if there is a sale do the following
          //assess how the cash from sale of asset affects portfolio over time
          assetSalePortfolioEffect[i] =
            (assetValuesParsed[assetNum].salesPrice -
              assetValuesParsed[assetNum].amountFinanced +
              assetEquityPaydownEffect[eventIdx + ownershipLength - 1]) *
            Math.pow(
              1 + userSetVal.getNormalizedReturn,
              i - eventIdx - ownershipLength
            )
          // set zero equity in the asset after the sale
          assetEquityPaydownEffect[i] = 0
          assetEquityAppreciationEffect[i] = 0
        }
      }

      assetArrays[assetNum] = {
        id: assetNum + 1,
        assetSalePortfolioEffect,
        assetPricePortfolioEffect,
        assetCashFlowEffect,
        assetEquityAppreciationEffect,
        assetEquityPaydownEffect,
      }
    }
    return assetArrays
  } else {
    let assetArrays = []
    return assetArrays
  }
}
