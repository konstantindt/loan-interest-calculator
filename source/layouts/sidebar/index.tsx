import React, {type PropsWithChildren} from 'react';
import {Box, Spacer, Text} from 'ink';

type AppSideBarProperties = {
	readonly topLabel?: string;
	readonly bottomLabel?: string;
};

export default function AppSideBar({
	topLabel,
	bottomLabel,
	children,
}: PropsWithChildren<AppSideBarProperties>) {
	return (
		<Box
			borderStyle="single"
			flexDirection={(topLabel ?? bottomLabel) ? 'column' : undefined}
			width={40}
			height="100%"
			paddingTop={1}
			paddingBottom={1}
			paddingLeft={2}
			paddingRight={2}
		>
			{topLabel ? <Text>{topLabel}</Text> : null}
			{children}
			{bottomLabel ? <Spacer /> : null}
			{bottomLabel ? <Text>{bottomLabel}</Text> : null}
		</Box>
	);
}
