import {
  getTotalPayedDown,
  calculateAssetEquityAppreciationEffect,
  calculateCashFlowEffect,
  calculatePostSaleCashFlowAppreciation,
  calculatePricePortfolioEffect,
  calculateSalePortfolioEffect,
} from './assetCalculatorHelperFunctions'

const assetArrayCalculator = (labels, assetValuesParsed, getNormalizedReturn) => {
  let xAxisValues = labels ? labels : [] //handle edge case if assets are added without base user info

  if (assetValuesParsed.length > 0) {
    let assetArrays = new Array(assetValuesParsed.length)

    for (const asset of assetValuesParsed) {
      let assetPricePortfolioEffect = new Array(xAxisValues.length).fill(0),
        assetCashFlowEffect = new Array(xAxisValues.length).fill(0),
        assetEquityAppreciationEffect = new Array(xAxisValues.length).fill(0),
        assetEquityPaydownEffect = new Array(xAxisValues.length).fill(0),
        assetSalePortfolioEffect = new Array(xAxisValues.length).fill(0)

      let purchaseYearIndex = xAxisValues.findIndex((item) => item === asset.purchaseYear)

      let ownershipLength =
        asset.ownershipLength > 0 ? asset.ownershipLength : xAxisValues.length - purchaseYearIndex

      let otherCashUsed = asset.totalCost - asset.amountFinanced - asset.savingsUsed

      let cashOnCashAppreciation = 1.02

      let totalPayedDown = getTotalPayedDown(asset, ownershipLength)

      for (let yearIndex = purchaseYearIndex; yearIndex < xAxisValues.length; yearIndex++) {
        //assess cash flow accumulation
        assetCashFlowEffect[yearIndex + 1] = calculateCashFlowEffect(
          asset,
          otherCashUsed,
          cashOnCashAppreciation,
          yearIndex,
          purchaseYearIndex,
          assetCashFlowEffect
        )

        //calculate appreciation per year
        assetEquityAppreciationEffect[yearIndex] = calculateAssetEquityAppreciationEffect(
          asset,
          yearIndex,
          purchaseYearIndex
        )

        //calculate asset loan paydown per year
        assetEquityPaydownEffect[yearIndex] = totalPayedDown[yearIndex - purchaseYearIndex]

        //calculate opportunity loss for savings used on purchasing asset
        assetPricePortfolioEffect[yearIndex] = calculatePricePortfolioEffect(
          asset,
          getNormalizedReturn,
          yearIndex,
          purchaseYearIndex
        )

        if (yearIndex >= purchaseYearIndex + ownershipLength - 1 && asset.salesPrice) {
          //if there is a sale do the following
          //calculate appreciation of accumulated cashflow for the remainder of the years
          assetCashFlowEffect[yearIndex] = calculatePostSaleCashFlowAppreciation(
            assetCashFlowEffect,
            purchaseYearIndex,
            ownershipLength,
            getNormalizedReturn,
            yearIndex
          )
        }

        if (yearIndex >= purchaseYearIndex + ownershipLength && asset.salesPrice) {
          //if there is a sale do the following
          //assess how the cash from sale of asset affects portfolio over time
          assetSalePortfolioEffect[yearIndex] = calculateSalePortfolioEffect(
            asset,
            assetEquityPaydownEffect,
            purchaseYearIndex,
            ownershipLength,
            getNormalizedReturn,
            yearIndex
          )
          // set zero equity in the asset after the sale
          assetEquityPaydownEffect[yearIndex] = 0
          assetEquityAppreciationEffect[yearIndex] = 0
        }
      }

      assetArrays[assetArrays.length] = {
        id: assetArrays.length + 1,
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

export default assetArrayCalculator
