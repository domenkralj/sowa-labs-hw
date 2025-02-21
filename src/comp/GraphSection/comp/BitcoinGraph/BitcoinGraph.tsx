import {
  StyleSheet,
  View
} from 'react-native';
import GraphLabels from './comp/GraphLabels/GraphLabels';
import GraphDrawing from './comp/GraphDrawing/GraphDrawing';

const BitcoinGraph = () => {
  return (
    <View style={styles.container}>
      <View style={styles.graphContainer}>
        <GraphDrawing />
      </View>
      <View style={styles.graphLabelsContainer}>
        <GraphLabels />
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
    paddingInline: 24,
  },
  graphContainer: {
    position: 'absolute',
    top: 0,
    left: 24,
    right: 0,
    bottom: 0
  },
  graphLabelsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 24,
    bottom: 0,
    display: 'flex',
  },
});

export default BitcoinGraph;
