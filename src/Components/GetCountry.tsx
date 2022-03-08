import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LOAD_COUNTRY } from '../GraphQL/Queries';
import { Country } from '../Interfaces/Country';

const GetCountry = () => {
  const [country, setCountry] = useState<Country>();
  const { code } = useParams();
  const { loading, error, data } = useQuery(LOAD_COUNTRY, {
    variables: { code }
  });

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
  if (error) console.error(`[GraphQL error]: Message: ${error}`);

  const head = 'border border-slate-600 bg-slate-300 px-5 py-3';
  const cell = 'border border-slate-700 px-5 py-3';

  return (
    <>
      <div className="mt-10">
        <table className="border-collapse border border-slate-500">
          <tbody>
            <tr>
              <td className={head}>Code: </td>
              <td className={cell}>{country?.code}</td>
            </tr>
            <tr>
              <td className={head}>Name: </td>
              <td className={cell}>{country?.name}</td>
            </tr>
            <tr>
              <td className={head}>Emoji: </td>
              <td className={cell}>{country?.emoji}</td>
            </tr>
            <tr>
              <td className={head}>Languages: </td>
              <td className={cell}>
                {country?.languages.map((val: any, key: any) => {
                  return <p key={key}>{val.name}</p>;
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetCountry;
