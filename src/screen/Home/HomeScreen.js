import React from 'react';
import { Image, StyleSheet, FlatList, View, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Card, Text, Left, Right, List, CardItem, Button, Thumbnail, Body} from 'native-base';
import Swiper from 'react-native-swiper';
import StarRating from "react-native-star-rating";
import Spinner from 'react-native-loading-spinner-overlay';
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
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    handleNavigateDetail (item) {
        this.props.dispatch(saveProductDetail(item))
        this.props.navigation.navigate('DetailProduct')
    }

    _keyExtractor = (item, index) => item.id.toString();

    renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback onPress={()=> this.handleNavigateDetail(item.id)}>
        <Card style={{marginRight: 8, marginLeft:8 , borderRadius: 8}}>
        <CardItem>
            <Left>
                <Thumbnail square large style={{width: 100, height: 100, marginTop: 5, marginBottom: 5}} source={{ uri: item.image }} />
            </Left>
            <Body style={{alignItems: "flex-start", alignSelf: "center"}}>
                <Text style={{fontSize: 18}} numberOfLines={1}>{item.name}</Text>
                <Text style={{fontSize: 15}}>Rp {this.formatNumber(item.price)}</Text>
                <StarRating
                      disabled={true}
                      maxStars={5}
                      starSize={15}
                      emptyStar={"ios-star"}
                      fullStar={"ios-star"}
                      halfStar={"ios-star-half"}
                      iconSet={"Ionicons"}
                      fullStarColor={"#ff7919"}
                      emptyStarColor={"grey"}
                      rating={item.rating}
                    />
            </Body>
            <Right>
                <Button style={{height: 30, backgroundColor: '#3f48cc'}} primary onPress={()=> this.handleNavigateDetail(item.id)}>
                    <Text>View</Text>
                </Button>
            </Right>
        </CardItem>
        </Card>
        </TouchableWithoutFeedback>
    )
    
    render(){
        console.log(this.props.products)
        return (
        <Container>
            <Spinner
                    visible={this.props.products.isLoading}
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
            />
            <Content>
                <Swiper autoplay={true} style={styles.wrapper} paginationStyle={{position:'absolute', top:300, right: 10, bottom: 15}} activeDotColor="#dd0057">
                    <View style={styles.slide}>
                        <Image style={{width:"100%", height:300, alignItems: 'center'}} source={{uri : "https://www.wallpaperup.com/uploads/wallpapers/2015/04/04/655988/d0c1f4c962257bf0cbd00ba015724803-700.jpg"}} />
                    </View>
                    <View style={styles.slide}>
                        <Image style={{width:"100%", height:300, alignItems: 'center'}} source={{uri : "http://www.ubuntu-ast.org/largeimages/56/569081_pixel-3d-wallpaper.jpg"}} />
                    </View>
                    <View style={styles.slide}>
                        <Image style={{width:"100%", height:300, alignItems: 'center'}} source={{uri : "https://bit.ly/2X8rMNH"}} />
                    </View>
                </Swiper>

                <View style={{ flex: 1, flexDirection: "row", marginBottom: 10, marginLeft:10, marginTop: -10 }}>
                    <View style={{ width: 10, height: 25, backgroundColor: "#3f48cc" }}/>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 5 }}>
                                Products List
                        </Text>
                </View>
                <View style={{flex: 1}}>
                        <FlatList
                            data={this.props.products.results.data}
                            renderItem={this.renderItem}
                            keyExtractor={this._keyExtractor}
                        />
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
        height:380,
        marginTop : -40
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bestSeller: {
        fontSize: 13,
        marginRight: 10
    },
    spinnerTextStyle: {
        color: '#fff'
    }
})