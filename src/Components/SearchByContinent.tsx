import { useQuery } from "@apollo/client";
import { FunctionComponent, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { LOAD_CONTINENTS } from "../GraphQL/Queries";
import { Continent } from "../Interfaces/Continent";

const SearchByContinent: FunctionComponent<{ onContinentChange: any }> = ({
  onContinentChange,
}) => {
  const [continents, setContinents] = useState<Continent[]>();

  const { error, loading, data } = useQuery(LOAD_CONTINENTS);

  useEffect(() => {
    if (data) {
      const arr: any[] = [];
      arr.push({ value: "", label: "All" });
      data?.continents.forEach((continent: Continent) => {
        arr.push({ value: continent.code, label: continent.name });
      });
      setContinents(arr);
    }
  }, [data]);

  function handleChange(e: any) {
    onContinentChange(e.value);
  }

  if (error) console.error(`[GraphQL error]: Message: ${error}`);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={continents}
      isSearchable={false}
      onChange={handleChange}
    />
  );
};

export default SearchByContinent;
