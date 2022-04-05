import React from 'react';
import { Container, Image, Menu, Segment } from 'semantic-ui-react';
import AddAssetModal from './components/addAssetModal';
import AssetList from './components/AssetList';
import PlotContainer from './components/plotContainer';
import UserInputFieldsAdvanced from './components/userInputFieldsAdvanced';
import myImg from './logo.png';
import './styles.css';
import { auth, db, logout, signInWithGoogle } from './firebase-config';
import {
	collection,
	addDoc,
	Timestamp,
	query,
	orderBy,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function App() {
	const [user, loading, error] = useAuthState(auth);
	console.log('user', user);

	const [dbAssetValues, setDbAssetValues] = React.useState();
	const [assetValues, setAssetValues] = React.useState([]);
	const [userInput, setUserInput] = React.useState({
		birthYear: '',
		retirementAge: '',
		netMonthlyIncome: '',
		retirementSalary: '',
		netSavingsRate: '',
		currentInvestments: '',
		estimatedROI: '10',
		yearlyInflation: '3',
		yearlyRaise: '3',
	});

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
				setDbAssetValues(
					querySnapshot.docs.map((doc) => ({
						dbid: doc.id,
						...doc.data(),
					}))
				);
			});
		}
	}, [user]);

	console.log(dbAssetValues);
	//-----------------------------------------------------------

	const handleInputChange = (value, name) => {
		if (name === 'birthYear' && value >= 10000) {
			setUserInput({
				...userInput,
				[name]: value.substring(0, 4),
			});
		} else {
			setUserInput({
				...userInput,
				[name]: value,
			});
		}
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
				alert(err);
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
				alert(err);
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
				alert(err);
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
						spark
					</Menu.Item>
					<Menu.Item as="a">Home</Menu.Item>
					<Menu.Item as="a">Retirement Planner</Menu.Item>
					<Menu.Item as="a">Contact</Menu.Item>
				</Container>
			</Menu>
			<div className="main-segment">
				<button className="ui button" onClick={signInWithGoogle}>
					Login
				</button>
				<Segment className="plot-section" style={{ paddingTop: '5em' }}>
					<div className="user-form advanced-options">
						<UserInputFieldsAdvanced
							handleInputChange={handleInputChange}
							handleClickSalary={handleClickSalary}
							handleClickAge={handleClickAge}
							userInput={userInput}
						/>
						<AddAssetModal handleSubmit={handleSubmit} />
						<AssetList
							handleSubmit={handleSubmit}
							assetValues={dbAssetValues || assetValues}
							removeAsset={removeAsset}
							updateAsset={updateAsset}
							user={user}
						/>
					</div>
					<Container className="plot-container">
						<PlotContainer assetValues={dbAssetValues || assetValues} userInput={userInput} />
					</Container>
				</Segment>
			</div>

			<footer></footer>
		</div>
	);
}
