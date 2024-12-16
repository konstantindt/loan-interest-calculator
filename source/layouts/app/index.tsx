import React, {type PropsWithChildren} from 'react';
import {Box} from 'ink';

export default function AppLayout({children}: PropsWithChildren) {
	return <Box>{children}</Box>;
}
