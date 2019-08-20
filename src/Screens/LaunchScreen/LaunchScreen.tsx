import React from "react";
import { Text, ActivityIndicator, View } from "react-native";

export default function() {
    //   const { theme } = useTheme();

    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
            }}
        >
            <ActivityIndicator
                size="large"
                //   color={theme.colors.primary}
            />
            <Text
                style={{
                    color: "cyan",
                    fontSize: 24,
                    paddingLeft: 10,
                    marginTop: 10,
                }}
            >
                LOADING Please wait...
            </Text>
        </View>
    );
}
