export const appColors = {
  white: '#FFFFFF',
  bisonDarkBlue: '#153243',
  darkBlue: '#287979',
  graphGreen: '#3FBEBE',
  lightGreen: '#00BF13',
  lightGray: '#F3F3F3',
  lightBlue: '#74CDDC',
  lightRed: '#FEEEEE'
};

export const MAX_TRADE_VALUE = 10 ** 5;

export interface IBtcPriceValueItem {
  priceInEur: number;
  timestamp: number;
}

export interface ITradeItem {
  eurVolume: number;
  btcVolume: number;
  boughtBtc: boolean;
  timestamp: number;
  isInitalTransaction: boolean
}

/* Formats number in 69,820.12 */
export const formatCashNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
};

/* Formats time in 11:12:03 */
export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
}

export const STARTING_EUR_VALUE = 10000