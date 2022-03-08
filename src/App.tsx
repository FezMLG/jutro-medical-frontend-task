import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import GetCountries from './Components/GetCountries';
import GetCountry from './Components/GetCountry';
import SearchByContinent from './Components/SearchByContinent';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache()
});

function App() {
  const [continent, setContinent] = useState('');
  const [inputText, setInputText] = useState('');

  const handleSearch = (e: any) => {
    const lowerCase = e.target.value.toLowerCase();
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
          <Route
            path="/:code"
            element={
              <>
                <Link
                  to="/"
                  className="px-2 py-1 my-2 block bg-emerald-900 text-white w-max rounded-lg shadow-md">
                  Go back
                </Link>
                <GetCountry />
              </>
            }
          />
        </Routes>
      </ApolloProvider>
    </div>
  );
}

export default App;
