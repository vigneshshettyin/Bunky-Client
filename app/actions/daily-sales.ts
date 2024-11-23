"use server";
import { BASE_API_URL } from "../constants";
import { DailySalesRequest, DailySalesResponse } from "../types/daily-sales";



const constructQuery = (req: DailySalesRequest) => {
  const { startDate, endDate, page, pageSize } = req;
  return `?start_date=${startDate}&end_date=${endDate}&page=${page}&page_size=${pageSize}`;
};

const getDailySalesStock = async (token: string, req: DailySalesRequest) => {
  const API_URL = BASE_API_URL + "daily-lube-sales/" + constructQuery(req);
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    const data: DailySalesResponse = await response.json();
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

export { getDailySalesStock };
