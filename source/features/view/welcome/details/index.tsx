import React from 'react';
import {Text} from 'ink';

type ViewWelcomeDetailsProperties = {
	readonly hasContent: boolean;
};

export default function ViewWelcomeDetails({
	hasContent,
}: ViewWelcomeDetailsProperties) {
	return hasContent ? (
		<Text>
			Select {'<enter>'} or insert {'<i>'} a loan to start...
		</Text>
	) : (
		<Text>Insert {'<i>'} a loan to start...</Text>
	);
}
