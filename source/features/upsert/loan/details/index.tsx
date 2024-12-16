import React from 'react';
import {Box} from 'ink';
import {Form} from 'ink-form';
import {
	type Loan,
	useLoans,
	useLoansDispatch,
} from '../../../../contexts/loans/index.js';
import {dateRegex} from '../../../../utils/validations/date/index.js';
import {currencyRegex} from '../../../../utils/validations/currency/index.js';

type UpsertLoanDetailsProperties = {
	readonly title: string;
	readonly loanId?: string;
	readonly onFinished: () => void;
};

export default function UpsertLoanDetails({
	title,
	loanId,
	onFinished,
}: UpsertLoanDetailsProperties) {
	const loans = useLoans();
	const dispatch = useLoansDispatch();
	const loan = loanId ? loans.find(loan => loan.id === loanId) : undefined;

	if (loanId && !loan) {
		throw new Error(`Loan ${loanId} not found`);
	}

	return (
		<Box paddingTop={1}>
			<Form
				form={{
					title,
					sections: [
						{
							title: 'Period',
							fields: [
								{
									type: 'string',
									name: 'startDate',
									label: 'Start Date',
									regex: dateRegex,
									required: true,
									initialValue: loan?.startDate,
								},
								{
									type: 'string',
									name: 'endDate',
									label: 'End Date',
									regex: dateRegex,
									required: true,
									initialValue: loan?.startDate,
								},
							],
						},
						{
							title: 'Amount',
							fields: [
								{
									type: 'float',
									name: 'amount',
									label: 'Amount',
									required: true,
									initialValue: loan?.amount,
								},
								{
									type: 'string',
									name: 'currency',
									label: 'Currency',
									regex: currencyRegex,
									required: true,
									initialValue: loan?.currency,
								},
							],
						},
						{
							title: 'Total Interest Rate',
							fields: [
								{
									type: 'float',
									name: 'baseInterestRate',
									label: 'Base Interest Rate',
									required: true,
									initialValue: loan?.baseInterestRate,
								},
								{
									type: 'float',
									name: 'margin',
									label: 'Margin',
									required: true,
									initialValue: loan?.margin,
								},
							],
						},
					],
				}}
				onSubmit={value => {
					if (loanId) {
						dispatch({
							type: 'changed',
							loan: {
								id: loanId,
								...(value as Omit<Loan, 'id'>),
							},
						});
					} else {
						dispatch({
							type: 'added',
							loan: {
								...(value as Omit<Loan, 'id'>),
							},
						});
					}

					onFinished();
				}}
			/>
		</Box>
	);
}
