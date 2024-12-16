import React from 'react';
import {LoansProvider} from './contexts/loans/index.js';
import Calculator from './features/calculator/index.js';

export default function App() {
	return (
		<LoansProvider>
			<Calculator />
		</LoansProvider>
	);
}
