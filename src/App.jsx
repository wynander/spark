import React from 'react';
import { Button, Container, Image, Menu, Segment } from 'semantic-ui-react';
import AddAssetModal from './components/addAssetModal';
import PlotContainer from './components/plotContainer';
import UserInputFieldsAdvanced from './components/userInputFieldsAdvanced';
import AssetList from './components/AssetList'
import myImg from './logo.png';
import './styles.css';

export default function App() {
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

	const removeAsset = (data) => {
		let temp = [...assetValues];
		temp.splice(
			temp.findIndex((assetNum) => assetNum.id === data),
			1
		);
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
							handleInputChange={handleInputChange} //It would be great to make these props an object to be passed
							handleClickSalary={handleClickSalary}
							handleClickAge={handleClickAge}
							userInput={userInput}
						/>
						<AddAssetModal handleSubmit={handleSubmit} />
						<AssetList/>
						{
							assetValues.length > 0 && <Button>Show Assets</Button>
							// assetValues.map((assetNum, index) => (
							// 	<Button key={assetNum.id} onClick={() => removeAsset(assetNum.id)} animated="vertical">
							// 		<Button.Content visible>{assetNum.id}</Button.Content>
							// 		<Button.Content hidden>
							// 			<Icon name="delete" />
							// 		</Button.Content>
							// 	</Button>
							// ))
						}
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
