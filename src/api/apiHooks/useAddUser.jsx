import { useMutation } from "@apollo/client";
import { STORE_USER } from "../quereis";

const useAddUser = () => {
  const [addUser, { data, loading, error }] = useMutation(STORE_USER);
  const res = data;
  console.log(data);
  console.log(data);
  return [addUser, { data, loading, error }];
};

export default useAddUser;
