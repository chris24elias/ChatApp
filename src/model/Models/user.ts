import { action, thunk, Action } from "easy-peasy";

export interface User {}

export interface UserModel {
    user: User;
    setUser: Action<UserModel, User>;
}

const userModel: UserModel = {
    user: undefined,
    setUser: action((state, payload) => {
        console.log("SETTING USER", payload);
        state.user = payload;
    }),
};

export default userModel;
