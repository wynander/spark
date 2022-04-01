import CurrencyInput from 'react-currency-input-field';
import { Button, Form, Modal, Icon, Label } from 'semantic-ui-react';
import { ErrorMessage, Formik } from 'formik';
import React from 'react';
import { assetInputValidationSchema } from './assetInputValidationSchema';

export default function AssetList() {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="asset-list-container">
			<Button onClick={() => setOpen((prevState) => !prevState)}>A Asset</Button>
			<Modal dimmer={false} open={open} onClose={() => setOpen((prevState) => !prevState)}>

        blblblbll
      </Modal>
		</div>
	);
}
