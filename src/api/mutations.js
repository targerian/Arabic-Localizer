import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    delete_user(id: $id, password: "123456") {
      status
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID
    $name: String!
    $phone: String
    $email: String!
    $start_at: String!
    $department_id: ID!
    $manager_id: ID!
    $company_id: ID!
    $office_id: ID!
    $position_id: ID!
    $att_profile_id: ID!
    $copied_managers: [ID!]
    $user_image: Upload
  ) {
    update_user(
      input: {
        user_input: {
          user_image: $user_image
          id: $id
          role_id: "6"
          name: $name
          phone: $phone
          email: $email
          starts_at: $start_at
          department_id: $department_id
          manager_id: $manager_id
          company_id: $company_id
          office_id: $office_id
          position_id: $position_id
          att_profile_id: $att_profile_id
          max_homeDays_per_week: 5
          flexible_home: 2
          can_ex_days: 1
          can_work_home: 0
          has_credentials: 0
          copied_managers: $copied_managers
        }
      }
    ) {
      name
      id
    }
  }
`;
