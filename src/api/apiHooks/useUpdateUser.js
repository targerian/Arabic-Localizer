import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../mutations";

const useUpdateUser = () => {
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
  const updateUserData = data;
  const updateUserLoading = loading;
  const updateUserError = error;
  return [updateUser, { updateUserData, updateUserLoading, updateUserError }];
};

export default useUpdateUser;
