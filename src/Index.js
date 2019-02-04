import React, {Component} from 'react';
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screen/Home/HomeScreen';

const HomeStack = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: "Zona Gadget",
        headerStyle: {
            backgroundColor: '#787fec'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: "bold"
        }
      })
    }
  });
  

const MainStack = createAppContainer(
    createBottomTabNavigator(
        {
            Home: {
                screen: HomeStack,
                navigationOptions: {
                    title: "Home"
                }
            }
        },
        {
            defaultNavigationOptions: ({ navigation }) =>  ({
                tabBarIcon: ({ focused, tintColor }) => {
                    const { routeName } = navigation.state;
                    let iconName;
                    if (routeName === "Home") {
                        iconName = 'ios-home';
                    } else if (routeName === "Cart") {
                        iconName = 'md-cart';
                    }
                    return <Ionicons name={iconName} size={25} color={tintColor} />;
                }
            }),
            shifting:true,
            initialRouteName: 'Home',
            tabBarOptions: {
                showLabel: false,
                activeTintColor: "#3f48cc",
                inactiveTintColor: "#787fec"
            }
        }
    )
);

export default MainStack;