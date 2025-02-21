import { StyleSheet, TextInput } from "react-native";
import { MAX_TRADE_VALUE } from "../../../../../../utils/global";

interface INumberInputProps {
  value: number | undefined,
  onValueChange: (value: number | undefined) => void
}

const NumberInput = (props: INumberInputProps) => {

  const getNewValue = (newTextValue: string) => {

    const numericValue = newTextValue.replace(/[^0-9.,]/g, '');
    if (numericValue < 0) return 0
    if (numericValue > MAX_TRADE_VALUE) return MAX_TRADE_VALUE
    return numericValue
  }

  const handleChangeText = (newTextValue: string) => {
    props.onValueChange(getNewValue(newTextValue));
  };

  return (
    <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(props.value)}
        onChangeText={handleChangeText}
      />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: '#BABABA',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'right',
    width: '100%'
  }
});

export default NumberInput;
