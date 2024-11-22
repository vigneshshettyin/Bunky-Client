"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search, Loader2 } from "lucide-react";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import { getLiveLubeStock } from "../actions/sales";
import { LiveStock } from "../types/live_stock";

export default function LubricantSalesDashboard() {

  const router = useRouter();

  const [salesData, setSalesData] = useState([] as LiveStock[]);
  const [filteredData, setFilteredData] = useState(salesData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    setToken(token || "");
  }, [router]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        getLiveLubeStock(token).then((data) => {
          if (data) {
            setSalesData(data);
            setFilteredData(data);
          }
        });
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDateFilter = () => {
    // API call to filter data
    console.log("Filtering data from:", startDate, "to:", endDate);
  };

  const handleSort = (column: string) => {
    console.log("Sorting by:", column);
    // API call to sort data
    setSortColumn(column);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });
  // };

  // const formatDateTime = (dateTimeString: string) => {
  //   return new Date(dateTimeString).toLocaleString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 [&_.group:hover_.absolute]:visible [&_.group:hover_.absolute]:opacity-100">
      <Navbar />
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Lubricant Sales Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <input
                        type="date"
                        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 transition duration-150 ease-in-out text-black"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <span className="hidden sm:block text-gray-500">to</span>
                      <input
                        type="date"
                        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 transition duration-150 ease-in-out text-black"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                      <button
                        onClick={handleDateFilter}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 shadow-sm transition duration-150 ease-in-out"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Filter
                      </button>
                    </div>
                  </div>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-600">{error}</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {[
                              "Product Name",
                              "Product Price",
                              "Quantity",
                              "Total Price",
                              // "Date",
                              // "Updated At",
                            ].map((header) => (
                              <th
                                key={header}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                  handleSort(
                                    header.toLowerCase().replace(" ", "_")
                                  )
                                }
                              >
                                <div className="flex items-center">
                                  {header}
                                  {sortColumn ===
                                    header.toLowerCase().replace(" ", "_") &&
                                    (sortDirection === "asc" ? (
                                      <ChevronUp className="h-4 w-4 ml-1" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4 ml-1" />
                                    ))}
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredData.map((item) => (
                            <tr key={item.product_id} className="hover:bg-gray-50">
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
                              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(item.date)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDateTime(item.updated_at)}
                              </td> */}
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
