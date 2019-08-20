import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Query } from "react-apollo";

import { useStoreState } from "../../Store/store";
import { useQuery } from "@apollo/react-hooks";

const ChatRoom = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <Text>ChatRoom</Text>
        </View>
    );
};

export default ChatRoom;
