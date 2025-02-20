import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import RightInfoData from './comp/RightInfoData/RightInfoData';
import BisonIcon from '../BisonIcon/BisonIcon';

const TopSection = () => {
  return (
    <View style={styles.container}>
      <BisonIcon />
      <RightInfoData />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    width: "100%",
    height: 60,
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: 26
  },
});

export default TopSection;
