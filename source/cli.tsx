#!/usr/bin/env node
import React from 'react';
import {withFullScreen} from 'fullscreen-ink';
import meow from 'meow';
import App from './app.js';

meow(
	`
	Usage
	  $ loan-interest-calculator
`,
	{
		importMeta: import.meta,
	},
);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
withFullScreen(<App />).start();
