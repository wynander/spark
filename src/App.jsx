import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Route, Routes } from 'react-router-dom'
import { db } from './firebase-config'
import './App.css'
import { ContactPage } from './components/ContactPage'
import { AboutPage } from './components/AboutPage'
import { NavBar } from './components/NavBar'
import { PortfolioPage } from './components/PortfolioPage'
import { auth } from './firebase-config'

const initialUserInput = {
  birthYear: null,
  retirementAge: null,
  netMonthlyIncome: null,
  retirementSalary: null,
  netSavingsRate: null,
  currentInvestments: null,
  estimatedROI: null,
  yearlyInflation: null,
  yearlyRaise: null,
}

const App = () => {
  const [user] = useAuthState(auth)

  // The user input / assetvalues that are pulled from the database will update on anypage visited.
  // This is so when user goes to Portfolio page, theres is no async data fetching leading to flicker
  const [assetValues, setAssetValues] = React.useState([])
  const [userInput, setUserInput] = React.useState(initialUserInput)

  React.useEffect(() => {
    if (user) {
      const q = query(collection(db, 'users/' + user.uid + '/assets'), orderBy('created', 'desc'))
      onSnapshot(q, (querySnapshot) => {
        setAssetValues(
          querySnapshot.docs.map((doc) => ({
            dbid: doc.id,
            ...doc.data(),
          }))
        )
      })
    }
    if (!user) {
      setAssetValues([])
    }
  }, [user])

  React.useEffect(() => {
    ;(async () => {
      if (user) {
        const docSnap = await getDoc(
          doc(db, 'users', user.uid, 'portfolio-variables', 'user-input')
        )
        if (docSnap.exists()) {
          setUserInput(docSnap.data())
        }
      }
      if (!user) {
        setUserInput(initialUserInput)
      }
    })()
  }, [user])

  return (
    <div className='App'>
      <NavBar user={user} />
      <Routes>
        <Route path='/' element={<AboutPage user={user} />} />
        <Route
          path='portfolio'
          element={
            <PortfolioPage
              user={user}
              userInput={userInput}
              setUserInput={setUserInput}
              assetValues={assetValues}
              setAssetValues={setAssetValues}
            />
          }
        />
        {/* <Route path="contact" element={<ContactPage user={user} />} /> */}
      </Routes>
      <footer />
    </div>
  )
}

export default App
