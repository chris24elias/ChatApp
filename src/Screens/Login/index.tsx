import React, { useRef, useEffect, useState } from "react";
import { View, Text, Keyboard, Alert, SafeAreaView, KeyboardAvoidingView, Image } from "react-native";
import { useStoreState, useStoreActions } from "../../Store/store";
import { Button, TextInput, Headline } from "react-native-paper";
import { ScrollView } from "react-native";
import { STATUS, SCREEN_HEIGHT } from "../../Constants";
import useAuth from "../../Auth";
import LinearGradient from "react-native-linear-gradient";

export default () => {
    // const onChange = useStoreActions((actions) => actions.login.onLoginInputChange);
    const [username, setUsername] = useState("");
    const { login } = useAuth();

    const loginUser = () => {
        Keyboard.dismiss();

        if (!username) {
            // showInfoToast();
            Alert.alert("Username is mandatory, try again !");
            return;
        }

        login(username);
    };

    return (
        <LinearGradient colors={["#00c6ff", "#0072ff"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        padding: 15,

                        justifyContent: "center",
                        // alignItems: "center",
                    }}
                    behavior="padding"
                    enabled
                >
                    <View style={{ flex: 1.5, justifyContent: "center" }}>
                        <Image
                            source={require("../../images/logo2.png")}
                            style={{ height: SCREEN_HEIGHT * 0.17, width: undefined }}
                            resizeMode="contain"
                        />
                        {/* <Text style={{ alignSelf: "center", fontSize: 30 }}>Chat App</Text> */}
                    </View>
                    <View style={{ flex: 1, padding: 15, paddingVertical: 20 }}>
                        {/* <Text>Please enter a username</Text> */}
                        <TextInput
                            label="Username"
                            autoCapitalize="none"
                            returnKeyType={"next"}
                            onChangeText={(text) => setUsername(text)}
                            value={username}
                            // mode="outlined"
                            style={{
                                backgroundColor: "white",
                                borderRadius: 4,
                                borderTopLeftRadius: 4,
                                borderTopRightRadius: 4,
                            }}
                        />
                        <View style={{ marginTop: 10 }}>
                            <Button
                                dark={true}
                                mode="contained"
                                onPress={loginUser}
                                style={{ borderRadius: 4, backgroundColor: "#48dbfb" }}
                            >
                                <Text>Login</Text>
                            </Button>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
};
