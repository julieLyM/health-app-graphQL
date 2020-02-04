import { gql } from 'apollo-boost';

export const userQuery = gql`
  {
    users {
      id
      name
      age
      height
    }
  }
`;
