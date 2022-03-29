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

const initialModalInputState = {
	id: '',
	purchaseYear: '',
	totalCost: '',
	amountFinanced: '',
	savingsUsed: '',
	financeTerm: '',
	financeRate: '',
	appreciationRate: '',
	cocReturn: '',
	ownershipLength: '',
	salesPrice: '',
};

export default function App() {
	const [isAdvanced, setAdvanced] = React.useState(false);
	const [modalInput, setModalInput] = React.useState(initialModalInputState);
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

	const handleClose = () => {
		dispatch({ type: 'CLOSE_MODAL' });
		setModalInput(initialModalInputState);
	};

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

	const handleSubmit = (event) => {
		event.preventDefault(event);
		if (assetValues === undefined) {
			setAssetValues([modalInput]);
		} else {
			setAssetValues([...assetValues, modalInput]);
		}
		setModalInput(initialModalInputState);
		dispatch({ type: 'ADD_ASSET' });
	};

	const handleChange = (value, name) => {
		//this only works for the currency inputs because of how they hanble onValueChange events
		setModalInput({ ...modalInput, [name]: value });
	};

	const handleNameChange = (e) => {
		//this is required for standard input HTML elements as 'value' and 'name' cannot be destructured
		setModalInput({ ...modalInput, [e.target.name]: e.target.value });
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

					<Dropdown item simple text="Dropdown">
						<Dropdown.Menu>
							<Dropdown.Item>List Item</Dropdown.Item>
							<Dropdown.Item>List Item</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Header>Header Item</Dropdown.Header>
							<Dropdown.Item>
								<i className="dropdown icon" />
								<span className="text">Submenu</span>
								<Dropdown.Menu>
									<Dropdown.Item>List Item</Dropdown.Item>
									<Dropdown.Item>List Item</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown.Item>
							<Dropdown.Item>List Item</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
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
								handleChange={handleChange}
								handleNameChange={handleNameChange}
								modalInput={modalInput}
								dispatch={dispatch}
								open={open}
								handleClose={handleClose}
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
