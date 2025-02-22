import {StyleSheet, View} from 'react-native';
import AppText from '../../../../../AppText/AppText';
import { appColors } from '../../../../../../utils/global';

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage = (props: IErrorMessageProps) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>❗ {props.message} ❗</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    width: 'auto',
    backgroundColor: appColors.lightRed,
    borderRadius: 4,
    padding: 12,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 500,
  },
});

export default ErrorMessage;
