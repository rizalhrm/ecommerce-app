import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
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
import LoginScreen from './screen/Login/LoginScreen';
import RegisterScreen from './screen/Login/RegisterScreen';
import ProfilScreen from './screen/Login/ProfilScreen';

import store from './public/redux/store';

const AppNavigator = createStackNavigator({
    Home: {
        screen: createBottomTabNavigator({
            Home: {
                screen: HomeScreen
            },
            Chat: {
                screen: ChatScreen,
                navigationOptions: () => ({
                    title : "Chat"
                })
            },
            Profile: {
                screen: ProfilScreen,
                navigationOptions: () => ({
                    headerMode: 'none'
                })
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
                    else if (routeName === "Profile") {
                        iconName = 'ios-contact';
                    }
                    return <Ionicons name={iconName} size={25} color={tintColor} />;
                }
            }),
            initialRouteName: 'Home',
            tabBarOptions: {
                activeTintColor: "#005a9a",
                inactiveTintColor: "#0086cb",
                labelStyle: {
                    fontSize: 12,
                }
            }
        }),
        navigationOptions: ({navigation}) => ({
            title: "Zona Gadget",
            headerStyle: {
                backgroundColor: '#0086cb'
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
                backgroundColor: '#0086cb',
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
                backgroundColor: '#0086cb',
            },
            headerTintColor: '#fff'
        })
    },
    Payment: {
        screen: PaymentScreen,
        navigationOptions: ({navigation}) => ({
            title: "Payment",
            headerStyle: {
                backgroundColor: '#0086cb',
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
        navigationOptions: () => ({
            title: "Info Payment",
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#0086cb',
            },
            headerTintColor: '#fff'
        })
    }
})

const LoginNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: () => ({
            title: "Register",
            headerStyle: {
                backgroundColor: '#44b6fd',
            },
            headerTintColor: '#fff'
        }),
    }
})

const MainStack = createAppContainer(createSwitchNavigator(
    {
        LoginNavigator: LoginNavigator,
        AppNavigator : AppNavigator
    },
    {
      initialRouteName: 'LoginNavigator'
    }
    
    )
)

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