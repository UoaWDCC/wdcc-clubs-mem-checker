import axios from "axios";

const hasClubs = (): boolean => {
  axios.get("/user/organisations").then((res) => {
    if (res.status === 204) {
      return false;
    }
  });
  return false;
};

export default hasClubs;
