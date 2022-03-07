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
    <div className="flex flex-col gap-3">
      {" "}
      {filteredData.map((val: any, key: any) => {
        return (
          <a
            href={`/${val.code}`}
            key={key}
            className="text-xl font-semibold pl-2.5 hover:underline text-blue-800"
          >
            {val.name} ({val.code})
          </a>
        );
      })}
    </div>
  );
};

export default GetCountries;
