import React from 'react';
import {Box, Text} from 'ink';
import BigText from 'ink-big-text';
import {differenceInCalendarDays, format, isBefore} from 'date-fns';
import {useLoans} from '../../../../contexts/loans/index.js';
import AppField from '../../../../layouts/field/index.js';
import formatCurrency from '../../../../utils/formats/currency/index.js';
import dailySimpleInterestForDays from '../../../../utils/calculations/daily-simple-interest-for-days.js';

type ViewLoanDetailsProperties = {
	readonly title: string;
	readonly loanId: string;
};

export default function ViewLoanDetails({
	title,
	loanId,
}: ViewLoanDetailsProperties) {
	const loans = useLoans();
	const loan = loans.find(loan => loan.id === loanId);

	if (!loan) {
		throw new Error(`Loan ${loanId} not found`);
	}

	const currentDate = format(Date.now(), 'yyyy-MM-dd');
	const accrualDate = isBefore(currentDate, loan.endDate)
		? currentDate
		: loan.endDate;
	const accrualDays = differenceInCalendarDays(accrualDate, loan.startDate);
	const dailyInterestAmount = dailySimpleInterestForDays(
		loan.amount,
		loan.baseInterestRate,
		1,
	);
	const dailyInterestAccrued = dailySimpleInterestForDays(
		loan.amount,
		loan.baseInterestRate,
		accrualDays,
	);
	const loanDays = differenceInCalendarDays(loan.endDate, loan.startDate);
	const totalInterest = dailySimpleInterestForDays(
		loan.amount,
		loan.baseInterestRate + loan.margin,
		loanDays,
	);

	return (
		<Box flexDirection="column">
			<BigText text={title} />
			<AppField label="Start Date" value={loan.startDate} />
			<AppField label="End Date" value={loan.endDate} />
			<AppField
				label="Amount"
				value={formatCurrency(loan.amount, loan.currency)}
			/>
			<AppField label="Currency" value={loan.currency} />
			<AppField
				label="Base Interest Rate"
				value={`${loan.baseInterestRate}%`}
			/>
			<AppField label="Margin" value={`${loan.margin}%`} />
			<Box borderStyle="single" justifyContent="center" marginBottom={1}>
				<Text>Interest</Text>
			</Box>
			<AppField
				label="Daily Interest Amount without margin"
				value={formatCurrency(dailyInterestAmount, loan.currency)}
			/>
			<AppField
				label="Daily Interest Amount Accrued"
				value={formatCurrency(dailyInterestAccrued, loan.currency)}
			/>
			<AppField label="Accrual Date" value={accrualDate} />
			<AppField
				label="Days elapsed since the Start Date"
				value={accrualDays.toString()}
			/>
			<AppField
				label="Total Interest"
				value={formatCurrency(totalInterest, loan.currency)}
			/>
		</Box>
	);
}
