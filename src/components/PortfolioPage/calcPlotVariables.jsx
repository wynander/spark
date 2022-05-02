export default function plotVariablesCalculator(userInput, defaultXAxisLength) {
  const startYear = new Date().getFullYear(); //create Current Year
  const xAxisLength = 80;
  const endYear = userInput.birthYear
    ? userInput.birthYear + userInput.retirementAge
    : startYear + xAxisLength;
  let periodUntilRetirement = [];
  
  if (endYear - startYear + 1 > 0) {
    periodUntilRetirement = [...Array(endYear - startYear + 1)].map(
      (_, i) => i + startYear
    );
  }
  if (endYear - startYear + 1 <= 0) {
    periodUntilRetirement = [...Array(defaultXAxisLength)].map(
      (_, i) => i + startYear
    );
  }

  return {
    periodUntilRetirement,
    xAxisLength,
    startYear
  };
}
