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
    <div className="max-w-xl m-auto">
      <h1 className="text-3xl font-bold underline">Countries</h1>
      <ApolloProvider client={client}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="bg-slate-300 px-5 py-5 rounded-lg	shadow-lg my-5">
                  <h2 className="text-xl font-semibold mb-3">Search by</h2>
                  <div className="w-11/12 flex flex-col gap-3 m-auto">
                    <div>
                      <label>Continent</label>
                      <SearchByContinent onContinentChange={setContinent} />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="countrySerach">Country name</label>
                      <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search..."
                        id="countrySerach"
                        className="px-3 py-2 rounded-lg	shadow-md"
                      />
                    </div>
                  </div>
                </div>
                <GetCountries continent={continent} input={inputText} />
              </>
            }
          />
          <Route path="/:code" element={<GetCountry />} />
        </Routes>
      </ApolloProvider>
    </div>
  );
}

export default App;
