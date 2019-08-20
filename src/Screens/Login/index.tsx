import React, { useRef, useEffect } from "react";
import { View, Text, Keyboard, Alert, SafeAreaView } from "react-native";
import { useStoreState, useStoreActions } from "../../Store/store";
import { Button, TextInput } from "react-native-paper";
import { ScrollView } from "react-native";
import { STATUS } from "../../Constants";
import useAuth from "../../Auth";

export default () => {
    const onChange = useStoreActions((actions) => actions.login.onLoginInputChange);
    const { state, login, requestToken } = useAuth();

    const inputUserName = useRef();
    const inputPassword = useRef();


    const onSubmit = () => {
        inputPassword.current.focus();
    };

    const { email, qrCode, status } = useStoreState((state) => ({
        email: state.login.email,
        qrCode: state.login.qrCode,
        status: state.login.status,
    }));

    const loginUser = () => {
        Keyboard.dismiss();

        // if (!username || !password) {
        //     // showInfoToast();
        //     Alert.alert("Username and password are mandatory, try again !");
        // }

        login(qrCode);
    };

    const loading = status == STATUS.FETCHING;

    return (
        <SafeAreaView>
            <TextInput
                label="EMAIL"
                // mode="outlined"
                ref={inputUserName}
                autoCapitalize="none"
                returnKeyType={"next"}
                onSubmitEditing={onSubmit}
                onChangeText={(text) =>
                    onChange({
                        key: "email",
                        value: text,
                    })
                }
                value={email}
            />



            <Button loading={loading} dark={true} onPress={() => requestToken(email)}>
                <Text>Request QR Code</Text>
            </Button>


            <TextInput
                ref={inputPassword}
                value={qrCode}
                // mode="outlined"
                label="QR CODE"
                returnKeyType={"go"}
                onSubmitEditing={loginUser}
                onChangeText={(text) =>
                    onChange({
                        key: "qrCode",
                        value: text,
                    })
                }
            />

            <Button loading={loading} dark={true} onPress={loginUser}>
                <Text>Login</Text>
            </Button>
        </SafeAreaView>
    );
};
