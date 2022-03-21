import "./styles.css";
import Container from "./container";
import { Button, Form, Input } from "semantic-ui-react";
import React from "react";

export default function App() {
  const [propsInput, setPropsInput] = React.useState({
    birthYear: "1997",
    retirementAge: "50",
    netMonthlyIncome: "3900",
    yearlyRaise: "1.04",
    netSavingsRate: ".3",
    currentInvestments: "45000",
    estimatedROI: "1.1",
    yearlyInflation: "1.03",
    retirementSalary: "100000"
  });

  const [userInput, setUserInput] = React.useState({
    birthYear: "",
    retirementAge: "",
    netMonthlyIncome: "",
    yearlyRaise: "",
    netSavingsRate: "",
    currentInvestments: "",
    estimatedROI: "",
    yearlyInflation: "",
    retirementSalary: ""
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

  function handleInputChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
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
            <input
              name="birthYear"
              className=""
              placeholder="What's your year of birth?"
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <input
              name="retirementAge"
              className=""
              placeholder="At what age would you ideally retire?"
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <input
              name="netMonthlyIncome"
              className=""
              placeholder="Current net monthly income?"
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <input
              name="netSavingsRate"
              className=""
              placeholder="Percentage of income saved per month"
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <input
              name="yearlyRaise"
              className=""
              placeholder="Estimate a yearly raise percentage"
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <input
              name="currentInvestments"
              className=""
              placeholder="Current investment's value"
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <input
              name="estimatedROI"
              className=""
              placeholder="Future R.O.I on investments"
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <input
              name="yearlyInflation"
              className=""
              placeholder="Estimated Yearly Inflation"
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field className="webflow-style-input">
            <input
              name="retirementSalary"
              className=""
              placeholder="What is your ideal retirement salary?"
              onChange={handleInputChange}
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
