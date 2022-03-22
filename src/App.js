import "./styles.css";
import UserInputFields from "./components/userInputFields";
import React from "react";
import Container from "./components/container.js";

export default function App() {
  const [userInput, setUserInput] = React.useState({
    birthYear: "0",
    retirementAge: "",
    netMonthlyIncome: "0",
    yearlyRaise: "0",
    netSavingsRate: "0",
    currentInvestments: "0",
    estimatedROI: "0",
    yearlyInflation: "0",
    retirementSalary: ""
  });

  function handleInputChange(value, name) {
    const rawValue = value;
    console.log(rawValue);
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  function handleClickUpSalary(e) {
    e.preventDefault();
    let increment = 1000;
    if (userInput.retirementSalary >= 10000) {
      increment = 2000;
    }
    if (userInput.retirementSalary >= 50000) {
      increment = 2500;
    }
    if (userInput.retirementSalary >= 100000) {
      increment = 5000;
    }
    setUserInput({
      ...userInput,
      retirementSalary: Number(userInput.retirementSalary) + increment
    });
  }

  function handleClickDownSalary(e) {
    e.preventDefault();
    let increment = 1000;
    if (userInput.retirementSalary >= 10000) {
      increment = 2000;
    }
    if (userInput.retirementSalary >= 50000) {
      increment = 2500;
    }
    if (userInput.retirementSalary >= 100000) {
      increment = 5000;
    }
    setUserInput({
      ...userInput,
      retirementSalary: Number(userInput.retirementSalary) - increment
    });
  }

  function handleClickDownAge(e) {
    e.preventDefault();
    setUserInput({
      ...userInput,
      retirementAge: Number(userInput.retirementAge) - 1
    });
  }
  function handleClickUpAge(e) {
    e.preventDefault();
    setUserInput({
      ...userInput,
      retirementAge: Number(userInput.retirementAge) + 1
    });
  }

  return (
    <div className="App">
      <div className="section">
        <UserInputFields
          handleInputChange={handleInputChange}
          handleClickUpSalary={handleClickUpSalary}
          handleClickDownSalary={handleClickDownSalary}
          handleClickUpAge={handleClickUpAge}
          handleClickDownAge={handleClickDownAge}
          userInput={userInput}
        />
        <Container propsInput={userInput} />
      </div>
    </div>
  );
}
