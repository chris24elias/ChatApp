import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { APP_STATE } from "../Constants";
// import { getLoginCredentials, resetLoginCredentials } from "../Services/Keychain";
import NavigationService from "../Navigation";
import { useStoreActions, useStoreState } from "../Store/store";
import Routes from "../Navigation/Routes";
// import useCheckVersion from "../CheckVersion";

const AuthStateContext = React.createContext();

export const AuthContextProvider = (props: any) => {
    const { setState, checkLogin, setUsername } = useStoreActions((actions) => ({
        checkLogin: actions.checkLogin,
        setState: actions.changeAppState,
        setUsername: actions.setUsername,
    }));

    const state = useStoreState((state) => state.appstate);

    function login(userName: string) {
        if (!userName) {
            return;
        }
        setUsername(userName);
        setState(APP_STATE.PRIVATE);
    }

    function logout() {
        Alert.alert("Please comfirm Logout", "Are you sure you want to logout from the app", [
            {
                text: "Yes, Logout",
                onPress: _logoutUser,
            },
            {
                type: "cancel",
                text: "No, Stay here",
            },
        ]);
    }

    async function _logoutUser() {
        setUsername("");
        setState(APP_STATE.PUBLIC);
    }

    // check loggedin on mount
    useEffect(() => {
        // if (state == APP_STATE.UNKNOWN) {
        //     let loggedIn = checkLogin();
        //     console.log("checking logged in", loggedIn);
        //     if (loggedIn) {
        //         setState(APP_STATE.PRIVATE);
        //     } else {
        //         setState(APP_STATE.PUBLIC);
        //     }
        // }
        state == APP_STATE.UNKNOWN && checkLogin();
    }, []);

    // app state reactor
    useEffect(() => {
        if (state == APP_STATE.PRIVATE) {
            NavigationService.navigate(Routes.HOME_STACK);
        } else if (state == APP_STATE.PUBLIC) {
            NavigationService.navigate(Routes.LOGIN_STACK);
        } else {
            //do something if needed
        }
    }, [state]);

    return (
        <AuthStateContext.Provider
            value={{
                state,
                logout,
                login,
            }}
        >
            {props.children}
        </AuthStateContext.Provider>
    );
};

export default AuthStateContext;
