import { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  from,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetCountries from "./Components/GetCountries";
import GetCountry from "./Components/GetCountry";
import AsyncSelect from "react-select/async";
import { LOAD_CONTINENTS } from "./GraphQL/Queries";
import SearchByContinent from "./Components/SearchByContinent";

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });
// const link = from([
//   errorLink,
//   new HttpLink({ uri: "https://countries.trevorblades.com/" }),
// ]);

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>Welcome to Countries!</h1>
      <SearchByContinent />
      <Routes>
        <Route path="/" element={<GetCountries />} />
        <Route path="/:code" element={<GetCountry />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
