import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import store from "./Store/store";
import { StoreProvider } from "easy-peasy";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./Navigation/Navigation";
import GQLProvider from "./Apollo/GQLProvider";
import NavigationService from "./Navigation";
import { AuthContextProvider } from "./Auth/AuthContext";
const persistor = persistStore(store);

const Root = () => {
    return (
        <PersistGate
            loading={<ActivityIndicator style={{ flex: 1, alignSelf: "center" }} size="large" />}
            persistor={persistor}
        >
            <StoreProvider store={store}>
                <AuthContextProvider>
                    {/* <GQLProvider> */}
                    <Navigation
                        // uriPrefix={APP_PREFIX}
                        // screenProps={{ theme, t }}
                        ref={(nav: any) => NavigationService.setTopLevelNavigator(nav)}
                    />
                    {/* </GQLProvider> */}
                </AuthContextProvider>
            </StoreProvider>
        </PersistGate>
    );
};

export default Root;
