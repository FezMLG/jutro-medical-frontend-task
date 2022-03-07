import { gql } from "@apollo/client";

export const LOAD_COUNTRIES = gql`
  query ($filter: CountryFilterInput) {
    countries(filter: $filter) {
      name
      code
    }
  }
`;

export const LOAD_COUNTRY = gql`
  query country($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      languages {
        name
      }
    }
  }
`;

export const LOAD_CONTINENTS = gql`
  query {
    continents {
      code
      name
    }
  }
`;
