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
    const { loginUser, setState, checkLogin, setToken, requestToken } = useStoreActions((actions) => ({
        loginUser: actions.login.loginUser,
        checkLogin: actions.login.checkLogin,
        setToken: actions.login.setToken,
        requestToken: actions.login.requestToken,
        setState: actions.changeAppState,
    }));

    // const version = useCheckVersion();
    const state = useStoreState((state) => state.appstate);
    // const [state, setState] = useState(APP_STATE.UNKNOWN);

    function login(qr_code_id: string) {
        loginUser(qr_code_id).then((success: boolean) => {
            if (success) {
                setState(APP_STATE.PRIVATE);
            }
        });
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
        setState(APP_STATE.PUBLIC);
        setToken("");
    }

    // check loggedin on mount
    useEffect(() => {
        if (state == APP_STATE.UNKNOWN) {
            checkLogin().then((loggedIn: boolean) => {
                if (loggedIn) {
                    setState(APP_STATE.PRIVATE);
                } else {
                    setState(APP_STATE.PUBLIC);
                }
            });
        }
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
