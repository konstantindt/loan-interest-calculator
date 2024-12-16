/* eslint-disable unicorn/no-negated-condition */
import React, {useMemo, useState} from 'react';
import {useInput} from 'ink';
import {type Item} from '../../../node_modules/ink-select-input/build/SelectInput.js';
import AppLayout from '../../layouts/app/index.js';
import AppSideBar from '../../layouts/sidebar/index.js';
import AppContent from '../../layouts/content/index.js';
import AppNavigation from '../../navigations/index.js';
import {useLoans} from '../../contexts/loans/index.js';
import ViewWelcomeDetails from '../view/welcome/details/index.js';
import ViewLoanDetails from '../view/loan/details/index.js';
import UpsertLoanDetails from '../upsert/loan/details/index.js';

export default function Calculator() {
	const loans = useLoans();
	const routes = loans.map((loan, index) => ({
		label: `Loan ${index + 1}`,
		value: loan.id,
	}));
	const [selectedRoute, setSelectedRoute] = useState<Item<string>>();
	const [upserting, setUpserting] = useState(false);

	useInput((input, key) => {
		if (upserting) {
			if (key.pageDown) {
				setUpserting(false);
			}

			return;
		}

		if (selectedRoute && key.leftArrow) {
			setSelectedRoute(undefined);

			return;
		}

		if (input === 'i' || input === 'u') {
			setUpserting(true);
		}
	});

	const topLabel = useMemo(() => {
		if (selectedRoute && !upserting) {
			return 'Close <left-arrow>';
		}

		if (upserting) {
			return 'Discard <page-down>';
		}

		return undefined;
	}, [selectedRoute, upserting]);

	return (
		<AppLayout>
			<AppSideBar
				topLabel="Quit <ctrl+c>"
				bottomLabel={!upserting ? 'Insert <i>' : undefined}
			>
				<AppNavigation
					isFocused={!upserting}
					routes={routes}
					emptyRoutesLabel="No loans found"
					onSelect={setSelectedRoute}
				/>
			</AppSideBar>
			<AppContent
				topLabel={topLabel}
				bottomLabel={selectedRoute && !upserting ? 'Update <u>' : undefined}
			>
				{!selectedRoute && !upserting ? (
					<ViewWelcomeDetails hasContent={loans.length > 0} />
				) : null}
				{selectedRoute && !upserting ? (
					<ViewLoanDetails
						title={selectedRoute.label}
						loanId={selectedRoute.value}
					/>
				) : null}
				{upserting ? (
					<UpsertLoanDetails
						title={selectedRoute?.label ?? `Inserting Loan ${loans.length + 1}`}
						loanId={selectedRoute?.value}
						onFinished={() => {
							setUpserting(false);
						}}
					/>
				) : null}
			</AppContent>
		</AppLayout>
	);
}
