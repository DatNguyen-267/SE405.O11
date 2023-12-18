import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../../constants/Colors';
import Home from '../../screens/home';
import Explore from '../../screens/explore';
import Create from '../../screens/create';
import Setting from '../../screens/setting';
import Connect from '../../screens/connect';
import Chains from '../../screens/chains';
import Author from '../../screens/author';
import Collection from '../../screens/collection';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

// ============================ CUSTOM STACK =====================================
const Stack = createNativeStackNavigator();
function SettingCustom() {
  return (
      <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name='Setting' component={Setting}></Stack.Screen>
          <Stack.Screen name='Connect Wallet' component={Connect}></Stack.Screen>
          <Stack.Screen name='Chains' component={Chains}></Stack.Screen>
          <Stack.Screen name='My Collection' component={Author}></Stack.Screen>
      </Stack.Navigator>

  );
}
function ExploreCustom() {
  return (
      <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name='Explore' component={Explore}></Stack.Screen>
          <Stack.Screen name='Collection' component={Collection}></Stack.Screen>
      </Stack.Navigator>

  );
}

// ========================== TAB ==============================
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Tab = createBottomTabNavigator();

const TabArr = [
  { name: 'PageHome', label: 'Home', activeIcon: 'home', component: Home  },
  { name: 'PageExplore', label: 'Explore', activeIcon: 'appstore-o', component: ExploreCustom },
  { name: 'Create', label: 'Create', activeIcon: 'form', component: Create },
  { name: 'Setting', label: 'Setting', activeIcon: 'setting', component: SettingCustom },
];

const TabButton = (props:any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 1.5 } });
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate({ 0: { scale: 1.5 }, 1: { scale: 1 } });
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={800}
        style={styles.container}>
        <AntDesign name={item.activeIcon} color={focused ? Colors.color_label_400 : Colors.color_grey_600} size={16} />
        <Animatable.Text
          ref={textRef}
          style={styles.text}
          >
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity >
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'fixed',
          bottom: 0,
        }
      }}>
      {/* <Tabs.Screen
        name="PageHome"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.name} component={item.component}
            options={{
              tabBarShowLabel: true,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 2,
    fontSize: 7,
    textAlign: 'center',
    color: Colors.color_label_400,
    fontWeight: '700',
    fontFamily: 'InterMedium',
  }
})