import "./styles.css";
import Container from "./container";
import { Button, Form, Input } from "semantic-ui-react";
import React from "react";

export default function App() {
  const [userInput, setUserInput] = React.useState({
    birthYear: "1990",
    retirementAge: "60",
    netMonthlyIncome: "3900",
    yearlyRaise: "1.04",
    netSavingsRate: ".3",
    currentInvestments: "45000",
    estimatedROI: "1.1",
    yearlyInflation: "1.03",
    retirementSalary: "100000"
  });

  function handleInputChange(e) {
    setUserInput({
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
              placeholder="YYYY"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Retirement Age</label>
            <input name="retirementAge" className="input" placeholder="60" />
          </Form.Field>
          <Form.Field>
            <label className="label">Net Monthly Income</label>
            <input name="netMonthlyIncome" className="input" placeholder="0$" />
          </Form.Field>
          <Form.Field>
            <label className="label">Yearly Raise %</label>
            <input name="yearlyRaise" className="input" placeholder="4%" />
          </Form.Field>
          <Form.Field>
            <label className="label">Net Savings Rate %</label>
            <input name="netSavingsRate" className="input" placeholder="0%" />
          </Form.Field>
          <Form.Field>
            <label className="label">Current Investments</label>
            <input
              name="currentInvestments"
              className="input"
              placeholder="0$"
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Estimated R.O.I</label>
            <input name="estimatedROI" className="input" placeholder="8%" />
          </Form.Field>
          <Form.Field>
            <label className="label">Estimated Yearly Inflation</label>
            <input name="yearlyInflation" className="input" placeholder="3%" />
          </Form.Field>
          <Form.Field>
            <label className="label">Desired Retirement Salary</label>
            <input
              name="retirementSalary"
              className="input"
              placeholder="50000$"
            />
          </Form.Field>
        </Form>

        <Container userInput={userInput} />
      </div>
    </div>
  );
}
