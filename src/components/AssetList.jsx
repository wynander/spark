import React from 'react';
import { Button, Header, Item, Modal } from 'semantic-ui-react';
import UpdateAssetForm from './UpdateAssetForm';
import AddAssetModal from './addAssetModal';

const formatDollars = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0,
});

export default function AssetList({ assetValues, removeAsset, updateAsset, handleSubmit, user }) {
	const [open, setOpen] = React.useState(false);
	const [activeAssetIndex, setActiveAssetIndex] = React.useState(0);

	return (
		<>
			<Button onClick={() => setOpen((prevState) => !prevState)}>Manage Assets</Button>

			<Modal className="manage-assets" open={open} onClose={() => setOpen((prevState) => !prevState)}>
				{assetValues.length > 0 && (
					<div className="modal-div">
						<div className="asset-list-sidebar">
							{assetValues.map((assetNum, index) => (
								<AssetItem
									assetProperties={assetNum}
									setActiveAssetIndex={setActiveAssetIndex}
									index={index}
									key={index}
								/>
							))}
						</div>
						<div className="asset-properties">
							{' '}
							{
								<UpdateAssetForm
									assetValues={assetValues}
									removeAsset={removeAsset}
									updateAsset={updateAsset}
									activeAssetIndex={activeAssetIndex}
									user={user}
								/>
							}
						</div>
					</div>
				)}
				{assetValues.length === 0 && (
					<>
						<Header as="h1">Add an asset to see its properties</Header>
						<div className="no-assets-add">
							<AddAssetModal handleSubmit={handleSubmit} />
						</div>
					</>
				)}
			</Modal>
		</>
	);
}

const AssetItem = ({ assetProperties, setActiveAssetIndex }) => (
	<Item className="asset-item">
		<Button className="asset-buttons" onClick={() => setActiveAssetIndex(assetProperties.dbid)}>
			<Item.Content>
				<Item.Header>
					<Header as="h3">{assetProperties.id}</Header>
				</Item.Header>
				<Item.Meta>
					<span className="asset-metadata">Purchase Year: {assetProperties.purchaseYear} </span>
					<span className="asset-metadata">Total Cost: {formatDollars.format(assetProperties.totalCost)}</span>
				</Item.Meta>
			</Item.Content>
		</Button>
	</Item>
);
