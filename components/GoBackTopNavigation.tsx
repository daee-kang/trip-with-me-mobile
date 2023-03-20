import { Icon, Text, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';

import { TextStyle } from '../styles';

type Props = {
  title?: string;
  onPress?: () => void;
  accessoryRight?: React.ReactNode;
};
const GoBackTopNavigation = ({ title, onPress, accessoryRight }: Props) => {
  const theme = useTheme();

  return (
    <TopNavigation
      accessoryLeft={
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row' }}>
          <TopNavigationAction icon={<Icon name="arrow-back" />} onPress={onPress} />
          <View style={{ justifyContent: 'center' }}>
            <Text category={TextStyle.s1}>{title}</Text>
          </View>
        </TouchableOpacity>
      }
      accessoryRight={accessoryRight ? <View>{accessoryRight}</View> : undefined}
      style={{ backgroundColor: theme['background-basic-color-2'], padding: 0 }}
    />
  );
};

export default GoBackTopNavigation;
