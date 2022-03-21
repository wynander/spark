import React from "react";
import Plot from "react-plotly.js";

export default function Container(props) {
  const birthYear = props.userInput.birthYear;
  const retirementAge = props.userInput.retirementAge;
  const startYear = new Date().getFullYear(); //create Current Year
  const currentMonthlyTakeHomeIncome = props.userInput.netMonthlyIncome; //tax api
  const raiseEstimate = props.userInput.yearlyRaise;
  const takeHomeSavingsRate = props.userInput.netSavingsRate;
  const currentInvestments = props.userInput.currentInvestments;
  const estimatedReturn = props.userInput.estimatedROI;
  const estimatedYearlyInflation = props.userInput.yearlyInflation;
  const getNormalizedReturn = estimatedReturn - estimatedYearlyInflation;
  const retirementSalary = props.userInput.retirementSalary;
  const endYear = birthYear + retirementAge;
  const xAxisLength = 101;
  function getPeriodUntilRetirement(endYear, startYear) {
    [...Array(endYear - startYear + 1)].map((_, i) => i + startYear);
  }
  const periodUntilRetirement = getPeriodUntilRetirement(endYear, startYear);
  const investmentValue = [currentInvestments];
  const gainsData = [12 * currentMonthlyTakeHomeIncome * takeHomeSavingsRate];

  function calculateYearlySavings(i) {
    return (
      12 *
      currentMonthlyTakeHomeIncome *
      takeHomeSavingsRate *
      Math.pow(raiseEstimate, i - 1)
    );
  }

  function calculateInvestmentGain(i) {
    return investmentValue[i - 1] * (1 + getNormalizedReturn);
  }

  for (let i = 1; i < xAxisLength - startYear + birthYear; i++) {
    //Calculate saving period portfolio gains
    if (i < periodUntilRetirement.length) {
      investmentValue.push(
        calculateInvestmentGain(i) + calculateYearlySavings(i)
      );
      gainsData.push(investmentValue[i] - investmentValue[i - 1]);
    }
    //Calculate retirement period portfolio gains minus retirement salary
    if (i >= periodUntilRetirement.length) {
      //if investments are zeroed, make all further values 0
      if (calculateInvestmentGain(i) - retirementSalary < 0) {
        investmentValue.push(0);
        gainsData.push(0);
      }
      //if investments are >0, push new investment value based on investment gain minus retirement salary
      if (calculateInvestmentGain(i) - retirementSalary > 0) {
        investmentValue.push(calculateInvestmentGain(i) - retirementSalary);
        gainsData.push(investmentValue[i] - investmentValue[i - 1]);
      }
    }
  }

  let trace1 = createTraceData(
    xAxisLength,
    startYear,
    birthYear,
    investmentValue,
    "one"
  );

  let trace2 = createTraceData(
    xAxisLength,
    startYear,
    birthYear,
    gainsData,
    ""
  );

  let fontColor = "fff";
  let bgColor = "black";

  let data = [trace1, trace2];

  let layout = {
    xaxis: {
      tickmode: "linear",
      tick0: 0,
      dtick: 2,
      range: [startYear, birthYear + xAxisLength]
    },
    yaxis: {
      range: [0, Math.max([...investmentValue])]
    },
    autosize: true,
    title: "Net Worth Over Time",
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
    font: {
      color: fontColor
    }
  };

  let style = {
    width: "70vw",
    height: "100vh"
  };

  let config = {
    modeBarButtonsToRemove: ["toImage", "zoomOut", "zoomIn", "pan"]
  };

  //----------------Window Resizing State--------------------------------------------
  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);
  //------------------------------------------------------------
  //If window gets too small, reduce # of x-ticks.

  //plotly_click event on click
  return (
    <>
      <Plot
        style={style}
        data={data}
        useResizeHandler
        layout={layout}
        config={config}
      />
    </>
  );
}
function createTraceData(xAxisLength, startYear, birthYear, yData, stackGroup) {
  return {
    x: [...Array(xAxisLength - startYear + birthYear)].map(
      (_, i) => i + startYear
    ),
    y: yData,
    stackgroup: stackGroup
  };
}
