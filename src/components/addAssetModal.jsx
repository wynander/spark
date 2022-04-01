import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import AddAssetForm from './AddAssetForm';

export default function AddAssetModal({ handleSubmit }) {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<Button onClick={() => setOpen((prevState) => !prevState)}>Add Asset</Button>
			<Modal dimmer={'blurring'} open={open} onClose={() => setOpen((prevState) => !prevState)}>
				<Modal.Header>Add an asset purchase to your portfolio</Modal.Header>
				<Modal.Content>
					<AddAssetForm handleSubmit={handleSubmit} setOpen={setOpen} />
				</Modal.Content>
			</Modal>
		</>
	);
}
