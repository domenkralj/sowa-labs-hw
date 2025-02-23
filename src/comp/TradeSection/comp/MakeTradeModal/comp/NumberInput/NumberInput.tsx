import {StyleSheet, TextInput, View} from 'react-native';
import AppText from '../../../../../AppText/AppText';
import {appColors} from '../../../../../../utils/utils';
import React from 'react';

interface INumberInputProps {
  value: string;
  onChangeValue: (newValue: string) => void;
  label: string
}

const NumberInput = (props: INumberInputProps) => {
 
  const handleOnChangeText = (newValue: string) => {
    // Allow only numbers, '.' and ','
    if (/[^0-9.,]/.test(newValue)) {
      return;
    }
  
    // Prevent multiple decimal points
    if ((newValue.match(/\./g) || []).length > 1) {
      return;
    }

    // Handle empty input
    if (newValue === '') {
      props.onChangeValue('');
      return;
    }
  
    // Replace single '.' with '0.'
    if (newValue === '.') newValue = '0.';
  
    const clearedValue = newValue.replace(/,/g, '');
    const isDotAtEnd = newValue.endsWith('.')

    const wholePart = clearedValue.split(".")[0]
    const decimalPart = clearedValue.split(".")?.[1]

    // Format number with proper thousand separators
    const formattedWholeValue = Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(wholePart));

    let finalValue = decimalPart ? `${formattedWholeValue}.${decimalPart}` : formattedWholeValue
    finalValue = isDotAtEnd ? `${finalValue}.` : finalValue

    props.onChangeValue(finalValue);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={props.value}
        onChangeText={handleOnChangeText}
        placeholder="Enter amount"
        placeholderTextColor="#BABABA"
        cursorColor={appColors.bisonDarkBlue}
        contextMenuHidden={true}
      />
      <AppText style={styles.eurText}>{props.label}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingInline: 16,
    paddingBlock: 8,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  eurText: {
    fontWeight: 800,
    fontSize: 12,
    color: appColors.lightBlue,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#BABABA',
    paddingBottom: 8,
    fontSize: 16,
    textAlign: 'right',
    width: '100%',
    fontFamily: 'OpenSans-Regular',
    lineHeight: 21,
    color: 'black',
  },
});

export default NumberInput;
