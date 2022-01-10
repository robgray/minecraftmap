import config from "../config.json"
import { Client } from "../api/client";

export const useApi = () => {

  return new Client(config.baseUrl);
}

export default useApi;