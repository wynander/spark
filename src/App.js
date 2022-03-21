import "./styles.css";
import Container from "./container";
import { Form } from "semantic-ui-react";
import React from "react";
import CurrencyInput from "react-currency-input-field";

export default function App() {
  const [propsInput, setPropsInput] = React.useState({
    birthYear: "1997",
    retirementAge: "50",
    netMonthlyIncome: "3900",
    yearlyRaise: "4",
    netSavingsRate: "30",
    currentInvestments: "45000",
    estimatedROI: "10",
    yearlyInflation: "3",
    retirementSalary: "100000"
  });

  const [userInput, setUserInput] = React.useState({
    birthYear: "0",
    retirementAge: "0",
    netMonthlyIncome: "0",
    yearlyRaise: "0",
    netSavingsRate: "0",
    currentInvestments: "0",
    estimatedROI: "0",
    yearlyInflation: "0",
    retirementSalary: "0"
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userInput);
    setPropsInput((prevState) => ({
      ...prevState,
      ...userInput
    }));
    console.log(propsInput);
  }

  function handleInputChange(value, name) {
    const rawValue = value;
    console.log(rawValue);
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  //focus styling for input divs
  const handleFocus = (e) => {
    e.target.parentElement.classList.add("focus-input");
  };

  const handleBlur = (e) => {
    e.target.parentElement.classList.remove("focus-input");
  };

  return (
    <div className="App">
      <div className="section">
        <Form autoComplete="off" className="form">
          <Form.Field className="webflow-style-input">
            <CurrencyInput
              name="birthYear"
              disableGroupSeparators="true"
              allowDecimals={false}
              placeholder="What's your year of birth?"
              onValueChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <CurrencyInput
              name="retirementAge"
              suffix=" years of age"
              allowDecimals={false}
              className=""
              placeholder="At what age would you ideally retire?"
              onValueChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <CurrencyInput
              name="netMonthlyIncome"
              prefix="$"
              className=""
              placeholder="Current net monthly income?"
              onValueChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <CurrencyInput
              name="netSavingsRate"
              className=""
              suffix="%"
              placeholder="Percentage of income saved per month"
              onValueChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <CurrencyInput
              name="yearlyRaise"
              className=""
              suffix="%"
              placeholder="Estimate a yearly raise percentage"
              onValueChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <CurrencyInput
              name="currentInvestments"
              className=""
              prefix="$"
              placeholder="Current investment's value"
              onValueChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <CurrencyInput
              name="estimatedROI"
              className=""
              suffix="%"
              placeholder="Future R.O.I on investments"
              onValueChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <CurrencyInput
              name="yearlyInflation"
              className=""
              suffix="%"
              placeholder="Estimated Yearly Inflation"
              onValueChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <CurrencyInput
              name="retirementSalary"
              allowDecimals={false}
              className=""
              prefix="$"
              placeholder="What is your ideal retirement salary?"
              onValueChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button onClick={handleSubmit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </button>
          </Form.Field>
        </Form>

        <Container propsInput={propsInput} />
      </div>
    </div>
  );
}
