import axios from "axios";

const googleLogin = async (accesstoken) => {
  let res = await axios.post("https://be.wearethedb.com/accounts/login", {
    access_token: accesstoken,
  });
  console.log(res);
  return await res.status;
};

export default googleLogin;
