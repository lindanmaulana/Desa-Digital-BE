"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrencyToIdr = void 0;
const formatCurrencyToIdr = (amount) => {
    const amountStr = amount.toString();
    const amountNum = parseFloat(amountStr);
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amountNum);
};
exports.formatCurrencyToIdr = formatCurrencyToIdr;
//# sourceMappingURL=formatCurrency.js.map