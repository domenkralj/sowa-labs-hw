import {TouchableHighlight} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface CloseModalButtonProps {
  onPress: () => void;
}

const CloseModalButton = (props: CloseModalButtonProps) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
          fill="black"
        />
      </Svg>
    </TouchableHighlight>
  );
};

export default CloseModalButton;
