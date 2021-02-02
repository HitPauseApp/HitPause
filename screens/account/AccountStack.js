import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountSummary from './AccountSummary';
import AccountTraits from './AccountTraits';

export default function AccountStackScreen() {
  const AccountStack = createStackNavigator();
  return (
    <AccountStack.Navigator
      headerMode="none"
      initialRouteName="Summary"
    >
      <AccountStack.Screen
        name="Summary"
        component={AccountSummary}
      />
      <AccountStack.Screen
        name="Traits"
        component={AccountTraits}
      />
    </AccountStack.Navigator>
  )
}