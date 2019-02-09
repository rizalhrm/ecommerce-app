import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {View, Text, Container, Content, List} from 'native-base';
import Swiper from 'react-native-swiper';

import ListItemProduct from './components/ListItemProduct';
import '../../data/data.js';

export default class HomeScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            product: products
        }
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
        <Container>
            <Content>
                <Swiper style={styles.wrapper} showsButtons={true} paginationStyle={{position:'absolute', top:250, right: 10, bottom: 15}} activeDotColor="#dd0057" autoplay={true}>
                    <View style={styles.slide}>
                        <Image style={{width:"50%", height:200, alignItems: 'center'}} source={{uri : "https://bit.ly/2GdJQRj"}} />
                        <Text style={styles.bestSeller}>Xiaomi 6A</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image style={{width:"50%", height:200, alignItems: 'center'}} source={{uri : "http://udah.pw/KgvcZ"}} />
                        <Text style={styles.bestSeller}>Samsung Galaxy A8 Plus</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image style={{width:"50%", height:200, alignItems: 'center'}} source={{uri : "https://bit.ly/2TyOjRF"}} />
                        <Text style={styles.bestSeller}>Vivo V11 Pro</Text>
                    </View>
                </Swiper>

                <View>
                    <Text style={{marginLeft: 12}}>Product List</Text>
                    <List>
                        {this.state.product.map((product, key) => <ListItemProduct key={key} product={product} navigate={navigate} />)}
                    </List>
                </View>


            </Content>
        </Container>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height:280
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bestSeller: {
        fontSize: 13,
        marginRight: 10
    }
})