import axios from "axios";
import React from "react";

const getUsers = async () => {
  try {
    const response = await axios.get(
      "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const UserService = {
  getUsers,
};
