import { useQuery } from "@apollo/client";
import { GET_USERS } from "../quereis";

const useGetUsers = () => {
  const { error, data, loading, refetch } = useQuery(GET_USERS);
  console.log(data);
  const res = data?.users_by_role.data;
  return { error, res, loading, refetch };
};

export default useGetUsers;
