import React from "react";
import { ImageBackground, Image, StyleSheet, Text, View, AsyncStorage } from "react-native";

class Splash extends React.Component {

    constructor(props) {
        super(props);
        
      }

      _bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('token');
        this.props.navigation.navigate(token ? 'AppNavigator' : 'LoginNavigator');
      };

      componentDidMount() {
        setTimeout(() => {
            this._bootstrapAsync();
        }, 2000);
       }

    render(){
        return(
            <View style={styles.container}>
              <ImageBackground source={{uri: "https://webgradients.com/public/webgradients_png/019%20Malibu%20Beach.png"}} style={{width: '100%', height: '100%'}}>
              <View behavior="padding" style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Image style={styles.logo} source={{uri : "http://chittagongit.com//images/smartphone-icon-png/smartphone-icon-png-27.jpg"}} />
                        <Text style={styles.headtext}>Zona Gadget</Text>
                    </View>
                </View>
                </ImageBackground>
            </View>
        )
    }
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 100,
        height: 100
    },
    headtext: {
        color: "#fff",
        marginTop: 40,
        width: 160,
        textAlign: "center",
        fontSize: 25,
        fontWeight: 'bold'
    }
  });