import { useQuery } from '@apollo/client';
import { LOAD_COUNTRIES } from '../GraphQL/Queries';
import { FunctionComponent, useEffect, useState } from 'react';
import { Countries } from '../Interfaces/Countries';

const GetCountries: FunctionComponent<{ continent: string; input: string }> = ({
  continent,
  input
}) => {
  const [countries, setCountries] = useState<Countries[]>([]);

  let filter = {};
  if (continent != '') {
    filter = {
      filter: {
        continent: {
          eq: continent
        }
      }
    };
  }

  const { error, loading, data } = useQuery(LOAD_COUNTRIES, {
    variables: filter
  });

  const filteredData = countries.filter((el: any) => {
    if (input === '') {
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

  if (loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (error) console.error(`[GraphQL error]: Message: ${error}`);

  return (
    <div className="flex flex-col gap-3" data-cy="countriesList">
      {' '}
      {filteredData.map((val: any, key: any) => {
        return (
          <a
            href={`/${val.code}`}
            key={key}
            className="text-xl font-semibold pl-2.5 hover:underline text-blue-800"
            data-cy="country">
            {val.name} ({val.code})
          </a>
        );
      })}
    </div>
  );
};

export default GetCountries;
