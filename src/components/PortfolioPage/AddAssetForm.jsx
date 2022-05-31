import { ErrorMessage, Formik } from 'formik'
import React from 'react'
import CurrencyInput from 'react-currency-input-field'
import { Button, Form, Icon, Label } from 'semantic-ui-react'
import { assetInputValidationSchema } from './assetInputValidationSchema'

const initialValues = {
  id: '',
  purchaseYear: '',
  totalCost: '',
  amountFinanced: '',
  savingsUsed: '',
  financeTerm: '',
  financeRate: '',
  appreciationRate: '',
  cocReturn: '',
  ownershipLength: '',
  salesPrice: '',
}

const AddAssetForm = ({ handleSubmit, setOpen }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values) => {
      handleSubmit(values)
      setOpen((prevState) => !prevState)
    }}
    validationSchema={assetInputValidationSchema}
  >
    {({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
      <Form autoComplete='off' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Field width={3}>
            <label>Year of Purchase</label>
            <CurrencyInput
              name='purchaseYear'
              allowNegativeValue={false}
              disableGroupSeparators='true'
              allowDecimals={false}
              value={values.purchaseYear}
              onValueChange={(value, name) => {
                setFieldValue(name, Number(value) ? Number(value) : '')
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name='purchaseYear'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>

          <Form.Field width={3}>
            <label>Asset Name</label>
            <input
              type='text'
              name='id'
              value={values.id}
              onChange={(e) => {
                const value = e.target.value || ''
                setFieldValue('id', value.toUpperCase())
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name='id'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Total Value of Asset</label>
            <CurrencyInput
              name='totalCost'
              allowNegativeValue={false}
              prefix='$'
              placeholder='$0'
              value={values.totalCost}
              onValueChange={(value, name) => {
                setFieldValue(name, value)
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name='totalCost'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>
          <Form.Field>
            <label>Amount Financed</label>
            <CurrencyInput
              name='amountFinanced'
              allowNegativeValue={false}
              prefix='$'
              placeholder='$0'
              value={values.amountFinanced}
              onValueChange={(value, name) => {
                setFieldValue(name, value)
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name='amountFinanced'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>
          <Form.Field>
            <label>Savings used to purchase</label>
            <CurrencyInput
              name='savingsUsed'
              allowNegativeValue={false}
              prefix='$'
              placeholder='$0'
              value={values.savingsUsed}
              onValueChange={(value, name) => {
                setFieldValue(name, value)
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name='savingsUsed'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Financing Term (years)</label>
            <CurrencyInput
              name='financeTerm'
              allowDecimals={false}
              allowNegativeValue={false}
              suffix=' years'
              placeholder=''
              value={values.financeTerm}
              onValueChange={(value, name) => {
                setFieldValue(name, value)
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name='financeTerm'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>
          <Form.Field>
            <label>Financing Rate</label>
            <CurrencyInput
              name='financeRate'
              allowNegativeValue={false}
              suffix='%'
              placeholder='0%'
              value={values.financeRate}
              onValueChange={(value, name) => {
                setFieldValue(name, value)
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name='financeRate'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>
          <Form.Field>
            <label>Estimated asset appreciation rate</label>
            <CurrencyInput
              name='appreciationRate'
              suffix='%'
              placeholder='2%'
              value={values.appreciationRate}
              onValueChange={(value, name) => {
                setFieldValue(name, value)
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name='appreciationRate'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Estimated cash on cash return</label>
            <CurrencyInput
              name='cocReturn'
              suffix='%'
              placeholder='0%'
              value={values.cocReturn}
              onValueChange={(value, name) => {
                setFieldValue(name, value)
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name='cocReturn'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>
          <Form.Field>
            <label>Optional: Ownership length (years)</label>
            <CurrencyInput
              name='ownershipLength'
              suffix=' years'
              value={values.ownershipLength}
              onValueChange={(value, name) => {
                setFieldValue(name, value)
              }}
              onBlur={handleBlur}
              placeholder='Indefinite'
            />
            <ErrorMessage name='ownershipLength'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>
          <Form.Field>
            <label>Optional: Sales price</label>
            <CurrencyInput
              name='salesPrice'
              prefix='$'
              placeholder='$0'
              value={values.salesPrice}
              onValueChange={(value, name) => {
                setFieldValue(name, value)
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name='salesPrice'>
              {(msg) => (
                <Label basic color='red' pointing>
                  {msg}
                </Label>
              )}
            </ErrorMessage>
          </Form.Field>
        </Form.Group>
        <div>
          <Button type='button' negative onClick={() => setOpen((prevState) => !prevState)}>
            <Icon name='x' />
            Cancel
          </Button>

          {Object.keys(errors).length === 0 ? (
            <Button type='submit' color='green' onClick={handleSubmit}>
              <Icon name='plus' />
              Add
            </Button>
          ) : (
            <Button type='submit'>
              <Icon name='plus' />
              Add
            </Button>
          )}
        </div>
      </Form>
    )}
  </Formik>
)

export default AddAssetForm