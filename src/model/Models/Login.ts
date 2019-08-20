import { action, thunk, Thunk, Action } from "easy-peasy";
// import { ApiService } from "../../Store";
// import { setLoginCredentials, getLoginCredentials, resetLoginCredentials } from "../../Services/Keychain";
import { STATUS, QR_API_KEY, DEVICE_ID, endpointURL } from "../../Constants";
import { APP_STATE } from "../../Constants/index";
import baseModel, { BaseModel } from "./Base";
import AsyncStorage from "@react-native-community/async-storage";
import { string } from "prop-types";

// import { showErrorToast, showLoading } from "../../Lib/Toast";

export interface LoginModel {
    token: string;
    setToken: Action<LoginModel, string>;
    loginUser: Thunk<LoginModel, string>;
    checkLogin: Thunk<LoginModel>;

    onLoginInputChange: Action<LoginModel, { key: string; value: any }>;
    [key: string]: any;
}

const checkLogin = thunk(async (actions, payload, { getState }) => {
    const token = getState().token;
    if (token && (await isTokenValid(token))) {
        actions.setToken(token);
        return true;
    } else {
        return false;
    }
});

const setToken = action((state, payload) => {
    state.token = payload;
});

const loginUser = thunk(async (actions, payload, { dispatch }) => {
    let response = await fetch("https://pbxlink.gql.fastpbx.io/link-auth/" + payload, {
        headers: {
            "api-key": QR_API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            device_id: DEVICE_ID,
        }),
        method: "POST",
    }).catch((e) => {
        console.log("FETCH TOKEN ERROR", e);
    });

    if (response) {
        let resJson = await response.json().catch((e) => {
            // reject(e);
        });

        console.log("FETCH TOKEN RESPONSE", resJson);
        if (resJson && resJson.token) {
            actions.setToken(resJson.token);
            actions.setUserInfo(resJson.userInfo);
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
});

const setUserInfo = action((state, payload) => {
    state.userInfo = payload;
});

const requestToken = action((state, payload) => {
    return new Promise((resolve, reject) => {
        fetch("https://pbxlink.gql.fastpbx.io/request-auth", {
            headers: {
                "api-key": QR_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                device_id: DEVICE_ID,
                email: payload,
            }),
            method: "POST",
        })
            .then((res) => {
                console.log("FETCH QR CODE RESPONSE", res);
                res.json()
                    .then((resJSON) => {
                        console.log("FETCH QR CODE RESPONSE", resJSON);
                        resolve(resJSON);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            })
            .catch((e) => {
                // console.warn("FETCH TOKEN ERROR", e);
                reject(e);
            });
    });
});

const loginModel: LoginModel = {
    //include BaseModel
    // ...baseModel,
    //include all thunks or actions defined separately
    checkLogin,
    token: "",
    setToken,
    loginUser,
    setUserInfo,
    requestToken,

    onLoginInputChange: action((state, { key, value }) => {
        state[key] = value;
    }),
    userInfo: {},
};

export default loginModel;

function isTokenValid(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fetch(endpointURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                "device-id": DEVICE_ID,
            },
            body: JSON.stringify({
                query: `query IsUser($email: String!) {
                    IsUser(email: $email) {
                   id email isRegistered
                  }
                }`,
                //  variables: {
                //      email: email,
                //  },
                operationName: "IsUser",
            }),
        })
            .then((res) => {
                console.log("IS TOKEN VALID RES", res);
                if (res.status == 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.log("IS TOKEN VALID error: ", err);
                resolve(false);
            });
    });
}
