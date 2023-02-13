import { Icon, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';

type Props = {
  title?: string;
  onPress?: () => void;
};
const GoBackTopNavigation = ({ title, onPress }: Props) => {
  const theme = useTheme();

  return (
    <TopNavigation
      accessoryLeft={<TopNavigationAction icon={<Icon name="arrow-back" />} onPress={onPress} />}
      title={title}
      style={{ backgroundColor: theme['background-basic-color-2'], padding: 0 }}
    />
  );
};

export default GoBackTopNavigation;
