import { useMutation } from "@apollo/client";
import { STORE_USER } from "../mutations";

const useAddUser = () => {
  const [addUser, { data, loading, error }] = useMutation(STORE_USER);
  const addUserData = data;
  const addUserLoading = loading;
  const addUserError = error;
  return [addUser, { addUserData, addUserLoading, addUserError }];
};

export default useAddUser;
