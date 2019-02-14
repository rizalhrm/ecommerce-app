import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, Icon} from 'native-base';

import HomeScreen from './screen/Home/HomeScreen';
import DetailProduct from './screen/Home/DetailProduct';
import CartScreen from './screen/Cart/CartScreen';
import ChatScreen from './screen/ChatScreen';
import PaymentScreen from './screen/Payment/PaymentScreen';
import InfoPayment from './screen/Payment/InfoPayment';

state = {
    totalitemcart: []
}

const HomeStack = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        title: "Zona Gadget",
        headerStyle: {
            backgroundColor: '#3f48cc'
        },
        headerTintColor: '#fff',
        headerRight: (
            <View style={{padding: 5}}>
            <View style={{position: 'absolute', height: 20, width: 20, borderRadius: 10, backgroundColor: 'rgba(95, 197, 123, 0.8)', right: 15, bottom: 20, marginRight: 10, alignItems: 'center', justifyContent: 'center', zIndex: 2000}}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.totalitemcart.length}</Text>
            </View>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Icon style={{color: 'white', marginRight: 10, alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} name='cart'/>
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
                <View style={{position: 'absolute', height: 20, width: 20, borderRadius: 10, backgroundColor: 'rgba(95, 197, 123, 0.8)', right: 15, bottom: 20, marginRight: 10, alignItems: 'center', justifyContent: 'center', zIndex: 2000}}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.totalitemcart.length}</Text>
                </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Icon style={{color: 'white', marginRight: 10, alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} name='cart'/>
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
                <View style={{position: 'absolute', height: 20, width: 20, borderRadius: 10, backgroundColor: 'rgba(95, 197, 123, 0.8)', right: 15, bottom: 20, marginRight: 10, alignItems: 'center', justifyContent: 'center', zIndex: 2000}}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.totalitemcart.length}</Text>
                </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Icon style={{color: 'white', marginRight: 10, alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} name='cart'/>
                    </TouchableOpacity>
                </View>
            )
        })
    },
    InfoPayment: {
        screen: InfoPayment,
        navigationOptions: () => ({
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

const MainStack = createAppContainer(
    createBottomTabNavigator(
        {
            Home: {
                screen: HomeStack,
                navigationOptions: {
                    title: "Home"
                }
            },
            Chat: {
                screen: ChatStack,
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