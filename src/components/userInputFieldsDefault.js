import { Form } from "semantic-ui-react";
import React from "react";
import CurrencyInput from "react-currency-input-field";

export default function UserInputFieldsDefault({
  userInput,
  handleInputChange,
  handleClickUpSalary,
  handleClickDownSalary,
  handleClickUpAge,
  handleClickDownAge
}) {
  //focus styling for input divs
  const handleFocus = (e) => {
    e.target.parentElement.classList.add("focus-input");
  };

  const handleBlur = (e) => {
    e.target.parentElement.classList.remove("focus-input");
  };

  window.addEventListener(
    "keydown",
    (e) => {
      if (
        e.keyIdentifier === "U+000A" ||
        e.keyIdentifier === "Enter" ||
        e.keyCode === 13
      ) {
        if (e.target.nodeName === "INPUT" && e.target.type === "text") {
          e.preventDefault();
          return false;
        }
      }
    },
    true
  );

  return (
    <>
      <Form autoComplete="off" className="form">
        <Form.Field className="webflow-style-input">
          <CurrencyInput
            name="birthYear"
            disableGroupSeparators="true"
            allowDecimals={false}
            allowNegativeValue={false}
            value={userInput.birthYear}
            placeholder="What's your year of birth?"
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
            allowNegativeValue={false}
            value={userInput.netMonthlyIncome}
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
            allowNegativeValue={false}
            value={userInput.netSavingsRate}
            placeholder="Percentage of income saved per month"
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
            allowNegativeValue={false}
            value={userInput.currentInvestments}
            placeholder="Current investment's value"
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
            allowNegativeValue={false}
            className=""
            value={userInput.retirementAge}
            placeholder="At what age would you ideally retire?"
            onValueChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className="button-container">
            <button onClick={handleClickUpAge} tabIndex="-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-compact-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
                />
              </svg>
            </button>
            <button onClick={handleClickDownAge} tabIndex="-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-compact-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                />
              </svg>
            </button>
          </div>
        </Form.Field>

        <Form.Field className="webflow-style-input">
          <CurrencyInput
            name="retirementSalary"
            allowDecimals={false}
            allowNegativeValue={false}
            className=""
            prefix="$"
            value={userInput.retirementSalary}
            placeholder="What is your ideal retirement salary?"
            onValueChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className="button-container">
            <button onClick={handleClickUpSalary} tabIndex="-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-compact-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
                />
              </svg>
            </button>
            <button onClick={handleClickDownSalary} tabIndex="-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-compact-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                />
              </svg>
            </button>
          </div>
        </Form.Field>
      </Form>
    </>
  );
}
