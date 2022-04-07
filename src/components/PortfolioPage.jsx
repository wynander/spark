import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import React from 'react'
import { Container, Segment } from 'semantic-ui-react'
import AddAssetModal from './PortfolioPage/AddAssetModal'
import AssetList from './PortfolioPage/AssetList'
import PlotContainer from './PortfolioPage/PlotContainer'
import UserInputFieldsAdvanced from './PortfolioPage/UserInputFieldsAdvanced'
import { db } from '../firebase-config'

export function PortfolioPage({
  user,
  userInput,
  setUserInput,
  assetValues,
  setAssetValues,
}) {
  if (userInput.yearlyRaise === undefined) {
    setUserInput({ ...userInput, yearlyRaise: 3 })
  }
  if (userInput.yearlyInflation === undefined) {
    setUserInput({ ...userInput, yearlyInflation: 3 })
  }
  if (userInput.estimatedROI === undefined) {
    setUserInput({ ...userInput, estimatedROI: 10 })
  }

  const handleInputChange = (value, name) => {
    setUserInput({
      ...userInput,
      [name]: value,
    })
  }

  const handleClickSalary = (type) => {
    let increment = 1000
    if (userInput.retirementSalary >= 10000) {
      increment = 2000
    }
    if (userInput.retirementSalary >= 50000) {
      increment = 2500
    }
    if (userInput.retirementSalary >= 100000) {
      increment = 5000
    }
    switch (type) {
      case 'SalaryUp':
        setUserInput({
          ...userInput,
          retirementSalary: Number(userInput.retirementSalary) + increment,
        })
        break
      case 'SalaryDown':
        if (userInput.retirementSalary < 1000) {
          setUserInput({
            ...userInput,
            retirementSalary: 0,
          })
        } else {
          setUserInput({
            ...userInput,
            retirementSalary: Number(userInput.retirementSalary) - increment,
          })
        }
        break
      default:
        throw new Error()
    }
  }

  const handleClickAge = (type) => {
    switch (type) {
      case 'AgeDown':
        if (userInput.retirementAge > 0) {
          setUserInput({
            ...userInput,
            retirementAge: Number(userInput.retirementAge) - 1,
          })
        }
        break
      case 'AgeUp':
        setUserInput({
          ...userInput,
          retirementAge: Number(userInput.retirementAge) + 1,
        })
        break
      default:
        throw new Error()
    }
  }

  const handleSubmit = async (values) => {
    if (user) {
      try {
        await addDoc(collection(db, 'users/', user.uid, '/assets/'), {
          ...values,
          created: Timestamp.now(),
        })
      } catch (err) {
        alert(
          'Sorry, that submission did not make it to the database. Please refresh the page and try again. '
        )
      }
    } else {
      setAssetValues([...assetValues, values])
    }
  }

  const removeAsset = async (assetProps) => {
    if (user) {
      try {
        await deleteDoc(
          doc(db, 'users/', user.uid, '/assets/', assetProps.dbid)
        )
      } catch (err) {
        alert(
          'Sorry, that asset was not able to be removed. Please refresh the page and try again.'
        )
      }
    } else {
      setAssetValues(
        assetValues.filter((assetNumber) => assetNumber.id !== assetProps.id)
      )
    }
  }

  const updateAsset = async (values, index) => {
    if (user) {
      try {
        await updateDoc(doc(db, 'users/', user.uid, '/assets/', values.dbid), {
          ...values,
        })
      } catch (err) {
        alert(
          'Sorry, that update did not make it to the database. Please refresh the page and try again.'
        )
      }
    } else {
      let temp = [...assetValues]
      temp[index] = { ...temp[index], ...values }
      setAssetValues(temp)
    }
  }
  return (
    <div className='main-segment'>
      <Segment
        className='plot-section'
        style={{
          paddingTop: '5em',
        }}
      >
        <div className='user-form advanced-options'>
          <UserInputFieldsAdvanced
            handleInputChange={handleInputChange}
            handleClickSalary={handleClickSalary}
            handleClickAge={handleClickAge}
            userInput={userInput}
            user={user}
          />
          <AddAssetModal handleSubmit={handleSubmit}>Add Assets</AddAssetModal>
          <AssetList
            handleSubmit={handleSubmit}
            assetValues={assetValues}
            removeAsset={removeAsset}
            updateAsset={updateAsset}
            user={user}
          />
        </div>
        <Container className='plot-container'>
          <PlotContainer assetValues={assetValues} userInput={userInput} />
        </Container>
      </Segment>
    </div>
  )
}
