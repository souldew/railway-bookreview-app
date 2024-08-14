import axios from "axios";
import { url } from "../const";

export const fetchUserInfo = async (token: string) => {
  const response = await axios.get(
    `${url}/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
  const name = response.data.name;
  const iconUrl = response.data.iconUrl;
  return {name: name, iconUrl: iconUrl};
};