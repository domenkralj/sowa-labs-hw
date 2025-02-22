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

/* Formats number in 69,820.12 */
export const formatCashNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
};
