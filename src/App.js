import "./styles.css";
import UserInputFieldsAdvanced from "./components/userInputFieldsAdvanced";
import UserInputFieldsDefault from "./components/userInputFieldsDefault";
import React from "react";
import Container from "./components/container.js";

export default function App() {
  const [isAdvanced, setAdvanced] = React.useState(false);
  const [userInput, setUserInput] = React.useState({
    birthYear: "",
    retirementAge: "",
    netMonthlyIncome: "",
    yearlyRaise: "4",
    netSavingsRate: "",
    currentInvestments: "",
    estimatedROI: "10",
    yearlyInflation: "3",
    retirementSalary: ""
  });

  const handleInputChange = (value, name) => {
    if (name === "birthYear" && value >= 10000) {
      setUserInput({
        ...userInput,
        [name]: value.substring(0, 4)
      });
    } else {
      setUserInput({
        ...userInput,
        [name]: value
      });
    }
  };

  const handleClickUpSalary = (e) => {
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
  };

  const handleClickDownSalary = (e) => {
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
    if (userInput.retirementSalary < 1000) {
      setUserInput({
        ...userInput,
        retirementSalary: 0
      });
    } else {
      setUserInput({
        ...userInput,
        retirementSalary: Number(userInput.retirementSalary) - increment
      });
    }
  };

  const handleClickDownAge = (e) => {
    e.preventDefault();
    if (userInput.retirementAge > 0) {
      setUserInput({
        ...userInput,
        retirementAge: Number(userInput.retirementAge) - 1
      });
    }
  };

  const handleClickUpAge = (e) => {
    e.preventDefault();
    setUserInput({
      ...userInput,
      retirementAge: Number(userInput.retirementAge) + 1
    });
  };

  const handleAdvanced = () => {
    setAdvanced((prevState) => !isAdvanced);
  };

  return (
    <div className="App">
      <button className="advanced-button" onClick={handleAdvanced}>
        +
      </button>
      <div className="section">
        {isAdvanced ? (
          <UserInputFieldsAdvanced
            handleInputChange={handleInputChange} //It would be great to make these props an object to be passed
            handleClickUpSalary={handleClickUpSalary} //
            handleClickDownSalary={handleClickDownSalary} //
            handleClickUpAge={handleClickUpAge} //
            handleClickDownAge={handleClickDownAge} //
            userInput={userInput} //
          />
        ) : (
          <UserInputFieldsDefault
            handleInputChange={handleInputChange}
            handleClickUpSalary={handleClickUpSalary}
            handleClickDownSalary={handleClickDownSalary}
            handleClickUpAge={handleClickUpAge}
            handleClickDownAge={handleClickDownAge}
            userInput={userInput}
          />
        )}
        <Container propsInput={userInput} />
      </div>
    </div>
  );
}
