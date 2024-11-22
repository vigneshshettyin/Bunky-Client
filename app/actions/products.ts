"use server";
import { BASE_API_URL } from "../constants";
import { LubeProductResponse } from "../types/products";
import { LiveStockResponse } from "../types/live-stock";

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

    const data: LubeProductResponse = await response.json();
    if (response.ok) {
      return data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getLubeLiveStock = async (token: string) => {
  const API_URL = BASE_API_URL + "lube-live-stock/";

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    const data: LiveStockResponse = await response.json();
    console.log(data);
    if (response.ok) {
      return data.results;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { getActiveLubeProducts, getLubeLiveStock };
