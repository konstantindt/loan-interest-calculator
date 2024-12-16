import React, {
	createContext,
	type Dispatch,
	type PropsWithChildren,
	useContext,
	useReducer,
} from 'react';
import {v4 as uuidv4} from 'uuid';

export type Loan = {
	id: string;
	startDate: string;
	endDate: string;
	amount: number;
	currency: string;
	baseInterestRate: number;
	margin: number;
};

type LoanAction =
	| {type: 'added'; loan: Omit<Loan, 'id'>}
	| {type: 'changed'; loan: Loan};

const LoansContext = createContext<Loan[]>([]);
const LoansDispatchContext = createContext({} as Dispatch<LoanAction>);

export function LoansProvider({children}: PropsWithChildren) {
	const [loans, dispatch] = useReducer(loansReducer, []);

	return (
		<LoansContext.Provider value={loans}>
			<LoansDispatchContext.Provider value={dispatch}>
				{children}
			</LoansDispatchContext.Provider>
		</LoansContext.Provider>
	);
}

export function useLoans() {
	return useContext(LoansContext);
}

export function useLoansDispatch() {
	return useContext(LoansDispatchContext);
}

function loansReducer(loans: Loan[], action: LoanAction): Loan[] {
	switch (action.type) {
		case 'added': {
			return [
				...loans,
				{
					id: uuidv4(),
					...action.loan,
				},
			];
		}

		case 'changed': {
			return loans.map(loan => {
				if (loan.id === action.loan.id) {
					return {...action.loan};
				}

				return loan;
			});
		}
	}
}
