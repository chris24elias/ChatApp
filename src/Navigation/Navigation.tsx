import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import Login from "../Screens/Login";
import Routes from "./Routes";
import LaunchScreen from "../Screens/LaunchScreen/LaunchScreen";
import HomeDrawer from "./HomeDrawer";

const MainStack = createStackNavigator(
    {
        [Routes.HOME_DRAWER]: {
            screen: HomeDrawer,
            path: "tabs",
        },
    },
    {
        // Default config for all screens
        headerMode: "none",
        initialRouteName: Routes.HOME_DRAWER,
    }
);

const LoginStack = createStackNavigator(
    {
        // [Routes.APP_INTRO]: AppIntro,
        [Routes.LOGIN_SCREEN]: Login,
    },
    {
        headerMode: "none",
        // initialRouteName: Routes.APP_INTRO
    }
);

const PrimaryNav = createAnimatedSwitchNavigator(
    {
        [Routes.MAIN_APP]: {
            screen: MainStack,
            path: "main",
        },
        [Routes.LOGIN_STACK]: { screen: LoginStack, path: "login" },
        [Routes.LOADING]: { screen: LaunchScreen },
    },
    {
        transition: (
            <Transition.Together>
                <Transition.Out type="slide-left" durationMs={200} interpolation="easeIn" />
                <Transition.In type="slide-right" durationMs={200} />
            </Transition.Together>
        ),
        initialRouteName: Routes.LOADING,
    }
);

const ModalNav = createStackNavigator(
    {
        Main: {
            screen: PrimaryNav,
            path: "app",
        },
    },
    {
        mode: "modal",
        initialRouteName: "Main",
        headerMode: "none",
    }
);

export default createAppContainer(ModalNav);
