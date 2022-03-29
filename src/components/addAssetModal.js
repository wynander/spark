import CurrencyInput from 'react-currency-input-field';
import { Button, Form, Modal, Icon, Label } from 'semantic-ui-react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

const thisYear = new Date().getFullYear();
console.log(thisYear);

const modalInputValidationSchema = Yup.object().shape({
	id: Yup.string().min(1, 'Too Short').max(12, 'Too Long').required('Required'),
	purchaseYear: Yup.number()
		.min(thisYear, 'Must be higher than current year')
		.max(2100, 'Purchase date too far away')
		.required('Required'),
	totalCost: Yup.number().positive('Must be positive').required('Required'),
	amountFinanced: Yup.number()
		.positive('Must be positive')
		.required('Required'),
	savingsUsed: Yup.number().min(0, 'Must be $0 or higher').required('Required'),
	financeTerm: Yup.number()
		.positive('Must be positive')
		.min(1, 'Minimum 1 year term')
		.max(50, 'Maximum 50 year term')
		.required('Required'),
	financeRate: Yup.number()
		.min(0, 'Minimum 0%')
		.max(99, 'Maximum 99%')
		.positive('Must be positive')
		.required('Required'),
	appreciationRate: Yup.number()
		.min(0, 'Minimum 0%')
		.max(99, 'Maximum 99%')
		.required('Required'),
	cocReturn: Yup.number()
		.min(-99, 'Minimum -99%')
		.max(99, 'Maximum 99%')
		.required('Required'),
	ownershipLength: Yup.number()
		.min(1, 'Minimum 1 year ')
		.max(99, 'Maximum 99 Years')
		.positive('Must be positive'),
	salesPrice: Yup.number().when('ownershipLength', {
		is: (ownershipLength) => ownershipLength > 0,
		then: Yup.number()
			.min(0, 'Minimum $0')
			.positive('Must be positive')
			.required('Required if ownership length is set'),
	}),
});

export default function AddAssetModal({
	handleSubmit,
	dispatch,
	open,
	handleClose,
}) {
	return (
		<>
			<Button onClick={() => dispatch({ type: 'OPEN_MODAL' })}>
				Add Asset
			</Button>
			<Modal dimmer={'blurring'} open={open} onClose={handleClose}>
				<Modal.Header>Add an asset purchase to your portfolio</Modal.Header>
				<Modal.Content>
					<Formik
						initialValues={{
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
						}}
						onSubmit={handleSubmit}
						validationSchema={modalInputValidationSchema}>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							setFieldValue,
						}) => (
							<Form autoComplete="off" onSubmit={handleSubmit}>
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
											{(msg) => (
												<Label basic color="red" pointing>
													{msg}
												</Label>
											)}
										</ErrorMessage>
									</Form.Field>

									<Form.Field width={3}>
										<label>Asset Name</label>
										<input
											type="text"
											name="id"
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										<ErrorMessage name="id">
											{(msg) => (
												<Label basic color="red" pointing>
													{msg}
												</Label>
											)}
										</ErrorMessage>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<label>Total Cost of Asset</label>
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
											{(msg) => (
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
											{(msg) => (
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
											{(msg) => (
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
											{(msg) => (
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
											{(msg) => (
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
											{(msg) => (
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
											{(msg) => (
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
											{(msg) => (
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
											{(msg) => (
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
										onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
										<Icon name="x" />
										Cancel
									</Button>

									{Object.keys(errors).length === 0 ? (
										<Button type="submit" color="green" onClick={handleSubmit}>
											<Icon name="plus" />
											Add
										</Button>
									) : (
										<Button type="submit">
											<Icon name="plus" />
											Add
										</Button>
									)}
								</div>
								{/* {<div>{errors.purchaseYear}</div>}
								{<div>{errors.id}</div>}
								{<div>{errors.totalCost}</div>}
								{<div>{errors.amountFinanced}</div>}
								{<div>{errors.savingsUsed}</div>}
								{<div>{errors.financeTerm}</div>}
								{<div>{errors.financeRate}</div>}
								{<div>{errors.appreciationRate}</div>}
								{<div>{errors.cocReturn}</div>}
								{<div>{errors.ownershipLength}</div>}
								{<div>{errors.salesPrice}</div>} */}
							</Form>
						)}
					</Formik>
				</Modal.Content>
			</Modal>
		</>
	);
}
