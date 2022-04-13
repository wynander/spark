import React from "react";
import { Button, Header, Item, Modal, Icon } from "semantic-ui-react";
import UpdateAssetForm from "./UpdateAssetForm";
import AddAssetModal from "./AddAssetModal";

const formatDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export default function AssetList({
  assetValues,
  removeAsset,
  updateAsset,
  handleSubmit,
  user
}) {
  const [open, setOpen] = React.useState(false);
  const [activeAssetId, setActiveAssetId] = React.useState(null);

  return (
    <>
      <Button
        className="port-btn"
        onClick={() => setOpen(prevState => !prevState)}
      >
        Manage Assets
      </Button>

      <Modal
        className="manage-assets"
        open={open}
        onClose={() => setOpen(prevState => !prevState)}
      >
        <Header as="h1" className="no-asset-msg">
          <AddAssetModal
            className="port-btn add-asset-list"
            handleSubmit={handleSubmit}
          >
            Add Asset
          </AddAssetModal>
        </Header>
        {assetValues.length > 0 && (
          <div className="modal-div">
            <div className="asset-list-sidebar">
              {assetValues.map((assetNum, index) => (
                <AssetItem
                  assetProperties={assetNum}
                  setActiveAssetId={setActiveAssetId}
                  index={index}
                  key={index}
                />
              ))}
            </div>
            <div className="asset-properties">
              {" "}
              {
                <UpdateAssetForm
                  assetValues={assetValues}
                  removeAsset={removeAsset}
                  updateAsset={updateAsset}
                  activeAssetId={activeAssetId}
                  setActiveAssetId={setActiveAssetId}
                  user={user}
                />
              }
            </div>
          </div>
        )}
        {assetValues.length === 0 && (
          <>
            <h1 className="no-asset-center">
              Add an asset to see how it affects your portfolio over time
              <img className='asset-list-logo' src="/src/logo.png" alt="spark logo" />

            </h1>
          </>
        )}
      </Modal>
    </>
  );
}

const AssetItem = ({ assetProperties, setActiveAssetId, index }) => (
  <Item className="asset-item">
    <Button
      className="asset-buttons"
      onClick={() => setActiveAssetId(assetProperties.dbid || index)}
    >
      <Item.Content>
        <Item.Header>
          <Header as="h3">{assetProperties.id}</Header>
        </Item.Header>
        <Item.Meta>
          <span className="asset-metadata">
            Purchase Year: {assetProperties.purchaseYear}{" "}
          </span>
          <span className="asset-metadata">
            Total Cost: {formatDollars.format(assetProperties.totalCost)}
          </span>
        </Item.Meta>
      </Item.Content>
    </Button>
  </Item>
);
