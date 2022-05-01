import PRICES from "./PRICES";

const PRICESARR = [];

for (let key in PRICES) {
	PRICESARR.push({ ingridient: key, price: PRICES[key] });
}

export default PRICESARR;
