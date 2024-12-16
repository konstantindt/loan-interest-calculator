import {Box, Spacer, Text} from 'ink';
import React, {type PropsWithChildren} from 'react';

type AppContentProperties = {
	readonly topLabel?: string;
	readonly bottomLabel?: string;
};

export default function AppContent({
	topLabel,
	bottomLabel,
	children,
}: PropsWithChildren<AppContentProperties>) {
	return (
		<Box
			borderStyle="single"
			flexDirection={(topLabel ?? bottomLabel) ? 'column' : undefined}
			width="100%"
			height="100%"
			paddingTop={2}
			paddingBottom={2}
			paddingLeft={4}
			paddingRight={4}
		>
			{topLabel ? <Text>{topLabel}</Text> : null}
			{children}
			{bottomLabel ? <Spacer /> : null}
			{bottomLabel ? <Text>{bottomLabel}</Text> : null}
		</Box>
	);
}
