import { useLocation } from "react-router-dom";
import qs from "qs";

export const useQuery = <T>() => {
  const { search } = useLocation();

  return qs.parse(search.slice(1)) as unknown as T;
};
