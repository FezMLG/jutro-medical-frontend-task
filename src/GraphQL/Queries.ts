import { gql } from "@apollo/client";

export const LOAD_COUNTRIES = gql`
  query {
    countries {
      code
      name
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
