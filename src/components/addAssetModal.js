import CurrencyInput from 'react-currency-input-field';
import { Button, Form, Modal } from 'semantic-ui-react';

export default function AddAssetModal({
	assetCount,
	handleSubmit,
	modalInput,
	dispatch,
	open,
	handleChange,
	handleClose,
	handleNameChange,
}) {
	return (
		<>
			<Button onClick={() => dispatch({ type: 'OPEN_MODAL' })}>
				Add Asset
			</Button>
			<Modal dimmer={'blurring'} open={open} onClose={handleClose}>
				<Modal.Header>Add an asset purchase to your portfolio</Modal.Header>
				<Modal.Content>
					<Form autoComplete="off" onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Field width={3}>
								<label>Year of Purchase</label>
								<CurrencyInput
									name="purchaseYear"
									allowNegativeValue={false}
									disableGroupSeparators="true"
									allowDecimals={false}
									className=""
									value={modalInput.purchaseYear}
									placeholder=""
									onValueChange={handleChange}
								/>
							</Form.Field>
							<Form.Field width={3}>
								<label>Asset Name</label>
								<input
									type="text"
									name="id"
									value={modalInput.id}
									onChange={handleNameChange}
								/>
							</Form.Field>
						</Form.Group>
						<Form.Group widths="equal">
							<Form.Field>
								<label>Total Cost of Asset</label>
								<CurrencyInput
									name="totalCost"
									allowNegativeValue={false}
									className=""
									prefix="$"
									value={modalInput.totalCost}
									placeholder="$0"
									onValueChange={handleChange}
								/>
							</Form.Field>
							<Form.Field>
								<label>Amount Financed</label>
								<CurrencyInput
									name="amountFinanced"
									allowNegativeValue={false}
									className=""
									prefix="$"
									value={modalInput.amountFinanced}
									placeholder="$0"
									onValueChange={handleChange}
								/>
							</Form.Field>
							<Form.Field>
								<label>Savings used to purchase</label>
								<CurrencyInput
									name="savingsUsed"
									allowNegativeValue={false}
									className=""
									prefix="$"
									value={modalInput.savingsUsed}
									placeholder="$0"
									onValueChange={handleChange}
								/>
							</Form.Field>
						</Form.Group>
						<Form.Group widths="equal">
							<Form.Field>
								<label>Financing Term (years)</label>
								<CurrencyInput
									name="financeTerm"
									allowDecimals={false}
									allowNegativeValue={false}
									className=""
									suffix=" years"
									value={modalInput.financeTerm}
									placeholder=""
									onValueChange={handleChange}
								/>
							</Form.Field>
							<Form.Field>
								<label>Financing Rate</label>
								<CurrencyInput
									name="financeRate"
									allowNegativeValue={false}
									className=""
									suffix="%"
									value={modalInput.financeRate}
									placeholder="0%"
									onValueChange={handleChange}
								/>
							</Form.Field>
							<Form.Field>
								<label>Estimated asset appreciation rate</label>
								<CurrencyInput
									name="appreciationRate"
									className=""
									suffix="%"
									value={modalInput.appreciationRate}
									placeholder="2%"
									onValueChange={handleChange}
								/>
							</Form.Field>
						</Form.Group>
						<Form.Group widths="equal">
							<Form.Field>
								<label>Estimated cash on cash return</label>
								<CurrencyInput
									name="cocReturn"
									className=""
									suffix="%"
									value={modalInput.cocReturn}
									placeholder="0%"
									onValueChange={handleChange}
								/>
							</Form.Field>
							<Form.Field>
								<label>Optional: Ownership length (years)</label>
								<CurrencyInput
									name="ownershipLength"
									className=""
									suffix=" years"
									value={modalInput.ownershipLength}
									placeholder=""
									onValueChange={handleChange}
								/>
							</Form.Field>
							<Form.Field>
								<label>Optional: Sales price</label>
								<CurrencyInput
									name="salesPrice"
									className=""
									prefix="$"
									value={modalInput.salesPrice}
									placeholder="$0"
									onValueChange={handleChange}
								/>
							</Form.Field>
						</Form.Group>
						<div>
							<Button negative onClick={handleClose}>
								Cancel
							</Button>
							<Button type={'submit'} positive>
								Add
							</Button>
						</div>
					</Form>
				</Modal.Content>
			</Modal>
		</>
	);
}
