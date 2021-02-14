import * as React from 'react';
import {View} from 'react-native';
import { Switch } from 'react-native-paper';

export default function QuizReminder() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View>
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    </View>
  );
}