import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import AppText from '../../../AppText/AppText';
import {max, round, min} from 'lodash';
import useBtcData from '../../../../hooks/useBtcData/useBtcData';
import {appColors} from '../../../../utils/utils';

const GraphLabels = () => {
  const btcData = useBtcData();

  const dataItems = btcData.btcPrices?.map(btcItem => btcItem.priceInEur) || [];
  const currentPriceValue = btcData.currentBtcPrice || 0;
  const weekAgoPriceValue = btcData.weekAgoBtcPrice || 0;
  const maxValue = max(dataItems) || 0;
  const minValue = min(dataItems) || 0;
  const minValueRounded = round(minValue, -2);

  const currentPriceLabelTopOffset =
    ((maxValue - currentPriceValue) / (maxValue - minValue)) * 246 - 8;
  const prevClosePriceLabelTopOffset =
    ((maxValue - weekAgoPriceValue) / (maxValue - minValue)) * 246 - 28;

  const regularLabelStep = round((maxValue - minValue) / 5, -2);

  return (
    <View style={styles.container}>
      <View style={styles.generalLabelsBox}>
        {[...Array(6)]
          .map((e, i) => (
            <AppText key={i} style={styles.generalLabelText}>
              {minValueRounded + regularLabelStep * i}
            </AppText>
          ))
          .reverse()}
      </View>
      <View style={styles.floatingLabelsBox}>
        <View
          style={[
            styles.floatingCurrentPriceLabelBox,
            {top: currentPriceLabelTopOffset},
          ]}>
          <AppText style={styles.floatingCurrentPriceLabelText}>
            {round(btcData.currentBtcPrice || 0, 0)}
          </AppText>
        </View>

        <View
          style={[
            styles.floatingPrevCloseBox,
            {top: prevClosePriceLabelTopOffset},
          ]}>
          <View style={styles.prevCloseDotsLine} />
          <AppText style={styles.prevCloseDescriptionText}>Prev close</AppText>
          <AppText style={styles.prevCloseValueText}>
            {round(weekAgoPriceValue, 0)}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  generalLabelsBox: {
    paddingRight: 6,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  generalLabelText: {
    fontSize: 12,
    fontWeight: 500,
    color: '#287979',
  },
  floatingLabelsBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 24,
    display: 'flex',
  },
  floatingCurrentPriceLabelBox: {
    display: 'flex',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  floatingCurrentPriceLabelText: {
    fontSize: 12,
    width: 'auto',
    textAlign: 'right',
    backgroundColor: '#287979',
    color: 'white',
    paddingInline: 6,
    paddingBlock: 2,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    fontWeight: 500,
  },
  floatingPrevCloseBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  prevCloseDotsLine: {
    borderStyle: 'dashed',
    borderBottomColor: appColors.graphGreen,
    borderBottomWidth: 1,
    flexGrow: 1,
  },
  prevCloseDescriptionText: {
    backgroundColor: appColors.graphGreen,
    paddingInline: 6,
    paddingBlock: 2,
    color: 'white',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    fontSize: 12,
  },
  prevCloseValueText: {
    backgroundColor: appColors.graphGreen,
    paddingInline: 6,
    paddingBlock: 2,
    color: 'white',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    fontSize: 12,
  },
});

export default GraphLabels;
