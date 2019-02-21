import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';
import { Provider } from 'react-redux';

import HomeScreen from './screen/Home/HomeScreen';
import DetailProduct from './screen/Home/DetailProduct';
import CartScreen from './screen/Cart/CartScreen';
import ChatScreen from './screen/ChatScreen';
import PaymentScreen from './screen/Payment/PaymentScreen';
import InfoPayment from './screen/Payment/InfoPayment';
import CartCounter from './CartCounter';
import store from './public/redux/store';

const StackNavigator = createStackNavigator({
    Home: {
        screen: createBottomTabNavigator({
            Home: {
                screen: HomeScreen,
                navigationOptions: {
                    title: "Home"
                }
            },
            Chat: {
                screen: ChatScreen,
                navigationOptions: {
                    title: "Chat"
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
                    else if (routeName === "Chat") {
                        iconName = 'ios-chatbubbles';
                    }
                    return <Ionicons name={iconName} size={25} color={tintColor} />;
                }
            }),
            initialRouteName: 'Home',
            tabBarOptions: {
                activeTintColor: "#3f48cc",
                inactiveTintColor: "#787fec",
                labelStyle: {
                    fontSize: 12,
                }
            }
        }),
        navigationOptions: ({navigation}) => ({
            title: "Zona Gadget",
            headerStyle: {
                backgroundColor: '#3f48cc'
            },
            headerTintColor: '#fff',
            headerRight: (
                    <View style={{padding: 5}}>
                        <CartCounter />
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                            <Icon style={styles.myicon} name='cart'/>
                        </TouchableOpacity>
                    </View>
                )
          })
    },
    DetailProduct: {
        screen: DetailProduct,
        navigationOptions: ({navigation}) => ({
            title: "Detail Of Product",
            headerStyle: {
                backgroundColor: '#3f48cc',
            },
            headerTintColor: '#fff',
            headerRight: (
                <View style={{padding: 5}}>
                    <CartCounter />
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Icon style={styles.myicon} name='cart'/>
                    </TouchableOpacity>
                </View>
            )
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
    },
    Payment: {
        screen: PaymentScreen,
        navigationOptions: ({navigation}) => ({
            title: "Payment",
            headerStyle: {
                backgroundColor: '#3f48cc',
            },
            headerTintColor: '#fff',
            headerRight: (
                <View style={{padding: 5}}>
                    <CartCounter />
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Icon style={styles.myicon} name='cart'/>
                    </TouchableOpacity>
                </View>
            )
        })
    },
    InfoPayment: {
        screen: InfoPayment,
        navigationOptions: ({navigation}) => ({
            title: "Info Payment",
            headerStyle: {
                backgroundColor: '#3f48cc',
            },
            headerTintColor: '#fff'
        })
    }
})

const ChatStack = createStackNavigator({
    Chat: {
        screen: ChatScreen,
        navigationOptions: () => ({
            title: "Chat",
            headerStyle: {
                backgroundColor: '#3f48cc',
            },
            headerTintColor: '#fff'
        })
    }
})

const MainStack = createAppContainer(StackNavigator);

const styles = StyleSheet.create({
    myicon : {
        color: 'white',
        marginRight: 10,
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    }
})

export default class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <MainStack />
        </Provider>
      )
    }
  }