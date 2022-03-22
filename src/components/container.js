import React from "react";
import Chart from "./chart.js";

export default function Container(props) {
  const {
    estimatedROI,
    yearlyInflation,
    birthYear,
    retirementAge,
    currentInvestments,
    netMonthlyIncome,
    netSavingsRate,
    yearlyRaise,
    retirementSalary
  } = usePropsParseFloat(); //parse Prop strings to floats so that these variables have number values

  const {
    xAxisLength,
    startYear,
    periodUntilRetirement,
    getNormalizedReturn
  } = usePlotVariablesCalculator();

  const { investmentValue, gainsData } = usePortfolioReturnCalculator(
    xAxisLength,
    startYear,
    birthYear,
    periodUntilRetirement,
    currentInvestments,
    getNormalizedReturn,
    netMonthlyIncome,
    netSavingsRate,
    yearlyRaise,
    retirementSalary
  );

  let labels = [...Array(75)].map((_, i) => i + startYear);
  if (xAxisLength - startYear + birthYear > 0) {
    labels = [...Array(xAxisLength - startYear + birthYear)].map(
      (_, i) => i + startYear
    );
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Investment Value",
        data: investmentValue,
        borderColor: "#b6412d",
        backgroundColor: "rgba(182, 65, 45,.2)",
        radius: "0"
      },
      {
        label: "Gains",
        data: gainsData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        radius: "0"
      }
    ]
  };

  //chart.js event on click
  return (
    <div className="plot-div">
      <Chart data={data} />
    </div>
  );

  //-----------------Functions--------------------------------
  function usePlotVariablesCalculator() {
    const startYear = new Date().getFullYear(); //create Current Year
    const getNormalizedReturn = estimatedROI - yearlyInflation;
    const endYear = birthYear + retirementAge;
    const xAxisLength = 101;
    let periodUntilRetirement = [];
    if (endYear - startYear + 1 > 0) {
      periodUntilRetirement = [...Array(endYear - startYear + 1)].map(
        (_, i) => i + startYear
      );
    }
    if (endYear - startYear + 1 <= 0) {
      periodUntilRetirement = [...Array(75)].map((_, i) => i + startYear);
    }

    return {
      periodUntilRetirement,
      xAxisLength,
      startYear,
      getNormalizedReturn
    };
  }

  function usePropsParseFloat() {
    let birthYear = parseFloat(props.propsInput.birthYear);
    let retirementAge = parseFloat(props.propsInput.retirementAge);
    let netMonthlyIncome = parseFloat(props.propsInput.netMonthlyIncome);
    let yearlyRaise = 1 + parseFloat(props.propsInput.yearlyRaise) / 100;
    let netSavingsRate = parseFloat(props.propsInput.netSavingsRate) / 100;
    let currentInvestments = parseFloat(props.propsInput.currentInvestments);
    let estimatedROI = 1 + parseFloat(props.propsInput.estimatedROI) / 100;
    let yearlyInflation =
      1 + parseFloat(props.propsInput.yearlyInflation) / 100;
    let retirementSalary = parseFloat(props.propsInput.retirementSalary);

    return {
      estimatedROI,
      yearlyInflation,
      birthYear,
      retirementAge,
      currentInvestments,
      netMonthlyIncome,
      netSavingsRate,
      yearlyRaise,
      retirementSalary
    };
  }
}

function usePortfolioReturnCalculator(
  xAxisLength,
  startYear,
  birthYear,
  periodUntilRetirement,
  currentInvestments,
  getNormalizedReturn,
  netMonthlyIncome,
  netSavingsRate,
  yearlyRaise,
  retirementSalary
) {
  const investmentValue = [currentInvestments];
  const gainsData = [12 * netMonthlyIncome * netSavingsRate];

  for (let i = 1; i < xAxisLength - startYear + birthYear; i++) {
    //Calculate saving period portfolio gains
    if (i < periodUntilRetirement.length) {
      investmentValue.push(
        investmentValue[i - 1] * (1 + getNormalizedReturn) +
          12 * netMonthlyIncome * netSavingsRate * Math.pow(yearlyRaise, i - 1)
      );
      gainsData.push(investmentValue[i] - investmentValue[i - 1]);
    }
    //Calculate retirement period portfolio gains minus retirement salary
    if (i >= periodUntilRetirement.length) {
      //if investments are zeroed, make all further values 0
      if (
        investmentValue[i - 1] * (1 + getNormalizedReturn) - retirementSalary <
        0
      ) {
        investmentValue.push(0);
        gainsData.push(0);
      }
      //if investments are >0, push new investment value based on investment gain minus retirement salary
      if (
        investmentValue[i - 1] * (1 + getNormalizedReturn) - retirementSalary >
        0
      ) {
        investmentValue.push(
          investmentValue[i - 1] * (1 + getNormalizedReturn) - retirementSalary
        );
        gainsData.push(investmentValue[i] - investmentValue[i - 1]);
      }
    }
  }
  return { investmentValue, gainsData };
}
