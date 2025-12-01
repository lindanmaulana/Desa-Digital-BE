import { Decimal } from "@prisma/client/runtime/library";

export const formatCurrencyToIdr = (amount: Decimal) => {
	const amountStr = amount.toString();
	const amountNum = parseFloat(amountStr);

	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(amountNum);
};
