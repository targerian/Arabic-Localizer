import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users_by_role(first: 500, page: 1) {
      data {
        id
        name
        img_path
        department {
          id
          name
        }
        office {
          id
          name
        }
        manager {
          id
          name
        }
        copied_managers {
          id
          name
        }
        position {
          id
          name
        }
        working_status
        user_type
        starts_at
      }
    }
  }
`;
export const GET_FORM_DATA = gql`
  query {
    company_offices(first: 3, page: 1) {
      data {
        name
        id
      }
    }
    departments(first: 20, page: 1) {
      data {
        name
        id
      }
    }
    attendance_profiles(first: 50, page: 1) {
      data {
        id
        name
      }
    }
    positions(first: 20, page: 1) {
      data {
        id
        name
      }
    }
    managers {
      name
      id
    }
  }
`;
export const STORE_USER = gql`
  mutation addUser(
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
    store_user_with_user_salary_config(
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
        user_salary_config_input: {
          salary_config: { start_at: "2021-11-23", salary_management_type: 2 }
        }
      }
    ) {
      copied_managers {
        name
      }
      id
    }
  }
`;
export const SEARCH_USER = gql`
  query searchUser($name: String!) {
    users_by_role(
      input: { name: $name, status: "active" }
      first: 100
      page: 1
    ) {
      data {
        id
        name
        img_path
        department {
          id
          name
        }
        office {
          id
          name
        }
        manager {
          id
          name
        }
        copied_managers {
          id
          name
        }
        position {
          id
          name
        }
        working_status
        user_type
        starts_at
      }
    }
  }
`;
