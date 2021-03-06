// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.ngs.cor.gg/graphql",
    cache: new InMemoryCache(),
});

export default client;