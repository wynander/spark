import React from 'react';
import { Container, Image, Menu, Segment } from 'semantic-ui-react';
import AddAssetModal from './components/addAssetModal';
import AssetList from './components/AssetList';
import PlotContainer from './components/plotContainer';
import UserInputFieldsAdvanced from './components/userInputFieldsAdvanced';
import myImg from './logo.png';
import './styles.css';

export default function App() {
	const [assetValues, setAssetValues] = React.useState([
		{
			id: 'zeroth',
			purchaseYear: '2030',
			totalCost: '100000',
			amountFinanced: '80000',
			savingsUsed: '20000',
			financeTerm: '30',
			financeRate: '4.5',
			appreciationRate: '2',
			cocReturn: '10',
			ownershipLength: '',
			salesPrice: '',
		},
		{
			id: 'first',
			purchaseYear: '2030',
			totalCost: '10000000',
			amountFinanced: '80000',
			savingsUsed: '20000',
			financeTerm: '30',
			financeRate: '4.5',
			appreciationRate: '2',
			cocReturn: '10',
			ownershipLength: '',
			salesPrice: '',
		},
		{
			id: 'second',
			purchaseYear: '2030',
			totalCost: '100000',
			amountFinanced: '80000',
			savingsUsed: '20000',
			financeTerm: '30',
			financeRate: '4.5',
			appreciationRate: '2',
			cocReturn: '10',
			ownershipLength: '',
			salesPrice: '',
		},
		{
			id: 'third',
			purchaseYear: '2030',
			totalCost: '100000',
			amountFinanced: '80000',
			savingsUsed: '20000',
			financeTerm: '30',
			financeRate: '4.5',
			appreciationRate: '2',
			cocReturn: '10',
			ownershipLength: '',
			salesPrice: '',
		},
		{
			id: 'third',
			purchaseYear: '2030',
			totalCost: '100000',
			amountFinanced: '80000',
			savingsUsed: '20000',
			financeTerm: '30',
			financeRate: '4.5',
			appreciationRate: '2',
			cocReturn: '10',
			ownershipLength: '',
			salesPrice: '',
		},
		{
			id: 'third',
			purchaseYear: '2030',
			totalCost: '100000',
			amountFinanced: '80000',
			savingsUsed: '20000',
			financeTerm: '30',
			financeRate: '4.5',
			appreciationRate: '2',
			cocReturn: '10',
			ownershipLength: '',
			salesPrice: '',
		},
		{
			id: 'third',
			purchaseYear: '2030',
			totalCost: '100000',
			amountFinanced: '80000',
			savingsUsed: '20000',
			financeTerm: '30',
			financeRate: '4.5',
			appreciationRate: '2',
			cocReturn: '10',
			ownershipLength: '',
			salesPrice: '',
		},
	]);
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

	const handleSubmit = (values) => {
		setAssetValues([...assetValues, values]);
	};

	const removeAsset = (id) => {
		let temp = [...assetValues];
		temp.splice(
			temp.findIndex((assetNumber) => assetNumber.id === id),
			1
		);
		setAssetValues(temp);
	};

	const updateAsset = (values, index) => {
		let temp = [...assetValues];
		temp[index] = { ...temp[index], ...values };
		setAssetValues(temp);
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
							assetValues={assetValues}
							removeAsset={removeAsset}
							updateAsset={updateAsset}
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
