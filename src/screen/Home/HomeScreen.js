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
                    <View style={styles.slide1}>
                        <Image style={{width:"50%", height:200, alignItems: 'center'}} source={{uri : "https://lh3.googleusercontent.com/5j23Rh1ydxyv08smk0hsZxzidXtjuCAYuyeaEQq1WudkQ71d3jcS_0u0sAlNuGiqFVgWFVPphALeMzDBr4MtGOmBXhmvb7BC24_JgdfiFnBtoleQ2Z7FdiA91Cu5fSNy3aOFaVuGapAx9v61NwS6agcySg41P8ya2ZBmin75NGsrb_e0hSxwsNkspAWDFjmuH6d6BSo7jlS_aQ9hfBvFuomuT0xL-rtZLnx79AIKvEBFpoto9e00xEZBwndQ8rqa9ZRWvMZfq99PTIEhrhNwZwMQTSbWqapwVUk0yicdMJyylM7-bJf_FRiHpkLHUG2EnecwBiCDs8oN_YhNnoB788hrilRFasAHWkJfJooHDAU5aoXT2Dg1TZ3jqgIEx-JdwBqAk6r9EC1MslUtuEuEHxi2Zxnqpn_JbD26Q_KigtpbQ-DUrKgj7uvsQDUzci0BbqVCRI1mdYqqqaCGSNROOM4OxaJNdWA-rOZ_c5pwVJI7V-5mz1ei0TiOLc_sMX6ZDyGYEjVzYTOD88IlTIJVWKwBNT5TgUS-Hy2nBPV65VG87PZmagvSsaXWQ97viH2A63p_j37RTsCVOMdX09I6LxfKR92tNMC12EbmhOBGlna8rjuIwe7ou-FIHZdz3z9PLnQq4LWm0HE6QknIMHIUyElAAgxOgE4=w220-h256-no"}} />
                        <Text style={styles.bestSeller}>Xiaomi 6A</Text>
                    </View>
                    <View style={styles.slide1}>
                        <Image style={{width:"50%", height:200, alignItems: 'center'}} source={{uri : "https://lh3.googleusercontent.com/pL7IL50tBPwH-gxhHYoUzf9lih1n-b-YS0-r1Dnin0TIa6vJTPfHxQ0hh8HMdo7sovIcyXeE4d25t2H8pc-hYX5fhkSW_7pwdefIuaTCxEbgCw-rJkYC-B69eWeO1PIc612rhsT3OL0kNJcR7-elt3vGwr2bdRt7By8vuO7jft2T_p1vAnGsQLqSngROwKUZvQrrK_n6tucaa04piZOIzlRTSnK_Yhh2XxRz1ABl2_OPiit_cmDHOqQXExldFepVup5yAtGIB3sc-1gf0QW21ukQIm0y4i9_bs6nQKPZ-dCbYROxs_BQJxPjTmvl25ov-pMaAzz_a7U_TuqbzgdDh2bGVsB64X2myhTCVoYn6R_8QP_SpE0hOEb4Q9ucI7Jbd83LDH51cmlsAarSuKVskSKcOQiciZ0AZa1fYInpm8IBIIsSqG85bQYjhVsjCsqXFbxGsr8-FcXnNHfGm8BRMW3Tl4F-v1VMRZ1nujvlONXA21b4Qt5XeGnaJRYfC7uvz6oF3IAKOIj2dZ0kTbbAnYMe9VA1uzLhso-VqJH8fvLzssTlrVJJVo2ebPqgXntoCNXwNK3guu-XsLoRuzW3RLBzM2v603f6pzFoBD_ulxCbaiN0xCe0VV4mPZhEIUxTflO9I48JOLoGOlskHeBiswyIyX9UK6c=w400-h437-no"}} />
                        <Text style={styles.bestSeller}>Samsung Galaxy A8 Plus</Text>
                    </View>
                    <View style={styles.slide1}>
                        <Image style={{width:"50%", height:200, alignItems: 'center'}} source={{uri : "https://lh3.googleusercontent.com/zT61dSS8EjUO2eg9qAtz9ny7KZ8TiORNcapWCveqAtx7XQD6bZi9R2NZYOmfBI0diryTDKDvOxhtmZ3EaBPia7ZoAN7ny7fp2T3qT_VO7OR7cv2wOABNMyAc_DV5ezCXhF9Ri1i__e0B1uWKA5kcqFDV2AqKvn32gfy-9a4XXRkH9tkR6_E-_o4Ch_KsJV8vy_0LjiLg5Lobg8WOyoMoTuPz2WuEJm_H-e0l8iOYmT9os5y9N0fmz09WLxAPveBImEZNzYk7xmlyK2TS2HXZ58rQjiIf7Rbi2d3MYLBuq532OLLoxKjC2O8UefIazzpZsD54v0GDkQq9RL6vhD4gFMs1cQRuRxyMm5xQoEKh89moJSmrZPPE1ltVcbDzKMjqOEdMv9qBF0fUA0-DxW5MOvC9o24iClmjxmehvaB7nkKHZB__P0wN8EQ4xNZRKrbxqxjwhrJaEDERyLPUCAwWRYHtt5E_ygl77GCY88-Y-gWY3h07Fh-0ak7XJ1G31iJF8J337JF551GVb2qc8MjmHBHqE_5qGU1XcZ_fTnKf7GE-lvjTzaGIV0eI9f8EtNYKp0z65HCM7iPRsn7larSe1dP3V5Zs23Ywf71Wy8q7BoLDYesASOC59AqaHD6EudJ0lFw2oGfr63Fx381p3vg9aWoPohFK7UA=w444-h488-no"}} />
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
    slide1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bestSeller: {
        fontSize: 13,
        marginRight: 10
    }
})