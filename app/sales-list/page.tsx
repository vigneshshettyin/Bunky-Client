"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search, Loader2 } from "lucide-react";
import Navbar from "../components/navbar";

// Mock data for demonstration
const mockData = [
  {
    id: 1,
    product_name: "Motor Oil",
    product_price: 25.99,
    quantity: 5,
    total_price: 129.95,
    date: "2023-05-01",
    updated_at: "2023-05-01T10:30:00Z",
  },
  {
    id: 2,
    product_name: "Transmission Fluid",
    product_price: 15.5,
    quantity: 3,
    total_price: 46.5,
    date: "2023-05-02",
    updated_at: "2023-05-02T14:45:00Z",
  },
  {
    id: 3,
    product_name: "Brake Fluid",
    product_price: 10.75,
    quantity: 2,
    total_price: 21.5,
    date: "2023-05-03",
    updated_at: "2023-05-03T09:15:00Z",
  },
  {
    id: 4,
    product_name: "Grease",
    product_price: 8.99,
    quantity: 10,
    total_price: 89.9,
    date: "2023-05-04",
    updated_at: "2023-05-04T16:20:00Z",
  },
  {
    id: 5,
    product_name: "Motor Oil",
    product_price: 25.99,
    quantity: 2,
    total_price: 51.98,
    date: "2023-05-05",
    updated_at: "2023-05-05T11:00:00Z",
  },
];

export default function LubricantSalesDashboard() {
  const [salesData, setSalesData] = useState(mockData);
  const [filteredData, setFilteredData] = useState(salesData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real application, you would fetch data from an API here
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
        setSalesData(mockData);
        setFilteredData(mockData);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
                              "Date",
                              "Updated At",
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
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.product_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${item.product_price.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${item.total_price.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(item.date)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDateTime(item.updated_at)}
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
