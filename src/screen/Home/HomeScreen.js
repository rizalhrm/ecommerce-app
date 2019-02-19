import React from 'react';
import { Image, StyleSheet, FlatList, View } from 'react-native';
import { Container, Content, Text, Left, Right, List, ListItem, Button, Thumbnail, Body} from 'native-base';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { getProducts, saveProductDetail } from '../../public/redux/actions/products';

class HomeScreen extends React.Component {

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.props.dispatch(getProducts());
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    handleNavigateDetail (item) {
        this.props.dispatch(saveProductDetail(item))
        this.props.navigation.navigate('DetailProduct')
    }

    _keyExtractor = (item, index) => item.id.toString();

    renderItem = ({ item, index }) => (
        <ListItem 
        thumbnail
        onPress={()=> this.handleNavigateDetail(item.id)}
        >
            <Left>
                <Thumbnail square source={{ uri: item.image }} />
            </Left>
            <Body>
                <Text>{item.name}</Text>
                <Text style={{color: 'black', fontSize: 13}}>Rp {this.formatNumber(item.price)}</Text>
            </Body>
            <Right>
                <Button style={{height: 25}} primary onPress={()=> this.handleNavigateDetail(item.id)}>
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
    )
    
    render(){
        console.log(this.props.products)
        return (
        <Container>
            <Content>
                <Swiper style={styles.wrapper} showsButtons={true} paginationStyle={{position:'absolute', top:250, right: 10, bottom: 15}} activeDotColor="#dd0057" autoplay={true}>
                    <View style={styles.slide}>
                        <Image style={{width:"50%", height:200, alignItems: 'center'}} source={{uri : "https://www.t-mobile.com/content/dam/t-mobile/en-p/cell-phones/apple/apple-iphone-x/silver/Apple-iPhoneX-Silver-1-3x.jpg"}} />
                        <Text style={styles.bestSeller}>iPhone X</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image style={{width:"50%", height:200, alignItems: 'center'}} source={{uri : "https://www.hargahpsamsung.com/wp-content/uploads/2018/02/Samsung-Galaxy-A8-Plus-.jpg"}} />
                        <Text style={styles.bestSeller}>Samsung Galaxy A8 Plus</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image style={{width:"50%", height:200, alignItems: 'center'}} source={{uri : "https://www.planetofmobile.com/wp-content/uploads/2018/09/044-1-600x600.jpg"}} />
                        <Text style={styles.bestSeller}>Vivo V11 Pro</Text>
                    </View>
                </Swiper>

                <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
                    <View style={{ width: 10, height: 25, backgroundColor: "#4389f9" }}/>
                        <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}>
                                Products List
                        </Text>
                </View>
                <View style={{flex: 1}}>
                    <List>
                        <FlatList
                            data={this.props.products.results.data}
                            renderItem={this.renderItem}
                            keyExtractor={this._keyExtractor}
                            refreshing={this.props.products.isLoading}
                            onRefresh={this.getData}
                        />
                    </List>
                </View>
            
            </Content>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      products: state.products
    }
  }

export default connect(mapStateToProps)(HomeScreen)

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