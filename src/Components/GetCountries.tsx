import { useQuery, gql } from "@apollo/client";
import { LOAD_COUNTRIES } from "../GraphQL/Queries";
import React, { FunctionComponent, useEffect, useState } from "react";

const GetCountries: FunctionComponent<{ continent: any; input: any }> = ({
  continent,
  input,
}) => {
  let filter = {};
  if (continent != "") {
    filter = {
      filter: {
        continent: {
          eq: continent,
        },
      },
    };
  }

  const { error, loading, data } = useQuery(LOAD_COUNTRIES, {
    variables: filter,
  });

  const [countries, setCountries] = useState([]);

  const filteredData = countries.filter((el: any) => {
    if (input === "") {
      return el;
    } else {
      return el.name.toLowerCase().includes(input);
    }
  });

  useEffect(() => {
    if (data) {
      setCountries(data.countries);
    }
  }, [data]);

  return (
    <div>
      {" "}
      {filteredData.map((val: any, key: any) => {
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
