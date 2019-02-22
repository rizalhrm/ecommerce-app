import React from "react";
import { Alert, ImageBackground, TouchableOpacity, Image, TextInput, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { connect } from 'react-redux'
import { login } from '../../public/redux/actions/auth';

class LoginScreen extends React.Component {

    constructor() {
      super();
      this.state = {
        email: "",
        password: ""
      };
    }

    onLoginPress = () => {
        this.doLogin()
          .then(res => {
            const auth = this.props.auth;
            AsyncStorage.setItem("token", auth.access_token.token);
            AsyncStorage.setItem("refreshToken", auth.access_token.refreshToken);
            this.props.navigation.navigate("Home");
          })
          .catch(err => {
            console.log(err);
            Alert.alert("Warning", "Login Failed !");
          });
      };
    
    doLogin = async () => {
        await this.props.dispatch(
            login({
            email: this.state.email,
            password: this.state.password
            })
        );
    };
    

    render(){
        return(
            <View style={styles.container}>
              <ImageBackground source={{uri: "https://webgradients.com/public/webgradients_png/019%20Malibu%20Beach.png"}} style={{width: '100%', height: '100%'}}>
              <View behavior="padding" style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Image style={styles.logo} source={{uri : "http://chittagongit.com//images/smartphone-icon-png/smartphone-icon-png-27.jpg"}} />
                        <Text style={styles.headtext}>Zona Gadget</Text>
                    </View>
                    <View style={styles.keyboard}>
                        <View style={styles.window}>
                        <TextInput
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                            placeholder="Email"
                            placeholderTextColor="#fff"
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            borderLeftWidth={1}
                            borderRightWidth={1}
                            borderTopWidth={1}
                            borderBottomWidth={1}
                            borderColor="#fff"
                            autoCorrect={false}
                            value={this.state.email}
                            style={styles.font}
                            onChangeText={email => this.setState({ email })}
                        />
                        </View>
                        <View style={styles.window}>
                        <TextInput
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                            placeholder="Password"
                            placeholderTextColor="#fff"
                            borderLeftWidth={1}
                            borderRightWidth={1}
                            borderTopWidth={1}
                            borderBottomWidth={1}
                            borderColor="#fff"
                            returnKeyType="go"
                            secureTextEntry
                            style={styles.font}
                            ref={input => (this.passwordInput = input)}
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                        </View>
                        <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={this.onLoginPress}
                        >
                        <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonDown} onPress={()=> this.props.navigation.navigate("Register")}>
                        <Text
                            style={styles.buttonText}
                        >
                            Sign up
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDown}>
                        <Text
                            style={styles.buttonText}
                        >
                            Forget Password
                        </Text>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(LoginScreen)

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
        marginTop: 10,
        width: 160,
        textAlign: "center",
        fontSize: 25,
        fontWeight: 'bold'
    },
    font: {
        fontSize: 16,
        color: '#fff'
    },
    keyboard: {
        margin: 20,
        padding: 20,
        alignSelf: "stretch"
    },
    buttonContainer: {
        backgroundColor: "#0086cb",
        paddingVertical: 15
    },
    buttonText: {
        textAlign: "center",
        color: "#FFF",
        fontWeight: "700",
        fontSize: 16
    },
    button: {
        backgroundColor: "#0086cb",
        paddingVertical: 15
    },
    buttonDown: {
        paddingVertical: 15
    },
    window: {
        marginBottom: 15
    }
  });