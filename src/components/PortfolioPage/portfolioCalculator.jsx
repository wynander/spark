import calculatePlotVariables from './calcPlotVariables'

let defaultXAxisLength = 50

const portfolioReturnCalculator = (userInput, getNormalizedReturn) => {
  const { xAxisLength, startYear, periodUntilRetirement } = calculatePlotVariables(
    userInput,
    defaultXAxisLength
  )

  const retirementIndex = periodUntilRetirement.length - 1
  const investmentValue = [userInput.currentInvestments]
  const investmentGainsData = [(12 * userInput.netMonthlyIncome * userInput.netSavingsRate) / 100]
  const arrayLength = xAxisLength - startYear + userInput.birthYear
  const retirementDraw = [0]

  let preRetirementLength = periodUntilRetirement.length
  if (periodUntilRetirement.length === 'undefined' || periodUntilRetirement.length === 0) {
    preRetirementLength = defaultXAxisLength
  }

  let retirementSalaryValid = userInput.retirementSalary ? userInput.retirementSalary : 0

  for (let i = 1; i < (arrayLength > 0 ? arrayLength : defaultXAxisLength); i++) {
    //Calculate investment gains based on saving
    if (i < preRetirementLength) {
      investmentValue.push(
        investmentValue[i - 1] * (1 + getNormalizedReturn) +
          ((12 * userInput.netMonthlyIncome * userInput.netSavingsRate) / 100) *
            Math.pow(1 + (userInput.yearlyRaise ?? 4) / 100, i - 1)
      )

      investmentGainsData.push(investmentValue[i] - investmentValue[i - 1])
      retirementDraw.push(0)
    }

    //Calculate retirement period savings gains
    if (i >= preRetirementLength) {
      investmentValue.push(investmentValue[i - 1] * (1 + getNormalizedReturn))
      investmentGainsData.push(investmentValue[i] - investmentValue[i - 1])
      retirementDraw.push(
        -(-1 * retirementDraw[i - 1] * (1 + getNormalizedReturn) + retirementSalaryValid)
      )
    }
  }

  let labels = [...Array(defaultXAxisLength)].map((_, i) => i + startYear)
  if (xAxisLength - startYear + userInput.birthYear > 0) {
    labels = [...Array(xAxisLength - startYear + userInput.birthYear)].map((_, i) => i + startYear)
  }
  return {
    investmentValue,
    retirementDraw,
    labels,
    retirementIndex,
  }
}

export default portfolioReturnCalculator
