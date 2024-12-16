import React from 'react';
import {Box, Text} from 'ink';

type AppFieldProperties = {
	readonly label: string;
	readonly value: string;
};

export default function AppField({label, value}: AppFieldProperties) {
	return (
		<Box justifyContent="space-between" columnGap={1} paddingBottom={1}>
			<Text>{label}</Text>
			<Text>{value}</Text>
		</Box>
	);
}
