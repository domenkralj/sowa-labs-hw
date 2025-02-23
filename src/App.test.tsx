import {render} from '@testing-library/react-native';
import useAndroidBtcRetrieverModuleHandler from './hooks/useAndroidBtcRetrieverModuleHandler/useAndroidBtcRetrieverModuleHandler';
import useBtcData from './hooks/useBtcData/useBtcData';
import App from './App';
import {Platform} from 'react-native';
import renderer from 'react-test-renderer';

jest.mock('./comp/BisonIcon/BisonIcon', () => {
  const {View} = require('react-native');
  return () => <View testID="bison-icon-mock" />;
});

jest.mock('./comp/AppNotSupportedScreen/AppNotSupportedScreen', () => {
  const {View} = require('react-native');
  return () => <View testID="app-not-supported-screen-mock" />;
});

jest.mock('./comp/BtcLoadingErrorScreen/BtcLoadingErrorScreen', () => {
  const {View} = require('react-native');
  return () => <View testID="btc-loading-error-screen-mock" />;
});

jest.mock('./comp/LoadingSplashScreen/LoadingSplashScreen', () => {
  const {View} = require('react-native');
  return () => <View testID="loading-splash-screen-mock" />;
});

jest.mock('./comp/TopSection/TopSection', () => {
  const {View} = require('react-native');
  return () => <View testID="top-section-mock" />;
});

jest.mock('./comp/BitcoinPriceTextsSection/BitcoinPriceTextsSection', () => {
  const {View} = require('react-native');
  return () => <View testID="bitcoin-price-texts-section-mock" />;
});

jest.mock('./comp/BitcoinGraphSection/BitcoinGraphSection', () => {
  const {View} = require('react-native');
  return () => <View testID="bitcoin-graph-section-mock" />;
});

jest.mock('./comp/TradeSection/TradeSection', () => {
  const {View} = require('react-native');
  return () => <View testID="trade-section-mock" />;
});

jest.mock(
  './comp/PreviousTransactionsSection/PreviousTransactionsSection',
  () => {
    const {View} = require('react-native');
    return () => <View testID="previous-transactions-section-mock" />;
  },
);

jest.mock('./comp/AppProviders/AppProviders', () => {
  const {View} = require('react-native');

  interface MockAppProvidersProps {
    children: React.ReactNode;
  }

  const MockAppProviders: React.FC<MockAppProvidersProps> = ({children}) => (
    <View testID="app-providers-mock">{children}</View>
  );

  return MockAppProviders;
});

jest.mock('./comp/AppLayout/AppLayout', () => {
  const {View} = require('react-native');

  interface MockAppLayoutProps {
    children: React.ReactNode;
  }

  const MockAppProviders: React.FC<MockAppLayoutProps> = ({children}) => (
    <View testID="app-layout-mock">{children}</View>
  );

  return MockAppProviders;
});

jest.mock(
  './hooks/useAndroidBtcRetrieverModuleHandler/useAndroidBtcRetrieverModuleHandler',
  () => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock('./hooks/useBtcData/useBtcData', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  let platform = {
    OS: 'ios',
  };

  const select = jest.fn().mockImplementation(obj => {
    const value = obj[platform.OS];
    return !value ? obj.default : value;
  });

  // @ts-ignore
  platform.select = select;

  return platform;
});

describe('App component', () => {
  beforeEach(() => {
    Platform.OS = 'android';

    const mockBtcData = {
      error: false,
      setBtcPricesLoadingError: jest.fn(),
      btcPrices: [[Date.now(), 99123]],
      setBtcPrices: jest.fn(),
      currentBtcPrice: 99123,
      hourAgoBtcPrice: 78123,
    };

    (useBtcData as jest.Mock).mockImplementation(() => {
      return mockBtcData;
    });
  });

  it('should render content in AppProviders and AppLayout', () => {
    const {getByTestId} = render(<App />);

    expect(getByTestId('app-providers-mock')).toBeTruthy();
    expect(getByTestId('app-layout-mock')).toBeTruthy();
  });
  it('should render AppNotSupportedScreen if Platform.OS is not android otherwise show content', () => {
    Platform.OS = 'ios';

    const {getByTestId, queryByTestId, rerender} = render(<App />);

    expect(getByTestId('app-not-supported-screen-mock')).toBeTruthy();

    Platform.OS = 'windows';

    rerender(<App />);

    expect(getByTestId('app-not-supported-screen-mock')).toBeTruthy();

    Platform.OS = 'android';

    rerender(<App />);

    expect(queryByTestId('app-not-supported-screen-mock')).toBeNull();
    expect(getByTestId('top-section-mock')).toBeTruthy();
  });

  it('should call useAndroidBtcRetrieverModuleHandler', () => {
    render(<App />);

    expect(useAndroidBtcRetrieverModuleHandler).toHaveBeenCalled();
  });

  it('should show BtcLoadingErrorScreen if btcData is error', () => {
    const mockBtcData = {
      error: true,
      setBtcPricesLoadingError: jest.fn(),
      btcPrices: undefined,
      setBtcPrices: jest.fn(),
      currentBtcPrice: 99123,
      hourAgoBtcPrice: 78123,
    };

    (useBtcData as jest.Mock).mockImplementation(() => {
      return mockBtcData;
    });

    const {getByTestId} = render(<App />);

    expect(getByTestId('btc-loading-error-screen-mock')).toBeTruthy();
  });

  it('should show LoadingSplashScreen if btcData is not present and no error is present', () => {
    const mockBtcData = {
      error: false,
      setBtcPricesLoadingError: jest.fn(),
      btcPrices: undefined,
      setBtcPrices: jest.fn(),
      currentBtcPrice: 99123,
      hourAgoBtcPrice: 78123,
    };

    (useBtcData as jest.Mock).mockImplementation(() => {
      return mockBtcData;
    });

    const {getByTestId} = render(<App />);

    expect(getByTestId('loading-splash-screen-mock')).toBeTruthy();
  });

  it('should show app content if everything is loaded correctly', () => {
    const {getByTestId} = render(<App />);

    expect(getByTestId('top-section-mock')).toBeTruthy();
    expect(getByTestId('bitcoin-price-texts-section-mock')).toBeTruthy();
    expect(getByTestId('bitcoin-graph-section-mock')).toBeTruthy();
    expect(getByTestId('trade-section-mock')).toBeTruthy();
    expect(getByTestId('previous-transactions-section-mock')).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(<App />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
