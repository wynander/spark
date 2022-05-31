export const getTotalPayedDown = (asset, ownershipLength) => {
  let balance = [asset.amountFinanced]
  let totalPayedDown = [0]
  let yearlyPayment =
    balance[0] *
    (asset.financeRate /
      100 /
      (1 - Math.pow(1 + asset.financeRate / 100 / 12, -asset.financeTerm * 12)))

  for (let i = 1; i < ownershipLength; i++) {
    let thisYearInterestPayment = (balance[i - 1] * asset.financeRate) / 100
    if (i <= asset.financeTerm) {
      balance.push(balance[i - 1] - yearlyPayment + thisYearInterestPayment)
      totalPayedDown.push(asset.amountFinanced - balance[i])
    } else if (i > asset.financeTerm) {
      balance.push(0)
      totalPayedDown.push(totalPayedDown[i - 1])
    }
  }

  return totalPayedDown
}

export const calculateSalePortfolioEffect = (
  asset,
  assetEquityPaydownEffect,
  purchaseYearIndex,
  ownershipLength,
  getNormalizedReturn,
  i
) => {
  return (
    (asset.salesPrice -
      asset.amountFinanced +
      assetEquityPaydownEffect[purchaseYearIndex + ownershipLength - 1]) *
    Math.pow(1 + getNormalizedReturn, i - purchaseYearIndex - ownershipLength)
  )
}

export const calculatePostSaleCashFlowAppreciation = (
  assetCashFlowEffect,
  purchaseYearIndex,
  ownershipLength,
  getNormalizedReturn,
  i
) => {
  return (
    assetCashFlowEffect[purchaseYearIndex + ownershipLength - 1] *
    Math.pow(1 + getNormalizedReturn, i - purchaseYearIndex - ownershipLength + 1)
  )
}

export const calculatePricePortfolioEffect = (asset, getNormalizedReturn, i, purchaseYearIndex) => {
  return asset.savingsUsed * Math.pow(1 + getNormalizedReturn, i - purchaseYearIndex)
}

export const calculateCashFlowEffect = (
  asset,
  otherCashUsed,
  cashOnCashAppreciation,
  i,
  purchaseYearIndex,
  assetCashFlowEffect
) => {
  return (
    (asset.savingsUsed + otherCashUsed) *
      (asset.cocReturn / 100) *
      Math.pow(cashOnCashAppreciation, i - purchaseYearIndex) +
    assetCashFlowEffect[i]
  )
}

export const calculateAssetEquityAppreciationEffect = (asset, i, purchaseYearIndex) => {
  return (
    asset.totalCost * Math.pow(1 + asset.appreciationRate / 100, i - purchaseYearIndex) -
    asset.amountFinanced
  )
}
