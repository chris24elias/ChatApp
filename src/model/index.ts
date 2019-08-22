import login, { LoginModel } from "./Models/Login";
import { action, Action } from "easy-peasy";
import { APP_STATE } from "../Constants";
import user, { UserModel } from "./Models/user";
import { thunk, Thunk } from "easy-peasy";
// import { ApiService } from "../../Store";
// import { setLoginCredentials, getLoginCredentials, resetLoginCredentials } from "../../Services/Keychain";
import { STATUS, DEVICE_ID, endpointURL } from "../Constants";

import AsyncStorage from "@react-native-community/async-storage";
import { string } from "prop-types";

export interface StoreModel {
    username: string;
    setUsername: Action<StoreModel, string>;
    checkLogin: Thunk<StoreModel, string>;
    onLoginInputChange: Action<StoreModel, { key: string; value: any }>;
    [key: string]: any;
    appstate: string;
    changeAppState: Action<StoreModel, string>;
}

const model: StoreModel = {
    username: "",
    checkLogin: thunk(async (actions, payload, { dispatch, injections, getState }) => {
        console.log("CHECKING LOGIN ", actions);
        let state = getState();
        console.log("STATe", state);
        if (state.username !== "" && state.username.length > 0) {
            // api.setAuthorizationHeader(credentials.access_token);
            //dispatch.user.requestUserProfile();
            console.log("USER LOGGED IN");
            actions.changeAppState(APP_STATE.PRIVATE);
        } else {
            console.log("USER NOT LOGGED IN");
            actions.changeAppState(APP_STATE.PUBLIC);
        }
    }),
    setUsername: action((state, payload) => {
        state.username = payload;
    }),
    onLoginInputChange: action((state, { key, value }) => {
        state[key] = value;
    }),
    appstate: APP_STATE.UNKNOWN,
    changeAppState: action((state, payload) => {
        state.appstate = payload;
    }),
};

export default model;
