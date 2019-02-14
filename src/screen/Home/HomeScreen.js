import React from 'react';
import {Image, StyleSheet, FlatList} from 'react-native';
import {View, Text, Container, Content, Left, Right, List, ListItem, Button, Thumbnail, Body} from 'native-base';
import Swiper from 'react-native-swiper';
import axios from 'axios';

export default class HomeScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            data: []
          }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://192.168.0.26:3333/api/v1/products'
        })
        .then(res => {
            this.setState({
                data: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    _keyExtractor = (item, index) => item.id.toString();

    renderItem = ({ item, index }) => (
        <ListItem 
        thumbnail
        onPress={() => this.props.navigation.navigate('DetailProduct', {item})}
        >
            <Left>
                <Thumbnail square source={{ uri: item.image }} />
            </Left>
            <Body>
                <Text>{item.name}</Text>
                <Text style={{color: 'black', fontSize: 13}}>Rp {this.formatNumber(item.price)}</Text>
            </Body>
            <Right>
                <Button style={{height: 25}} primary onPress={() => this.props.navigation.navigate('DetailProduct', {item})}>
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
    )
    

    render(){
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

                <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
                    <View style={{ width: 10, height: 25, backgroundColor: "#4389f9" }}/>
                        <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}>
                                Products List
                        </Text>
                </View>
                <View>
                    <List>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.renderItem}
                        />
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