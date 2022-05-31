import PortfolioChart from './PortfolioChart'
import portfolioReturnCalculator from './portfolioCalculator'
import assetArrayCalculator from './assetArrayCalculator'
import React from 'react'

const getRetirementArrays = (
  safeDraw,
  i,
  portfolioValArray,
  retirementIndex,
  unsafeDraw,
  getNormalizedReturn
) => {
  safeDraw[i] = calcRetirementPortfolioVal(
    safeDraw,
    i,
    getNormalizedReturn,
    portfolioValArray,
    retirementIndex,
    0.03
  )

  unsafeDraw[i] = calcRetirementPortfolioVal(
    unsafeDraw,
    i,
    getNormalizedReturn,
    portfolioValArray,
    retirementIndex,
    0.05
  )
}

const calcRetirementPortfolioVal = (
  retirementArray,
  i,
  ROI,
  portfolioValArray,
  retirementIndex,
  initialDrawPercent
) => {
  return (
    retirementArray[i - 1] * (1 + ROI) - initialDrawPercent * portfolioValArray[retirementIndex]
  )
}

const assetParseFloat = (assetValues) => {
  let assetValuesParsed = assetValues.map((entry) =>
    Object.entries(entry).reduce((obj, [key, value]) => ((obj[key] = parseFloat(value)), obj), {})
  )
  return assetValuesParsed
}

const calculateAssetEquityValue = (assetTotals, index) => {
  let temp = assetTotals.equityAppreciationEffect[index] + assetTotals.equityPaydownEffect[index]
  return temp === 0 ? NaN : temp
}

const calculateAdjustPortfolioValue = (item, assetTotals, index) => {
  let temp =
    item -
    assetTotals.pricePortfolioEffect[index] +
    assetTotals.cashFlowEffect[index] +
    +assetTotals.salePortfolioEffect[index]
  return temp
}

const PlotContainer = ({ assetValues, userInput }) => {
  //turn assetValues into datasets
  //append them to the default datasets variable,
  //change default portfolio data to adjusted to show change w/ assets

  let data = React.useMemo(() => {
    const assetValuesParsed = assetParseFloat(assetValues)
    const getNormalizedReturn =
      ((userInput.estimatedROI ?? 10) - (userInput.yearlyInflation ?? 3)) / 100
    const { investmentValue, retirementDraw, labels, retirementIndex } = portfolioReturnCalculator(
      userInput,
      getNormalizedReturn
    )
    const assetArrays = assetArrayCalculator(labels, assetValuesParsed, getNormalizedReturn)

    let portfolioValue = investmentValue.map((item, index) => {
      return item + retirementDraw[index]
    })

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
        retirementIndex: retirementIndex,
      },
    ]

    const data = {
      labels: labels,
      datasets: datasets,
    }

    let assetTotals = {
      pricePortfolioEffect: [],
      salePortfolioEffect: [],
      cashFlowEffect: [],
      equityAppreciationEffect: [],
      equityPaydownEffect: [],
    }

    if (assetValues.length > 0) {
      //sum the asset arrays to get cumulative effects
      //could also be done using Object.keys.forEach but this is more readable and allows the assetTotals to have different names
      for (const i in labels) {
        assetTotals.pricePortfolioEffect[i] = assetArrays
          .map((item) => item.assetPricePortfolioEffect[i])
          .reduce((p, c) => p + c)
        assetTotals.salePortfolioEffect[i] = assetArrays
          .map((item) => item.assetSalePortfolioEffect[i])
          .reduce((p, c) => p + c)
        assetTotals.cashFlowEffect[i] = assetArrays
          .map((item) => item.assetCashFlowEffect[i])
          .reduce((p, c) => p + c)
        assetTotals.equityAppreciationEffect[i] = assetArrays
          .map((item) => item.assetEquityAppreciationEffect[i])
          .reduce((p, c) => p + c)
        assetTotals.equityPaydownEffect[i] = assetArrays
          .map((item) => item.assetEquityPaydownEffect[i])
          .reduce((p, c) => p + c)
      }
    }

    let tempPortfolioValue = portfolioValue.map((item, index) => {
      return calculateAdjustPortfolioValue(item, assetTotals, index)
    })

    let assetsEquityValue = portfolioValue.map((_, index) => {
      return calculateAssetEquityValue(assetTotals, index)
    })

    let safeDraw = new Array(labels.length),
      unsafeDraw = new Array(labels.length)

    const retirementData = [
      {
        id: 'safeDraw',
        label: 'Very Safe',
        data: safeDraw,
        borderColor: '#36964d',
        fill: '+1',
        backgroundColor: 'rgba(45, 100, 45,.25)',
        borderDash: [10, 10],
        radius: '0',
        key: new Date(),
      },
      {
        id: 'unsafeDraw',
        label: 'Unsafe',
        data: unsafeDraw,
        borderDash: [10, 10],
        borderColor: 'rgba(220, 45, 45,.7)',
        fill: true,
        backgroundColor: 'rgba(255, 45, 45,.08)',
        radius: '0',
        key: new Date(),
      },
    ]

    datasets.push(...retirementData)

    if (assetValues.length !== 0) {
      datasets[0].label = 'Adjusted Portfolio Value'
      datasets[0].data = tempPortfolioValue
      datasets.push({
        id: 'assetEquity',
        label: 'Equity in Assets',
        data: assetsEquityValue,
        borderColor: 'rgba(66, 135, 245,1)',
        fill: true,
        borderDash: [0, 0],
        backgroundColor: 'rgba(66, 135, 245,1)',
        radius: '0',
        key: new Date(),
      })

      if (retirementIndex) {
        for (let i = 0; i < labels.length; i++) {
          if (i > retirementIndex) {
            getRetirementArrays(
              safeDraw,
              i,
              tempPortfolioValue,
              retirementIndex,
              unsafeDraw,
              getNormalizedReturn
            )
          } else {
            safeDraw[i] = tempPortfolioValue[i]
            unsafeDraw[i] = tempPortfolioValue[i]
          }
        }
      }
      return data
    } else {
      if (retirementIndex) {
        for (let i = 0; i < labels.length; i++) {
          if (i > retirementIndex) {
            getRetirementArrays(
              safeDraw,
              i,
              portfolioValue,
              retirementIndex,
              unsafeDraw,
              getNormalizedReturn
            )
          } else {
            safeDraw[i] = portfolioValue[i]
            unsafeDraw[i] = portfolioValue[i]
          }
        }
      }
      return data
    }
  }, [userInput, assetValues])

  return <PortfolioChart data={data} />
}

export default PlotContainer
