import axios from "axios";

export const signupApi = (
  username: string,
  password: string,
  email: string,
  setToastMessage: (value: string) => void
) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}signup`, {
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
