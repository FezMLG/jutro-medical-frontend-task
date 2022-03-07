import { Link, useParams } from "react-router-dom";

const GetCountry = () => {
  let { countryId } = useParams();
  return (
    <>
      <Link to="/">Go back</Link>
      <div>Country {countryId}</div>
    </>
  );
};

export default GetCountry;
