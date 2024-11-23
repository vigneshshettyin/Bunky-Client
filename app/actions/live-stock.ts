"use server";
import { BASE_API_URL } from "../constants";
import { LiveStockResponse } from "../types/live-stock";

const getLubeLiveStock = async (
  token: string
): Promise<LiveStockResponse | null> => {
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

export { getLubeLiveStock };
