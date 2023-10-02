import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:3000";

const token: string | undefined = Cookies.get("token");
if (token != undefined) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const hasClubs = (): boolean => {
  axios.get("/user/organisations").then((res) => {
    if (res.status === 204) {
      return false;
    }
  });
  return true;
};

export default hasClubs;
