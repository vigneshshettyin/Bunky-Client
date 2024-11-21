"use server";
import { BASE_API_URL } from "../constants";
import { LubeProductResponse } from "../types/products";


const getActiveLubeProducts = async (token: string) => {
  const API_URL = BASE_API_URL + "products/?is_fuel=False";

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    const data : LubeProductResponse = await response.json();
    if (response.ok) {
      return data;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { getActiveLubeProducts };
