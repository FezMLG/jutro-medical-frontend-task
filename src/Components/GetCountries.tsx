import { useQuery, gql } from "@apollo/client";
import { LOAD_COUNTRIES } from "../GraphQL/Queries";
import React, { useEffect, useState } from "react";

const GetCountries = () => {
  const { error, loading, data } = useQuery(LOAD_COUNTRIES);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (data) {
      setCountries(data.countries);
    }
  }, [data]);

  return (
    <div>
      {" "}
      {countries.map((val: any, key: any) => {
        return (
          <a href={`/${val.code}`} key={key}>
            <p>{val.name}</p>
            <p>{val.code}</p>
          </a>
        );
      })}
    </div>
  );
};

export default GetCountries;
