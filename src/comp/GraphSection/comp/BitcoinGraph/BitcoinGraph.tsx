import {Dimensions, StyleSheet, Text, View} from 'react-native';
import AppText from '../../../AppText/AppText';
import {LineChart} from 'react-native-chart-kit';
import {Circle} from 'react-native-svg';

const BitcoinGraph = () => {
  const dataItems = [
    97969, 100807, 98238, 93460, 92364, 92999, 94159, 91660, 98238, 98238,
  ];

  const data = {
    labels: [],
    datasets: [
      {
        data: dataItems,
        color: (opacity = 1) => `#287979`,
        strokeWidth: 2, // optional,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => '#287979',
    propsForDots: { r: '0' },
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: 0,
    marginRight: 0,
    fillShadowGradientFrom: '#009688', // Gradient color (same as line)
    fillShadowGradientFromOpacity: 0.2, // Adjust transparency (0 to 1)
    fillShadowGradientTo: '#009688',
    fillShadowGradientToOpacity: 0.0002,
  };

  return (
    <View style={styles.container}>
      <View style={styles.graphContainer}>
        <LineChart
          data={data}
          width={Dimensions.get('window').width - 50}
          height={305}
          chartConfig={chartConfig}
          withInnerLines={false}
          withOuterLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          yLabelsOffset={0}
          xLabelsOffset={0}
          style={{ paddingRight: 0}}
          renderDotContent={({x, y, index, indexData}) => {
            if (index === dataItems.length - 1)
              return (
                <Circle
                  cx={x}
                  cy={y}
                  r={4}
                  fill="#287979" // Choose your color for the dot
                />
              );
          }}
        />
      </View>
      <View style={styles.graphLabelsContainer}>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 250,
    paddingInline: 24
  },
  graphContainer: {
    position: 'absolute',
    top: 0,
    left: 24,
    right: 0,
    bottom: 0,
  },
  graphLabelsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 24,
    bottom: 0,
    display: 'flex',
    alignItems: 'flex-end'
  },
});

export default BitcoinGraph;
