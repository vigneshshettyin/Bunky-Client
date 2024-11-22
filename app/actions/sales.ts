"use server";
import { DailySale } from "../types/sales";
import { BASE_API_URL } from "../constants";

const handleSalesCreate = async (
  token: string,
  product: number,
  quantity: number,
  date: string
) => {
  const API_URL = BASE_API_URL + "daily-lube-sales/";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ product, quantity, date }),
    });

    const data: DailySale = await response.json();
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



export { handleSalesCreate };
