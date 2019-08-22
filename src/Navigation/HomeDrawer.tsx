import React from "react";
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from "react-navigation";
import Routes from "./Routes";
import Chats from "../Screens/Chats/Chats";
import ChatRoom from "../Screens/ChatRoom/ChatRoom";
import Home from "../Screens/Home";

const HomeStack = createStackNavigator({
    [Routes.HOME_SCREEN]: {
        screen: Home,
        navigationOptions: {
            title: "Home",
        },
    },
});

const ChatsStack = createStackNavigator({
    [Routes.CHATS_SCREEN]: {
        screen: Chats,
        navigationOptions: {
            title: "Chats",
        },
    },
    [Routes.CHAT_ROOM_SCREEN]: {
        screen: ChatRoom,
        navigationOptions: {
            title: "Chat Room",
        },
    },
});

export default createDrawerNavigator(
    {
        [Routes.HOME_STACK]: {
            screen: HomeStack,
            path: "home",
            navigationOptions: {
                title: "Home",
                drawerIcon: getHomeIcon,
            },
        },

        [Routes.CHATS_STACK]: {
            screen: ChatsStack,
            path: "chats",
            navigationOptions: {
                drawerIcon: getNotificationIcon,
                title: "Chats",
            },
        },
    },
    {
        initialRouteName: Routes.HOME_STACK,
    }
);

function getHomeIcon({ focused, horizontal, tintColor }) {
    return (
        // <IconX
        //     style={{ marginBottom: 5 }}
        //     origin={ICON_TYPE.OCTICONS}
        //     name={"home"}
        //     color={tintColor}
        // />
        null
    );
}

function getNotificationIcon({ focused, horizontal, tintColor }) {
    return (
        // <IconX
        //     style={{ marginBottom: 5 }}
        //     origin={ICON_TYPE.ANT_ICON}
        //     name={"notification"}
        //     color={tintColor}
        // />
        null
    );
}
