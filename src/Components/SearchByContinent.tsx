import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { LOAD_CONTINENTS } from "../GraphQL/Queries";
import { Continent } from "../Interfaces/Continent";

const SearchByContinent = () => {
  const [continents, setContinents] = useState<Continent[]>();

  const { error, loading, data } = useQuery(LOAD_CONTINENTS);

  useEffect(() => {
    if (data) {
      const arr: any[] = [];
      data?.continents.forEach((continent: Continent) => {
        arr.push({ value: continent.code, label: continent.name });
      });
      setContinents(arr);
    }
  }, [data]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={continents}
      isSearchable={false}
    />
  );
};

export default SearchByContinent;
