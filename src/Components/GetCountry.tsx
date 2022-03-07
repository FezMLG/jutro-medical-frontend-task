import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LOAD_COUNTRY } from "../GraphQL/Queries";

interface Country {
  code: string;
  name: string;
  emoji: string;
  languages: [
    {
      name: string;
    }
  ];
}

const GetCountry = () => {
  const [country, setCountry] = useState<Country>();

  let { code } = useParams();
  const { loading, error, data } = useQuery(LOAD_COUNTRY, {
    variables: { code },
  });
  console.log(data);

  useEffect(() => {
    if (data) {
      setCountry(data.country);
    }
  }, [data]);

  if (loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (error) return `Error! ${error}`;
  return (
    <>
      <Link to="/">Go back</Link>
      <div>
        <p>{country?.code}</p>
        <p>{country?.name}</p>
        <p>{country?.emoji}</p>
        <div>
          {country?.languages.map((val: any, key: any) => {
            return <p key={key}>{val.name}</p>;
          })}
        </div>
      </div>
    </>
  );
};

export default GetCountry;
