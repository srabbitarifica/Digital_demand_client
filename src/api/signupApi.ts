import axios from "axios";
// https://serverd.azurewebsites.net/signup
export const signupApi = (
  username: string,
  password: string,
  email: string,
  setToastMessage: (value: string) => void
) => {
  return axios
    .post("https://serverdashboardtest.azurewebsites.net/signup", {
      username,
      email,
      password,
    })
    .then((response) => {
      setToastMessage(response.data.message);
      return response.data;
    })
    .catch((error) => {
      setToastMessage(error.response.data.message);
      console.error("Error logging in:", error);
    });
};
