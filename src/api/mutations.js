import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    delete_user(id: $id, password: "123456") {
      status
      message
    }
  }
`;
