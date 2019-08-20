import login, { LoginModel } from "./Models/Login";
import { action, Action } from "easy-peasy";
import { APP_STATE } from "../Constants";
import user, { UserModel } from "./Models/user";
export interface StoreModel {
    login: LoginModel;
    appstate: string;
    changeAppState: Action<LoginModel, string>;
    user: UserModel;
}

const model: StoreModel = {
    appstate: APP_STATE.UNKNOWN,
    changeAppState: action((state, payload) => {
        state.appstate = payload;
    }),
    user,
    login,
};

export default model;
