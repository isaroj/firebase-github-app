import Axios from "axios";


export const repoService = (url) => {
    if (!url) throw "something went wrong!";
  return Axios.get(url);
};
