import { Client } from "../api/client";

export const useApi = () => {
  return new Client(process.env.REACT_APP_API_URL);
}

export default useApi;