import React, { Component } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  StyleSheet,
  Text,
  View
} from "react-native";

export default class RegisterScreen extends Component {

    constructor() {
      super();
      this.state = {
        email: "",
        password: ""
      };
    }

    async onRegisterPress() {

        const { username, password } = this.state;
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
        this.props.navigation.navigate("Login");

    }

    render(){
        return(
            <View style={styles.container}>
              <ImageBackground source={{uri: "https://webgradients.com/public/webgradients_png/019%20Malibu%20Beach.png"}} style={{width: '100%', height: '100%'}}>
              <View behavior="padding" style={styles.container}>
                    <View style={styles.keyboard}>
                        <View style={styles.window}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#fff"
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            autoCapitalize="none"
                            borderLeftWidth={1}
                            borderRightWidth={1}
                            borderTopWidth={1}
                            borderBottomWidth={1}
                            borderColor="#fff"
                            autoCorrect={false}
                            value={this.state.email}
                            style={styles.font}
                            onChangeText={email => this.setState({ username })}
                        />
                        </View>
                        <View style={styles.window}>
                        <TextInput
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
                        <View style={styles.window}>
                        <TextInput
                            placeholder="Confirm Password"
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
                        onPress={this.onRegisterPress.bind(this)}
                        >
                        <Text style={styles.buttonText}>Register Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ImageBackground>
            </View>
        )
    }
}

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