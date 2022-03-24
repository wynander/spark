import './styles.css';
import UserInputFieldsAdvanced from './components/userInputFieldsAdvanced';
import UserInputFieldsDefault from './components/userInputFieldsDefault';
import React from 'react';
import PlotContainer from './components/plotContainer.js';
import {
	Container,
	Accordion,
	Divider,
	Dropdown,
	Grid,
	Header,
	Image,
	List,
	Menu,
	Segment,
	Button,
	Modal,
} from 'semantic-ui-react';
import myImg from './logo.png';
import CurrencyInput from 'react-currency-input-field';

function exampleReducer(state, action) {
	switch (action.type) {
		case 'OPEN_MODAL':
			return { open: true, dimmer: action.dimmer };
		case 'CLOSE_MODAL':
			return { open: false };
		default:
			throw new Error();
	}
}

export default function App() {
	const [isAdvanced, setAdvanced] = React.useState(false);
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
		dimmer: undefined,
	});
	const { open, dimmer } = state;

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
							<Button className="advanced-btn button" onClick={handleAdvanced}>
								- Advanced Options
							</Button>
							<UserInputFieldsAdvanced
								handleInputChange={handleInputChange} //It would be great to make these props an object to be passed
								handleClickUpSalary={handleClickUpSalary} //
								handleClickDownSalary={handleClickDownSalary} //
								handleClickUpAge={handleClickUpAge} //
								handleClickDownAge={handleClickDownAge} //
								userInput={userInput} //
							/>
							<Button
								onClick={() =>
									dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })
								}>
								Add Asset
							</Button>
							<Modal
								dimmer={dimmer}
								open={open}
								onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
								<Modal.Header>
									Add an asset purchase to your portfolio
								</Modal.Header>
								<Modal.Content>
									Adding an asset purchase such as real estate can have a
									positive affect on your portfolio
								</Modal.Content>
								<Modal.Actions>
									<Button
										negative
										onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
										Cancel
									</Button>
									<Button
										positive
										onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
										Add
									</Button>
								</Modal.Actions>
							</Modal>
						</div>
					) : (
						<div className="user-form default-options">
							<Button className="default-btn button" onClick={handleAdvanced}>
								+ Advanced Options
							</Button>
							<UserInputFieldsDefault
								handleInputChange={handleInputChange}
								handleClickUpSalary={handleClickUpSalary}
								handleClickDownSalary={handleClickDownSalary}
								handleClickUpAge={handleClickUpAge}
								handleClickDownAge={handleClickDownAge}
								userInput={userInput}
							/>
						</div>
					)}
					<Container className="plot-container">
						<PlotContainer propsInput={userInput} />
					</Container>
				</Segment>
			</div>

			<footer></footer>
		</div>
	);
}
