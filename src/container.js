import React from "react";
import Plot from "react-plotly.js";

export default function Container(props) {
  const birthYear = parseFloat(props.propsInput.birthYear);
  const retirementAge = parseFloat(props.propsInput.retirementAge);
  const startYear = new Date().getFullYear(); //create Current Year
  const currentMonthlyTakeHomeIncome = parseFloat(
    props.propsInput.netMonthlyIncome
  ); //tax api
  const raiseEstimate = parseFloat(props.propsInput.yearlyRaise);
  const takeHomeSavingsRate = parseFloat(props.propsInput.netSavingsRate);
  const currentInvestments = parseFloat(props.propsInput.currentInvestments);
  const estimatedReturn = parseFloat(props.propsInput.estimatedROI);
  const estimatedYearlyInflation = parseFloat(props.propsInput.yearlyInflation);
  const getNormalizedReturn = estimatedReturn - estimatedYearlyInflation;
  const retirementSalary = parseFloat(props.propsInput.retirementSalary);
  const endYear = birthYear + retirementAge;
  const xAxisLength = 101;
  const periodUntilRetirement = [...Array(endYear - startYear + 1)].map(
    (_, i) => i + startYear
  );
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
    "one",
    "Investment Worth"
  );

  let trace2 = createTraceData(
    xAxisLength,
    startYear,
    birthYear,
    gainsData,
    "",
    "Portfolio Gain"
  );

  let fontColor = "#bfd2ff";
  let bgColor = "rgba(0,0,0,0)";

  let data = [trace1, trace2];

  let layout = {
    xaxis: {
      tickmode: "linear",
      tick0: 0,
      dtick: 2,
      range: [startYear, birthYear + xAxisLength],
      tickcolor: "rgba(0,0,0,0)",
      gridcolor: fontColor,
      gridwidth: "2px"
    },
    yaxis: {
      range: [0, Math.max([...investmentValue])],
      tickcolor: "rgba(0,0,0,0)",
      gridcolor: fontColor,
      gridwidth: "2px"
    },
    autosize: true,
    title: "Net Worth Over Time",
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
    font: {
      color: fontColor
    },
    legend: {
      orientation: "h"
    }
  };

  let style = {
    width: "60vw",
    height: "100%"
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
    <div className="plot-div">
      <Plot
        style={style}
        data={data}
        useResizeHandler
        layout={layout}
        config={config}
      />
    </div>
  );
}

function createTraceData(
  xAxisLength,
  startYear,
  birthYear,
  yData,
  stackGroup,
  name
) {
  return {
    x: [...Array(xAxisLength - startYear + birthYear)].map(
      (_, i) => i + startYear
    ),
    y: yData,
    stackgroup: stackGroup,
    name: name
  };
}
