import { doc, setDoc } from 'firebase/firestore'
import React from 'react'
import CurrencyInput from 'react-currency-input-field'
import { Button, Form } from 'semantic-ui-react'
import { db } from '../../firebase-config'

const UserInputFieldsAdvanced = ({
  userInput,
  handleInputChange,
  handleClickSalary,
  handleClickAge,
  user,
}) => {
  const [isAdvanced, setAdvanced] = React.useState(false)
  const handleAdvanced = () => {
    setAdvanced((prevState) => !isAdvanced)
  }

  //focus styling for main UI inputs
  const handleFocus = (e) => {
    e.target.parentElement.classList.add('focus-input')
  }

  const handleBlur = (e) => {
    e.target.parentElement.classList.remove('focus-input')
  }

  const handleClick = (field, type) => {
    if (field === 'salary') {
      handleClickSalary(type)
    }
    if (field === 'age') {
      handleClickAge(type)
    }
  }

  return (
    <>
      <Form autoComplete='off' className='form-main'>
        <Form.Field className='webflow-style-input'>
          {userInput.birthYear !== null ? <label className='input-label'>Birth Year</label> : null}
          <CurrencyInput
            name='birthYear'
            disableGroupSeparators='true'
            allowDecimals={false}
            allowNegativeValue={false}
            value={userInput.birthYear}
            placeholder="What's your year of birth?"
            onValueChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={4}
          />
        </Form.Field>

        <Form.Field className='webflow-style-input'>
          {userInput.netMonthlyIncome !== null ? (
            <label className='input-label'>Net Monthly Income</label>
          ) : null}
          <CurrencyInput
            name='netMonthlyIncome'
            prefix='$'
            className=''
            allowNegativeValue={false}
            value={userInput.netMonthlyIncome}
            placeholder='Current net monthly income?'
            onValueChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Field className='webflow-style-input'>
          {userInput.netSavingsRate !== null ? (
            <label className='input-label'>Percentage of Income Saved</label>
          ) : null}
          <CurrencyInput
            name='netSavingsRate'
            className=''
            suffix='%'
            allowNegativeValue={false}
            value={userInput.netSavingsRate}
            placeholder='Percentage of income saved per month'
            onValueChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Field className='webflow-style-input'>
          {userInput.currentInvestments !== null ? (
            <label className='input-label'>Current Investments Value</label>
          ) : null}

          <CurrencyInput
            name='currentInvestments'
            className=''
            prefix='$'
            value={userInput.currentInvestments}
            placeholder="Current investment's value"
            onValueChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Form.Field>
        {isAdvanced && (
          <>
            <Form.Field className='webflow-style-input'>
              {userInput.yearlyRaise !== null ? (
                <label className='input-label'>Yearly Raise</label>
              ) : null}
              <CurrencyInput
                name='yearlyRaise'
                className=''
                suffix='%'
                allowNegativeValue={false}
                value={userInput.yearlyRaise}
                placeholder='Yearly Raise %'
                onValueChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Form.Field>
            <Form.Field className='webflow-style-input'>
              {userInput.estimatedROI !== null ? (
                <label className='input-label'>Estimated ROI</label>
              ) : null}
              <CurrencyInput
                name='estimatedROI'
                className=''
                suffix='%'
                allowNegativeValue={false}
                value={userInput.estimatedROI}
                placeholder='Estimated ROI %'
                onValueChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Form.Field>
            <Form.Field className='webflow-style-input'>
              {userInput.yearlyInflation !== null ? (
                <label className='input-label'>Yearly Inflation</label>
              ) : null}

              <CurrencyInput
                name='yearlyInflation'
                className=''
                suffix='%'
                allowNegativeValue={false}
                value={userInput.yearlyInflation}
                placeholder='Yearly Inflation %'
                onValueChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Form.Field>
          </>
        )}
        <Form.Field className='webflow-style-input'>
          {userInput.retirementAge !== null ? (
            <label className='input-label'>Retirement Age</label>
          ) : null}
          <CurrencyInput
            name='retirementAge'
            suffix=' years of age'
            allowDecimals={false}
            allowNegativeValue={false}
            className=''
            value={userInput.retirementAge}
            placeholder='At what age would you ideally retire?'
            onValueChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className='button-container'>
            <button type='button' onClick={() => handleClick('age', 'AgeUp')} tabIndex='-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                className='bi bi-chevron-compact-up'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z'
                />
              </svg>
            </button>
            <button type='button' onClick={() => handleClick('age', 'AgeDown')} tabIndex='-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                className='bi bi-chevron-compact-down'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z'
                />
              </svg>
            </button>
          </div>
        </Form.Field>
        <Form.Field className='webflow-style-input'>
          {userInput.retirementSalary !== null ? (
            <label className='input-label'>Retirement Salary</label>
          ) : null}
          <CurrencyInput
            name='retirementSalary'
            allowDecimals={false}
            allowNegativeValue={false}
            className=''
            prefix='$'
            value={userInput.retirementSalary}
            placeholder='What is your ideal retirement salary?'
            onValueChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className='button-container'>
            <button type='button' onClick={() => handleClick('salary', 'SalaryUp')} tabIndex='-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                className='bi bi-chevron-compact-up'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z'
                />
              </svg>
            </button>
            <button type='button' onClick={() => handleClick('salary', 'SalaryDown')} tabIndex='-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                className='bi bi-chevron-compact-down'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z'
                />
              </svg>
            </button>
          </div>
        </Form.Field>
      </Form>
      {isAdvanced ? (
        <Button className='advanced-btn port-btn' onClick={handleAdvanced}>
          - Advanced Options
        </Button>
      ) : (
        <Button className='advanced-btn port-btn' onClick={handleAdvanced}>
          + Advanced Options
        </Button>
      )}
    </>
  )
}

export default InputForm