import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <SafeAreaView style={styles.mainSafeAreaView}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        style={styles.mainScrollView}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.mainView}>
          <View style={styles.toastBox}>
            <Toast/>
          </View>
          {props.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainSafeAreaView: {
    backgroundColor: Colors.white,
  },
  mainScrollView: {
    height: '100%',
  },
  mainView: {
    backgroundColor: Colors.white,
    minHeight: '100%',
  },
  toastBox: {
    zIndex: 1000000,
  },
});

export default AppLayout;
