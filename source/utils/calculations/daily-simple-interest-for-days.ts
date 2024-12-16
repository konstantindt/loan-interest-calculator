export default function dailySimpleInterestForDays(
	amount: number,
	interest: number,
	days: number,
) {
	const years = days / 365;
	const amountAccrued = amount * (1 + (interest / 100) * years);

	return amountAccrued - amount;
}
