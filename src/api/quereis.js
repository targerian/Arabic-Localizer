import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users_by_role(first: 20, page: 1) {
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
