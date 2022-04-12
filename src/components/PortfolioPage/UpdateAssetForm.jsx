import { ErrorMessage, Formik } from "formik";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { Button, Form, Icon, Label, Header } from "semantic-ui-react";
import { assetInputValidationSchema } from "./assetInputValidationSchema";

export default function UpdateAssetForm({
  updateAsset,
  removeAsset,
  activeAssetId,
  assetValues,
  user,
  setActiveAssetId
}) {
  let initialValuesIndex = activeAssetId;

  if (user) {
    initialValuesIndex = assetValues.findIndex(
      asset => asset.dbid === activeAssetId
    );
  }

  React.useEffect(() => {
    if (initialValuesIndex === -1) {
      setActiveAssetId(assetValues[0].dbid);
    }
  });

  if (activeAssetId === null) {
    return (
      <div className="no-asset-container">
        <Icon className="arrow left no-asset-arrow" size="big" />
        <h1 className="no-asset-index-msg">
          Click an Asset to review or update its properties
        </h1>
      </div>
    );
  } else {
    return (
      <Formik
        enableReinitialize
        initialValues={{ ...assetValues[initialValuesIndex] }}
        onSubmit={values => {
          updateAsset(values, activeAssetId);
        }}
        validationSchema={assetInputValidationSchema}
      >
        {({ values, errors, handleBlur, handleSubmit, setFieldValue }) => (
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Header as="h1" dividing textAlign="center">
              {values.id}
            </Header>
            <Form.Group>
              <Form.Field width={3}>
                <label>Year of Purchase</label>
                <CurrencyInput
                  name="purchaseYear"
                  allowNegativeValue={false}
                  disableGroupSeparators="true"
                  allowDecimals={false}
                  value={values.purchaseYear}
                  onValueChange={(value, name) => {
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="purchaseYear">
                  {msg => (
                    <Label basic color="red" pointing>
                      {msg}
                    </Label>
                  )}
                </ErrorMessage>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Total Value of Asset</label>
                <CurrencyInput
                  name="totalCost"
                  allowNegativeValue={false}
                  prefix="$"
                  placeholder="$0"
                  value={values.totalCost}
                  onValueChange={(value, name) => {
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="totalCost">
                  {msg => (
                    <Label basic color="red" pointing>
                      {msg}
                    </Label>
                  )}
                </ErrorMessage>
              </Form.Field>
              <Form.Field>
                <label>Amount Financed</label>
                <CurrencyInput
                  name="amountFinanced"
                  allowNegativeValue={false}
                  prefix="$"
                  placeholder="$0"
                  value={values.amountFinanced}
                  onValueChange={(value, name) => {
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="amountFinanced">
                  {msg => (
                    <Label basic color="red" pointing>
                      {msg}
                    </Label>
                  )}
                </ErrorMessage>
              </Form.Field>
              <Form.Field>
                <label>Savings used to purchase</label>
                <CurrencyInput
                  name="savingsUsed"
                  allowNegativeValue={false}
                  prefix="$"
                  placeholder="$0"
                  value={values.savingsUsed}
                  onValueChange={(value, name) => {
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="savingsUsed">
                  {msg => (
                    <Label basic color="red" pointing>
                      {msg}
                    </Label>
                  )}
                </ErrorMessage>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Financing Term (years)</label>
                <CurrencyInput
                  name="financeTerm"
                  allowDecimals={false}
                  allowNegativeValue={false}
                  suffix=" years"
                  placeholder=""
                  value={values.financeTerm}
                  onValueChange={(value, name) => {
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="financeTerm">
                  {msg => (
                    <Label basic color="red" pointing>
                      {msg}
                    </Label>
                  )}
                </ErrorMessage>
              </Form.Field>
              <Form.Field>
                <label>Financing Rate</label>
                <CurrencyInput
                  name="financeRate"
                  allowNegativeValue={false}
                  suffix="%"
                  placeholder="0%"
                  value={values.financeRate}
                  onValueChange={(value, name) => {
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="financeRate">
                  {msg => (
                    <Label basic color="red" pointing>
                      {msg}
                    </Label>
                  )}
                </ErrorMessage>
              </Form.Field>
              <Form.Field>
                <label>Estimated asset appreciation rate</label>
                <CurrencyInput
                  name="appreciationRate"
                  suffix="%"
                  placeholder="2%"
                  value={values.appreciationRate}
                  onValueChange={(value, name) => {
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="appreciationRate">
                  {msg => (
                    <Label basic color="red" pointing>
                      {msg}
                    </Label>
                  )}
                </ErrorMessage>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Estimated cash on cash return</label>
                <CurrencyInput
                  name="cocReturn"
                  suffix="%"
                  placeholder="0%"
                  value={values.cocReturn}
                  onValueChange={(value, name) => {
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="cocReturn">
                  {msg => (
                    <Label basic color="red" pointing>
                      {msg}
                    </Label>
                  )}
                </ErrorMessage>
              </Form.Field>
              <Form.Field>
                <label>Optional: Ownership length (years)</label>
                <CurrencyInput
                  name="ownershipLength"
                  suffix=" years"
                  value={values.ownershipLength}
                  onValueChange={(value, name) => {
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                  placeholder="Indefinite"
                />
                <ErrorMessage name="ownershipLength">
                  {msg => (
                    <Label basic color="red" pointing>
                      {msg}
                    </Label>
                  )}
                </ErrorMessage>
              </Form.Field>
              <Form.Field>
                <label>Optional: Sales price</label>
                <CurrencyInput
                  name="salesPrice"
                  prefix="$"
                  placeholder="$0"
                  value={values.salesPrice}
                  onValueChange={(value, name) => {
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="salesPrice">
                  {msg => (
                    <Label basic color="red" pointing>
                      {msg}
                    </Label>
                  )}
                </ErrorMessage>
              </Form.Field>
            </Form.Group>
            <div>
              <Button
                type="button"
                negative
                onClick={() => removeAsset(assetValues[initialValuesIndex])}
              >
                <Icon name="x" />
                Remove
              </Button>

              {Object.keys(errors).length === 0 ? (
                <Button type="submit" color="green" onClick={handleSubmit}>
                  <Icon name="plus" />
                  Update
                </Button>
              ) : (
                <Button type="submit">
                  <Icon name="plus" />
                  Update
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
