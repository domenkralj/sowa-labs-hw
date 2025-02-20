import { StyleSheet, View } from "react-native";
import AppText from "../../../AppText/AppText";

const PreviousTransaction = () => {

  return (
    <View style={styles.mainContainer}>
      <AppText style={styles.descriptionText}>Buy</AppText>
      <AppText style={styles.mainText}>+0.0031 BTC / -50.23 €</AppText>
      <AppText>12:58:58</AppText>
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  mainText: {
    fontSize: 12,
    fontWeight: 600
  },
  descriptionText: {
    fontSize: 12
  }
});

export default PreviousTransaction;
