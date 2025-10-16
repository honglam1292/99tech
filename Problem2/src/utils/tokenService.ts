import axios from 'axios';

const PRICE_URL = 'https://interview.switcheo.com/prices.json';

export const fetchTokenPrices = async () => {
  const res = await axios.get(PRICE_URL);
  return res.data;
};
