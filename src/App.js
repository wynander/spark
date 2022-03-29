import React from 'react';
import {
	Button,
	Container,
	Dropdown,
	Image,
	Menu,
	Segment,
	Icon,
} from 'semantic-ui-react';
import AddAssetModal from './components/addAssetModal.js';
import PlotContainer from './components/plotContainer.js';
import UserInputFieldsAdvanced from './components/userInputFieldsAdvanced';
import UserInputFieldsDefault from './components/userInputFieldsDefault';
import myImg from './logo.png';
import './styles.css';

function exampleReducer(state, action) {
	switch (action.type) {
		case 'OPEN_MODAL':
			return { ...state, open: true };
		case 'CLOSE_MODAL':
			return { ...state, open: false };
		case 'ADD_ASSET':
			return { ...state, open: false, assetCount: state.assetCount + 1 };
		case 'REMOVE_ASSET':
			return { ...state, open: false, assetCount: state.assetCount - 1 };
		default:
			throw new Error();
	}
}

export default function App() {
	const [isAdvanced, setAdvanced] = React.useState(false);
	const [assetValues, setAssetValues] = React.useState([]);
	const [userInput, setUserInput] = React.useState({
		birthYear: '',
		retirementAge: '',
		netMonthlyIncome: '',
		yearlyRaise: '4',
		netSavingsRate: '',
		currentInvestments: '',
		estimatedROI: '10',
		yearlyInflation: '3',
		retirementSalary: '',
	});
	//-------------------------------------------------------

	const [state, dispatch] = React.useReducer(exampleReducer, {
		open: false,
		assetCount: 0,
	});
	const { open, assetCount } = state;
	//console.log(state.assetCount);
	//console.log(modalInput);

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

	const handleClickUpSalary = (e) => {
		e.preventDefault();
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

		setUserInput({
			...userInput,
			retirementSalary: Number(userInput.retirementSalary) + increment,
		});
	};

	const handleClickDownSalary = (e) => {
		e.preventDefault();
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
	};

	const handleClickDownAge = (e) => {
		e.preventDefault();
		if (userInput.retirementAge > 0) {
			setUserInput({
				...userInput,
				retirementAge: Number(userInput.retirementAge) - 1,
			});
		}
	};

	const handleClickUpAge = (e) => {
		e.preventDefault();
		setUserInput({
			...userInput,
			retirementAge: Number(userInput.retirementAge) + 1,
		});
	};

	const handleAdvanced = () => {
		setAdvanced((prevState) => !isAdvanced);
	};

	const handleSubmit = (values) => {
		console.log(values);
		dispatch({ type: 'ADD_ASSET' });
		setAssetValues([...assetValues, values]);
	};

	const removeAsset = (data) => {
		let temp = [...assetValues];
		temp.splice(
			temp.findIndex((assetNum) => assetNum.id === data),
			1
		);
		setAssetValues(temp);
		dispatch({ type: 'REMOVE_ASSET' });
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
				<Segment className="plot-section" style={{ paddingTop: '5em' }}>
					{isAdvanced ? (
						<div className="user-form advanced-options">
							<UserInputFieldsAdvanced
								handleInputChange={handleInputChange} //It would be great to make these props an object to be passed
								handleClickUpSalary={handleClickUpSalary} //
								handleClickDownSalary={handleClickDownSalary} //
								handleClickUpAge={handleClickUpAge} //
								handleClickDownAge={handleClickDownAge} //
								userInput={userInput} //
							/>
							<Button className="advanced-btn button" onClick={handleAdvanced}>
								- Advanced Options
							</Button>
							<AddAssetModal
								assetCount={assetCount}
								handleSubmit={handleSubmit}
								dispatch={dispatch}
								open={open}
							/>
							{assetValues.length > 0 &&
								assetValues.map((assetNum, index) => (
									<Button
										key={assetNum.id}
										onClick={() => removeAsset(assetNum.id)}
										animated="vertical">
										<Button.Content visible>{assetNum.id}</Button.Content>
										<Button.Content hidden>
											<Icon name="delete" />
										</Button.Content>
									</Button>
								))}
						</div>
					) : (
						<div className="user-form default-options">
							<UserInputFieldsDefault
								handleInputChange={handleInputChange}
								handleClickUpSalary={handleClickUpSalary}
								handleClickDownSalary={handleClickDownSalary}
								handleClickUpAge={handleClickUpAge}
								handleClickDownAge={handleClickDownAge}
								userInput={userInput}
							/>
							<Button className="default-btn button" onClick={handleAdvanced}>
								+ Advanced Options
							</Button>
						</div>
					)}
					<Container className="plot-container">
						<PlotContainer
							assetValues={assetValues}
							assetCount={assetCount}
							propsInput={userInput}
						/>
					</Container>
				</Segment>
			</div>

			<footer></footer>
		</div>
	);
}
