import Axios from "axios";

const url = "https://api.github.com/users/";

export const profileService = (userName) => {
  if (!userName) throw "please give any username!";
  const gitHubUrl = url+userName
  return Axios.get(gitHubUrl);
};
