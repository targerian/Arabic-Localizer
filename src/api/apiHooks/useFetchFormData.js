import { useQuery } from "@apollo/client";
import { GET_FORM_DATA } from "../quereis";

const useFetchFormData = () => {
  const { error, data, loading, refetch } = useQuery(GET_FORM_DATA);
  const res = data;
  console.log(data);
  return { error, res, loading, refetch };
};

export default useFetchFormData;
