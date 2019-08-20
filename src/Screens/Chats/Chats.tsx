import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Query } from "react-apollo";

import { useStoreState } from "../../Store/store";
import { useQuery } from "@apollo/react-hooks";

const Chats = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <Text>Chats</Text>
        </View>
    );
};

export default Chats;
