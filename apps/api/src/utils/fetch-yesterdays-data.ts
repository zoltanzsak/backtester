const BASE_URL =
  'https://pro-api.coinmarketcap.com/v4/dex/pairs/ohlcv/historical';

export const fetchYesterdaysData = async () => {
  const params = new URLSearchParams({
    symbol: 'BTC',
    time_period: 'daily',
    count: '1',
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
      Accept: 'application/json',
    } as HeadersInit,
  });

  if (!response.ok) {
    throw new Error(`CoinMarketCap API error: ${response.toString()}`);
  }

  return response.json();
};
