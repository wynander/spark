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

  return (
    <div className="App">
      <div className="section">
        <Form className="form">
          <Form.Field>
            <label className="label">Birth Year</label>
            <input
              name="birthYear"
              className="input"
              placeholder="1997"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Retirement Age</label>
            <input
              name="retirementAge"
              className="input"
              placeholder="50"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Net Monthly Income</label>
            <input
              name="netMonthlyIncome"
              className="input"
              placeholder="3900"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Yearly Raise %</label>
            <input
              name="yearlyRaise"
              className="input"
              placeholder="1.04"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Net Savings Rate %</label>
            <input
              name="netSavingsRate"
              className="input"
              placeholder=".30"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Current Investments</label>
            <input
              name="currentInvestments"
              className="input"
              placeholder="45000"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Estimated R.O.I</label>
            <input
              name="estimatedROI"
              className="input"
              placeholder="1.1"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Estimated Yearly Inflation</label>
            <input
              name="yearlyInflation"
              className="input"
              placeholder="1.03"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Desired Retirement Salary</label>
            <input
              name="retirementSalary"
              className="input"
              placeholder="100000"
              onChange={handleInputChange}
            />
          </Form.Field>
        </Form>
        <button onClick={handleSubmit}> Submit </button>

        <Container propsInput={propsInput} />
      </div>
    </div>
  );
}
