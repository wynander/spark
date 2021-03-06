import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import AddAssetForm from './AddAssetForm'

const AddAssetModal = ({ handleSubmit, className, children }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button className={className} onClick={() => setOpen((prevState) => !prevState)}>
        {children}
      </Button>
      <Modal open={open} onClose={() => setOpen((prevState) => !prevState)}>
        <Modal.Header>Add an asset purchase to your portfolio</Modal.Header>
        <Modal.Content>
          <AddAssetForm handleSubmit={handleSubmit} setOpen={setOpen} />
        </Modal.Content>
      </Modal>
    </>
  )
}

export default AddAssetModal