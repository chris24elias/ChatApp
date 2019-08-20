import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-community/async-storage";
import { createStore, createTypedHooks, action } from "easy-peasy";
import model, { StoreModel } from "../model";
import { composeWithDevTools } from "remote-redux-devtools";
import logger from "redux-logger";

let devTools = composeWithDevTools({
    name: "ChatApp",
    realtime: true,
    injectserver: "react-native",
    trace: true,
});

const { useStoreActions, useStoreDispatch, useStoreState } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreDispatch, useStoreState };

const store = createStore(model, {
    reducerEnhancer: (reducer) =>
        persistReducer(
            {
                key: "easypeasystate",
                storage: AsyncStorage,
                blacklist: ["appstate"],
            },
            reducer
        ),
    name: "easystore",
    /**
     * for api injecting using injections
     */
    // injections: { api },
    compose: devTools,
    devTools: true,
    middleware: [logger],
});

export default store;
