import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	Timestamp,
	updateDoc,
	getDoc,
} from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Container, Image, Menu, Segment } from 'semantic-ui-react';
import AddAssetModal from './components/addAssetModal';
import AssetList from './components/AssetList';
import PlotContainer from './components/plotContainer';
import UserInputFieldsAdvanced from './components/userInputFieldsAdvanced';
import { auth, db, logout, signInWithGoogle } from './firebase-config';
import myImg from './logo.png';
import './App.css'

const initialUserInput = {
	birthYear: '',
	retirementAge: '',
	netMonthlyIncome: '',
	retirementSalary: '',
	netSavingsRate: '',
	currentInvestments: '',
	estimatedROI: '10',
	yearlyInflation: '3',
	yearlyRaise: '3',
};

export default function App() {
	const [user] = useAuthState(auth);
	const [assetValues, setAssetValues] = React.useState([]);
	const [userInput, setUserInput] = React.useState(initialUserInput);

	if (userInput.yearlyRaise === undefined) {
		setUserInput({ ...userInput, yearlyRaise: 3 });
	}
	if (userInput.yearlyInflation === undefined) {
		setUserInput({ ...userInput, yearlyInflation: 3 });
	}
	if (userInput.estimatedROI === undefined) {
		setUserInput({ ...userInput, estimatedROI: 10 });
	}

	//-------------------------------------------------------

	React.useEffect(() => {
		if (user) {
			const q = query(collection(db, 'users/' + user.uid + '/assets'), orderBy('created', 'desc'));
			onSnapshot(q, (querySnapshot) => {
				setAssetValues(
					querySnapshot.docs.map((doc) => ({
						dbid: doc.id,
						...doc.data(),
					}))
				);
			});
		}
		if (!user) {
			setAssetValues([]);
		}
	}, [user]);

	React.useEffect(() => {
		(async () => {
			if (user) {
				const docSnap = await getDoc(doc(db, 'users', user.uid, 'portfolio-variables', 'user-input'));
				if (docSnap.exists()) {
					setUserInput(docSnap.data());
				}
			}
			if (!user) {
				setUserInput(initialUserInput);
			}
		})();
	}, [user]);

	//-----------------------------------------------------------

	const handleInputChange = (value, name) => {
		setUserInput({
			...userInput,
			[name]: value,
		});
	};

	const handleClickSalary = (type) => {
		let increment = 1000;
		if (userInput.retirementSalary >= 10000) {
			increment = 2000;
		}
		if (userInput.retirementSalary >= 50000) {
			increment = 2500;
		}
		if (userInput.retirementSalary >= 100000) {
			increment = 5000;
		}
		switch (type) {
			case 'SalaryUp':
				setUserInput({
					...userInput,
					retirementSalary: Number(userInput.retirementSalary) + increment,
				});
				break;
			case 'SalaryDown':
				if (userInput.retirementSalary < 1000) {
					setUserInput({
						...userInput,
						retirementSalary: 0,
					});
				} else {
					setUserInput({
						...userInput,
						retirementSalary: Number(userInput.retirementSalary) - increment,
					});
				}
				break;
			default:
				throw new Error();
		}
	};

	const handleClickAge = (type) => {
		switch (type) {
			case 'AgeDown':
				if (userInput.retirementAge > 0) {
					setUserInput({
						...userInput,
						retirementAge: Number(userInput.retirementAge) - 1,
					});
				}
				break;
			case 'AgeUp':
				setUserInput({
					...userInput,
					retirementAge: Number(userInput.retirementAge) + 1,
				});
				break;
			default:
				throw new Error();
		}
	};

	const handleSubmit = async (values) => {
		if (user) {
			try {
				await addDoc(collection(db, 'users/', user.uid, '/assets/'), {
					...values,
					created: Timestamp.now(),
				});
			} catch (err) {
				alert('Sorry, that submission did not make it to the database. Please refresh the page and try again. ');
			}
		} else {
			setAssetValues([...assetValues, values]);
		}
	};

	const removeAsset = async (assetProps) => {
		if (user) {
			try {
				await deleteDoc(doc(db, 'users/', user.uid, '/assets/', assetProps.dbid));
			} catch (err) {
				alert('Sorry, that asset was not able to be removed. Please refresh the page and try again.');
			}
		} else {
			setAssetValues(assetValues.filter((assetNumber) => assetNumber.id !== assetProps.id));
		}
	};

	const updateAsset = async (values, index) => {
		if (user) {
			try {
				await updateDoc(doc(db, 'users/', user.uid, '/assets/', values.dbid), {
					...values,
				});
			} catch (err) {
				alert('Sorry, that update did not make it to the database. Please refresh the page and try again.');
			}
		} else {
			let temp = [...assetValues];
			temp[index] = { ...temp[index], ...values };
			setAssetValues(temp);
		}
	};

	return (
		<div className="App">
			<Menu fixed="top" inverted>
				<Container>
					<Menu.Item as="a" header>
						<Image size="mini" src={myImg} style={{ marginRight: '.5em' }} />
						Spark
					</Menu.Item>
					<Menu.Item as="a">Hoe</Menu.Item>
					<Menu.Item as="a">Portfolio</Menu.Item>
					<Menu.Item as="a">Contact</Menu.Item>
				</Container>
				{user ? (
					<>
						<Menu.Item as="a" header>
							<Image size="mini" className="user-icon" src={user.photoURL} style={{ marginRight: '.5em' }} />
							<div className="user-detail-mini">
								<div className="display-name">{user.displayName}</div>
								<div className="display-email">{user.email}</div>
							</div>
						</Menu.Item>
						<Menu.Item as="a" className="sign-in-btn" onClick={logout}>
							Sign out
						</Menu.Item>
					</>
				) : (
					<Menu.Item as="a" className="sign-in-btn" onClick={signInWithGoogle}>
						Sign in using Google
					</Menu.Item>
				)}
			</Menu>
			<div className="main-segment">
				<Segment className="plot-section" style={{ paddingTop: '5em' }}>
					<div className="user-form advanced-options">
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
					<Container className="plot-container">
						<PlotContainer assetValues={assetValues} userInput={userInput} />
					</Container>
				</Segment>
			</div>
			<footer></footer>
		</div>
	);
}
