import {useWindowDimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Circle} from 'react-native-svg';
import useBtcData from '../../../../hooks/useBtcData/useBtcData';
import { appColors } from '../../../../utils/global';

const GraphDrawing = () => {
  const windowWidth = useWindowDimensions().width;

  /* The react-native-chart-kit library does not natively support the removal of padding or margins.  Therefore, padding is simulated by adjusting the chart's width, which must be dynamically calculated based on the library's internal layout. */
  const chartWidth = (() => {
    if (windowWidth > 1000) return windowWidth - 65
    if (windowWidth >= 800) return windowWidth - 75
    if (windowWidth >= 600) return windowWidth - 85

    return windowWidth - 95;
  })();

  const btcData = useBtcData();

  const dataItems = btcData.btcPrices?.map(btcItem => btcItem.priceInEur) || [];
  const data = {
    labels: [],
    datasets: [
      {
        data: dataItems,
        color: (opacity = 1) => appColors.darkBlue,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => appColors.darkBlue,
    propsForDots: {r: '0'},
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: 0,
    marginRight: 0,
    fillShadowGradientFrom: '#009688',
    fillShadowGradientFromOpacity: 0.25,
    fillShadowGradientToOffset: 0.9,
    fillShadowGradientTo: 'black',
    fillShadowGradientToOpacity: 0.0002,
  };

  const renderLastDot = ({
    x,
    y,
    index,
  }: {
    x: number;
    y: number;
    index: number;
  }) => {
    if (index === dataItems.length - 1) {
      return <Circle key={index} cx={x} cy={y} r={4} fill={appColors.darkBlue} />;
    }
  };

  return (
    <LineChart
      data={data}
      width={chartWidth}
      height={330}
      chartConfig={chartConfig}
      withInnerLines={false}
      withOuterLines={false}
      withHorizontalLabels={false}
      withVerticalLabels={false}
      yLabelsOffset={0}
      xLabelsOffset={0}
      style={{paddingRight: 0, paddingTop: 0}}
      renderDotContent={renderLastDot}
    />
  );
};

export default GraphDrawing;
