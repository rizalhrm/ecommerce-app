import React from 'react';
import { Image, StyleSheet, FlatList, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Card, Text, Button, Body} from 'native-base';
import Swiper from 'react-native-swiper';
import StarRating from "react-native-star-rating";
import { connect } from 'react-redux';
import { getProducts, saveProductDetail } from '../../public/redux/actions/products';

class HomeScreen extends React.Component {

    constructor() {
        super();
        this.state = {
          hasMore: false,
          search: "",
          position: 1,
          interval: null,
        }
      }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const get = await this.props.dispatch(getProducts());
        if (get) {
            this.setState({
                hasMore: this.props.products.hasMore
            });
        }
    }

    loadMoreData = async () => {
        this.setState({
          hasMore: false
        });
        let url = this.props.products.results.nextPage;
        const load = await this.props.dispatch(getProducts(url));
        if (load) {
          this.setState({
            hasMore: this.props.products.hasMore
          });
        }
      };
    
    
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

        <Card style={{marginRight: 8, marginLeft:8 , marginBottom: 8 ,borderRadius: 8, width: 190, height: 280}}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <Body style={{paddingLeft: 10, paddingTop: 10}}>
              <Text numberOfLines={1} style={{color: '#212121', fontSize: 15, paddingBottom: 5}}>{item.name}</Text>
              
              <Text style={{ fontSize: 14, color : 'black', marginBottom:2}}>Rp {this.formatNumber(item.price)}</Text>
              <View>
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
              </View>
              <View style={{flexDirection:'row', flexWrap:'wrap', paddingTop: 10}}>
                <Button style={{height: 30, backgroundColor: '#0086cb'}} primary onPress={()=> this.handleNavigateDetail(item.id)}>
                    <Text>View</Text>
                </Button>

              </View>
            </Body>
        </Card>

        </TouchableWithoutFeedback>
    )
    
    render(){

        const isCloseToBottom = ({
            layoutMeasurement,
            contentOffset,
            contentSize
          }) => {
            const paddingToBottom = 20;
            return (
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom
            );
          };
      
        return (
        <Container>
            {/* <Spinner
                    visible={this.props.products.isLoading}
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
            /> */}
            <View >
                <ScrollView
                    onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && this.state.hasMore) {
                        this.loadMoreData();
                    }
                    }}
                    scrollEventThrottle={16}
                >

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
                    <View style={{ width: 10, height: 25, backgroundColor: "#0086cb" }}/>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 5 }}>
                                Products List
                        </Text>
                </View>
                        <FlatList
                            data={this.props.products.results.data}
                            renderItem={this.renderItem}
                            keyExtractor={this._keyExtractor}
                            refreshing={this.props.products.isLoading}
                            horizontal={false}
                            numColumns={2}
                        />
                </ScrollView>
            </View>

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
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    topMargin: {
        flex: 1,
        marginTop : 8
    },
    topMarginTwo: {
        flex: 1,
        marginTop : 16
    },
    topMarginTri: {
        flex: 1,
        marginTop : 25
    },
    image: {
        margin: 2,
        height: 151
    },
    spinnerTextStyle: {
        color: '#fff'
    }
})