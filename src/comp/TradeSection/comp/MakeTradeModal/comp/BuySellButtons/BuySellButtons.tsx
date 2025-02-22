import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {appColors, ITradeItem} from '../../../../../../utils/utils';
import AppText from '../../../../../AppText/AppText';
import useTrades from '../../../../../../hooks/useTrades/useTrades';
import {useState} from 'react';
import {isNumber, round} from 'lodash';
import Toast from 'react-native-toast-message';

interface IBuySellButtonsProps {
  btcTradeValue: number | undefined;
  eurTradeValue: number | undefined;
  onSellOrBought: () => void
  onError: (error: string) => void;
}

const BuySellButtons = (props: IBuySellButtonsProps) => {
  const {currentEur, currentBtc, makeTrade} = useTrades();

  const ValidateFields = () => {
    if (!isNumber(props.eurTradeValue) || props.eurTradeValue! <= 0) {
      props.onError('Please enter EUR amount.');
      return false;
    }
    if (!isNumber(props.btcTradeValue) || props.btcTradeValue! <= 0) {
      props.onError('Please select BTC amount.');
      return false;
    }
    return true;
  };

  const onSell = () => {
    if (!ValidateFields()) return;

    if (props.btcTradeValue! > currentBtc) {
      props.onError('You do not have enough BTC on your account.');
      return;
    }

    makeTrade({
      timestamp: Date.now(),
      eurVolume: props.eurTradeValue!,
      btcVolume: props.btcTradeValue!,
      boughtBtc: false,
      isInitalTransaction: false
    });

    props.onSellOrBought()
    Toast.show({
      type: 'success',
      text1: 'Transaction Successful 🎉',
      text2: `You've successfully sold BTC worth ${round(props.btcTradeValue!, 6)}! 🚀`
    });
  };

  const onBuy = () => {
    if (!ValidateFields()) return;

    if (props.eurTradeValue! > currentEur) {
      props.onError('You do not have enough EUR on your account.');
      return;
    }

    makeTrade({
      timestamp: Date.now(),
      eurVolume: props.eurTradeValue!,
      btcVolume: props.btcTradeValue!,
      boughtBtc: true,
      isInitalTransaction: false
    });

    props.onSellOrBought()
    Toast.show({
      type: 'success',
      text1: 'Purchase Successful 🎉',
      text2: `You've successfully bought BTC worth ${round(props.btcTradeValue!, 6)}! 🚀`
    });
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        accessibilityLabel="Buy Bitcoin"
        onPress={onBuy}
        style={styles.buySellButton}>
        <AppText style={styles.buySellText}>Buy</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Sell bitcoin"
        onPress={onSell}
        style={styles.buySellButton}>
        <AppText style={styles.buySellText}>Sell</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%',
  },
  buySellButton: {
    flex: 1,
    backgroundColor: appColors.bisonDarkBlue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingBlock: 14,
  },
  buySellText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 16,
  },
});

export default BuySellButtons;
