import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

import { useStoreActions, useStoreState } from "../../Store/store";
import useAuth from "../../Auth";

const Home = ({ navigation }) => {
    let userName = useStoreState((state) => state.username);
    let auth = useAuth();

    return (
        <SafeAreaView>
            <Text>Welcome {userName}</Text>
            <TouchableOpacity onPress={() => auth.logout()}>
                <Text>LOGOUT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Home;
