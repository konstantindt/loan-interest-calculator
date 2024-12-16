import React from 'react';
import {Box, Text} from 'ink';
import SelectInput from 'ink-select-input';
import {type Item} from '../../node_modules/ink-select-input/build/SelectInput.js';

type AppNavigationProperties = {
	readonly isFocused: boolean;
	readonly routes: Array<Item<any>>;
	readonly emptyRoutesLabel: string;
	readonly onSelect: (route: Item<any>) => void;
};

export default function AppNavigation({
	isFocused,
	routes,
	emptyRoutesLabel,
	onSelect,
}: AppNavigationProperties) {
	return (
		<Box paddingTop={1}>
			{routes.length > 0 ? (
				<SelectInput isFocused={isFocused} items={routes} onSelect={onSelect} />
			) : (
				<Text>{emptyRoutesLabel}</Text>
			)}
		</Box>
	);
}
