import { ReactNode } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";


export enum AppTextFontWeight {
  Light = "Light",
  Regular = "Regular",
  Medium = "Medium",
  SemiBold = "SemiBold",
  Bold = "Bold",
  ExtraBold = "ExtraBold"
}



interface AppTextProps extends TextProps {
    children: ReactNode;
    // weight: AppTextFontWeight
    style?: StyleProp<TextStyle>;
  }

/*
  Component which ovverrides default Text component
  Presets fontFamily
*/
const AppText: React.FC<AppTextProps> = ({ style, children, ...props }) => {
  return <Text {...props} style={[{ fontFamily: 'OpenSans-Bold', fontSize: 12 }, style]}>{children}</Text>;
};

export default AppText