import {ReactNode} from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';

export enum AppTextFontWeight {
  Light = 'Light',
  Regular = 'Regular',
  Medium = 'Medium',
  SemiBold = 'SemiBold',
  Bold = 'Bold',
  ExtraBold = 'ExtraBold',
}

interface IAppTextProps extends TextProps {
  children: ReactNode;
  // weight: AppTextFontWeight
  style?: StyleProp<TextStyle>;
}

/*
  Component which ovverrides default Text component
  Presets fontFamily
*/
const AppText: React.FC<IAppTextProps> = ({style, children, ...props}) => {
  const flattenedStyle = style
    ? Array.isArray(style)
      ? Object.assign({}, ...style)
      : style
    : {};
  const fontWeight = flattenedStyle.fontWeight;

  const getFontFamilyStyleProperty = () => {
    switch (String(fontWeight)) {
      case '100':
      case '200':
      case '300':
      case 'light':
        return 'OpenSans-Light';
      case '400':
        return 'OpenSans-Regular';
      case '500':
        return 'OpenSans-Medium';
      case '600':
        return 'OpenSans-SemiBold';
      case '700':
      case 'bold':
        return 'OpenSans-Bold';
      case '800':
      case '900':
        return 'OpenSans-ExtraBold';
      default:
        return 'OpenSans-Regular';
    }
  };

  const fontStyles = [
    {...flattenedStyle, fontWeight: undefined},
    {fontFamily: getFontFamilyStyleProperty()},
  ];

  return (
    <Text {...props} style={fontStyles}>
      {children}
    </Text>
  );
};

export default AppText;
