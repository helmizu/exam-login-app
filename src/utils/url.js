import queryString from "query-string";
import { useLocation } from "react-router-dom"

export const getUrlQuery = () => {
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search);
  return parsedQuery;
}

export const getUrlHash = () => {
  const location = useLocation();
  const parsedHash = queryString.parse(location.hash);
  return parsedHash;
}