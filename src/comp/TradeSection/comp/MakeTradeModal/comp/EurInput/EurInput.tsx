import {StyleSheet, TextInput, View} from 'react-native';
import AppText from '../../../../../AppText/AppText';
import {appColors} from '../../../../../../utils/global';
import React from 'react';

interface IEurInputProps {
  value: string;
  onChangeValue: (newValue: string) => void;
  onBlur: () => void;
  isError: boolean;
}

const EurInput = (props: IEurInputProps) => {
  return (
    <View
      style={[
        styles.container,
        props.isError ? {backgroundColor: appColors.lightRed} : {},
      ]}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={props.value}
        onChangeText={props.onChangeValue}
        onBlur={props.onBlur}
        placeholder='Enter amount'
      />
      <AppText style={styles.eurText}>EUR</AppText>
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

export default EurInput;
