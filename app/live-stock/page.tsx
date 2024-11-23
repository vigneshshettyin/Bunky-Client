"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLubeLiveStock } from "../actions/live-stock";
import { LiveStock } from "../types/live-stock";
import Navbar from "../components/Navigation";
import Loading from "../components/Loading";

export default function LubricantLiveStock() {
  const router = useRouter();
  const [liveStock, setLiveStock] = useState<LiveStock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalLubeValue, setTotalLubeValue] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getLubeLiveStock(token);
        if (data) {
          setLiveStock(data.results);
          setTotalLubeValue(data.total_value);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Navbar />
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Lubricant Live Stock
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <div className="overflow-x-auto">
                      <div className="mb-4">
                        <span className="font-bold text-black">Total Value:</span> 
                        <span className="ml-2 text-black">₹{totalLubeValue}</span>
                      </div>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {[
                              "Product Name",
                              "Product Price",
                              "Quantity",
                              "Total Price",
                            ].map((header) => (
                              <th
                                key={header}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                              >
                                <div className="flex items-center">
                                  {header}
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {liveStock.map((item) => (
                            <tr
                              key={item.product_id}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.product_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ₹{item.price_per_item.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.remaining_stock}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ₹{item.total_value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
