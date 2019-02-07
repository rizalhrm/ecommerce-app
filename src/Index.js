import React, {Component} from 'react';
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon, Button, Text} from 'native-base';

import HomeScreen from './screen/Home/HomeScreen';
import DetailProduct from './screen/Home/DetailProduct';
import CartScreen from './screen/Cart/CartScreen';

const HomeStack = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: "Zona Gadget",
        headerStyle: {
            backgroundColor: '#3f48cc'
        },
        headerTintColor: '#fff',
        headerRight : (<Button transparent light style={{alignSelf: 'center'}}><Icon name='cart'/></Button>)
      })
    },
    DetailProduct: {
        screen: DetailProduct,
        navigationOptions: () => ({
            title: "Detail Product",
            headerStyle: {
                backgroundColor: '#3f48cc',
            },
            headerTintColor: '#fff'
      })
    },
    Cart: {
        screen: CartScreen,
        navigationOptions: () => ({
            title: "Shopping Cart",
            headerStyle: {
                backgroundColor: '#3f48cc',
            },
            headerTintColor: '#fff'
        })
    }
})

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
                    }
                    return <Ionicons name={iconName} size={25} color={tintColor} />;
                }
            }),
            shifting:true,
            initialRouteName: 'Home',
            tabBarOptions: {
                activeTintColor: "#3f48cc",
                inactiveTintColor: "#787fec"
            },
            barStyle: { backgroundColor: '#3f48cc'}
        }
    )
);

export default MainStack;