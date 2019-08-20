import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useStoreState } from "easy-peasy";
import { useStoreActions } from "../../Store/store";

const Home = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>Add Todo</Text>
        </SafeAreaView>
    );
};

export default Home;
