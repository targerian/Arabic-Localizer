import { useLazyQuery } from "@apollo/client";
import { SEARCH_USER } from "../quereis";

const useSearchUser = () => {
  const [serachUser, { error, data, loading }] = useLazyQuery(SEARCH_USER);
  console.log("search fired");
  const searchError = error;
  const searchData = data;
  const searchLoading = loading;
  return [serachUser, { searchError, searchData, searchLoading }];
};
export default useSearchUser;
