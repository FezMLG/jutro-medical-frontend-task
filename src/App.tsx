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
  useLazyQuery,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetCountries from "./Components/GetCountries";
import GetCountry from "./Components/GetCountry";
import AsyncSelect from "react-select/async";
import { LOAD_CONTINENTS } from "./GraphQL/Queries";
import SearchByContinent from "./Components/SearchByContinent";
import { Continent } from "./Interfaces/Continent";
import { TextField } from "@mui/material";

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
  const [continent, setContinent] = useState("");
  const [inputText, setInputText] = useState("");

  const handleSearch = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Welcome to Countries!</h1>
              <SearchByContinent onContinentChange={setContinent} />
              <TextField
                onChange={handleSearch}
                variant="standard"
                fullWidth
                label="Search"
              />
              <GetCountries continent={continent} input={inputText} />
            </>
          }
        />
        <Route path="/:code" element={<GetCountry />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
