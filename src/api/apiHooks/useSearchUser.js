import { useLazyQuery } from "@apollo/client";
import { SEARCH_USER } from "../quereis";

const useSearchUser = () => {
  const [serachUser, { error, data, loading, networkStatus }] = useLazyQuery(
    SEARCH_USER,
    { fetchPolicy: "cache-and-network" }
  );
  console.log("search fired");
  const searchError = error;
  const searchData = data;
  const searchLoading = loading;
  return [
    serachUser,
    { searchError, searchData, searchLoading, networkStatus },
  ];
};
export default useSearchUser;
