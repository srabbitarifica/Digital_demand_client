import axios from "axios";

export const getData = (loading: (value: boolean) => void) => {

  return axios
    // .get(`${process.env.NEXT_PUBLIC_API_URL}data`)
    // .get("https://serverd.azurewebsites.net/data")
    .get("https://serverdashboardtest.azurewebsites.net/data")
    .then((response) => {
      loading(true);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
