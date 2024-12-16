# loan-interest-calculator

## Dependencies

Supports at least Node Iron. With [nvm](https://github.com/nvm-sh/nvm) e.g.

```bash
$ nvm install --lts=iron
$ nvm use --lts=iron
```

## Getting Started

```bash
$ git clone https://github.com/konstantindt/loan-interest-calculator
$ cd loan-interest-calculator/
$ npm install
$ npm run build && node dist/cli.js
```

## Framework

[React for interactive command-line apps](https://github.com/vadimdemedes/ink).

## Base tutorial

[Creating a terminal application with ink + React + Typescript — An introduction | by Christian Hansen | Medium](https://medium.com/@pixelreverb/creating-a-terminal-application-with-ink-react-typescript-an-introduction-da49f3c012a8)

## Formula sources

[Simple Interest Calculator A = P(1 + rt)](https://www.calculatorsoup.com/calculators/financial/simple-interest-plus-principal-calculator.php).

## Limitations

Not able to get tests to run:

* Running test command does not output any failing tests even though there are type errors in the [test.tsx](test.tsx)
* Not even unit tests for [utils](source/utils) worked for me
* I guess [create-ink-app](https://github.com/vadimdemedes/create-ink-app) template needs to be fixed

Not sure I understand the interest calculations that I need to deliver:

* Cannot find online simple interest formulas that include the margin (what is a margin?)
* Not clear if interest only accrues on working days only (date-fns does support calculating business days if needed)
* Not clear if leap years should taken into account as that changes the number of days in a year
* There's no mention of the late payment rules

Not using arbitrary precision numbers:

* Cannot be sure of rounding issues

Difficult to enter dates:

* Need to enter the delimiters manual
* No selection option

Missing form validation:

* Not checking if entering smallest denomination of currencies and percentages
* Not checking if date exists
* Not checking if period starts after the end

Missing CI/CD:

* No GitHub Actions to ensure tests are run, testing different node versions etc.
* No steps documented for deploying/installing application

Custom form components will be required to fix some of the issues above.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
