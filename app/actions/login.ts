"use server";
import { UserLoginResponse } from "../types/login";
import { BASE_API_URL } from "../constants";

const handleUserLogin = async (email: string, password: string) => {
  const API_URL = BASE_API_URL + "users/login/";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: UserLoginResponse = await response.json();
    if (response.ok) {
      return data.token;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { handleUserLogin };
