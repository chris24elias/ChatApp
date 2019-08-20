import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { createUploadLink } from "apollo-upload-client";
import useAuth from "../Auth";
import { DEVICE_ID, endpointURL } from "../Constants";
import { useStoreState } from "../Store/store";

const GQLProvider = (props: any) => {
    // let auth = useAuth();

    const Token = useStoreState((state) => state.login.token);

    function createClient() {
        console.log("Creating GQL client");

        let headers = {};

        if (Token && Token !== "") {
            headers = {
                "device-id": DEVICE_ID,
                Authorization: "Bearer " + Token,
            };
        } else {
            headers = {
                "device-id": DEVICE_ID,
            };
        }

        const httpLink = createUploadLink({
            uri: endpointURL,
            headers: headers,
        });

        let newClient = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
        });
        return newClient;
    }

    return <ApolloProvider client={createClient()}>{props.children}</ApolloProvider>;
};

export default GQLProvider;
