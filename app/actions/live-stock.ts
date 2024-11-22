
import { LiveStockResponse } from "../types/live-stock";
import { BASE_API_URL } from "../constants";

const getLiveLubeStock = async (token: string) => {
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
        return data.results
      } else {
        return null
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };


export { getLiveLubeStock };