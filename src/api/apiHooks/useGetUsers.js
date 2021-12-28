import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USERS } from "../quereis";

const useGetUsers = () => {
  console.log("get users fireeeeeed");
  const [getUsers, { error, data, loading }] = useLazyQuery(GET_USERS);
  const res = data?.users_by_role.data;

  return [getUsers, { error, data, loading }];
};

export default useGetUsers;
