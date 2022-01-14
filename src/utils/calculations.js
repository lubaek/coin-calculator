export const countBitcoin = (value, currency) => {
	return (Number(value) / Number(currency)).toFixed(5);
};

export const cointCurrency = (value, currency) => {
	return (Number(value) * Number(currency)).toFixed(5);
};
