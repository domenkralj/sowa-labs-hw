import React from 'react';
import {StyleSheet, View} from 'react-native';
import BisonIcon from './comp/BisonIcon/BisonIcon';
import RightInfoData from './comp/RightInfoData/RightInfoData';

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
