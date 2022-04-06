import * as Yup from 'yup';

export const assetInputValidationSchema = Yup.object().shape({
	id: Yup.string().min(1, 'Too Short').max(15, 'Too Long').required('Required'),
	purchaseYear: Yup.number()
		.min(new Date().getFullYear(), 'Must be higher than current year')
		.max(2100, 'Purchase date too far away')
		.required('Required'),
	totalCost: Yup.number().positive('Must be positive').required('Required'),
	amountFinanced: Yup.number().positive('Must be positive').required('Required'),
	savingsUsed: Yup.number().min(0, 'Must be $0 or higher').required('Required'),
	financeTerm: Yup.number()
		.positive('Must be positive')
		.min(1, 'Minimum 1 year term')
		.max(50, 'Maximum 50 year term')
		.required('Required'),
	financeRate: Yup.number()
		.min(0, 'Minimum 0%')
		.max(99, 'Maximum 99%')
		.positive('Must be positive')
		.required('Required'),
	appreciationRate: Yup.number().min(0, 'Minimum 0%').max(99, 'Maximum 99%').required('Required'),
	cocReturn: Yup.number().min(-99, 'Minimum -99%').max(99, 'Maximum 99%').required('Required'),
	ownershipLength: Yup.number().min(1, 'Minimum 1 year ').max(99, 'Maximum 99 Years').positive('Must be positive'),
	salesPrice: Yup.number().when('ownershipLength', {
		is: (ownershipLength) => ownershipLength > 0,
		then: Yup.number()
			.min(0, 'Minimum $0')
			.positive('Must be positive')
			.required('Required if ownership length is set'),
	}),
});
