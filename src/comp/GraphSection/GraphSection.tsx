import {StyleSheet, View} from 'react-native';
import TopBitcoinPriceTexts from './comp/TopBitcoinPriceTexts/TopBitcoinPriceTexts';
import BitcoinGraph from './comp/BitcoinGraph/BitcoinGraph';

const GraphSection = () => {
  return (
    <View style={styles.container}>
      <TopBitcoinPriceTexts />
      <BitcoinGraph />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingBlock: 22
  },
});

export default GraphSection