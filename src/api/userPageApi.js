import axios from "axios";
import { USERPAGE } from "./apiIndex";

export const UserPageApi = () => {
  return axios.get(USERPAGE);
};
