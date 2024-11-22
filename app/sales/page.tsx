"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Navbar from "../components/navbar";
import { getActiveLubeProducts } from "../actions/products";
import { useRouter } from "next/navigation";
import { LubeProduct } from "../types/products";
import { handleSalesCreate } from "../actions/sales";
import Loading from "../components/loading";

export default function LubricantSalesForm() {

  const router = useRouter();

  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([] as LubeProduct[]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    setToken(token || "");
  }, [router]);

  useEffect(() => {
    getActiveLubeProducts(token).then((data) => {
      if (data) {
        setProducts(data.results);
        setIsLoading(false);
      }
    });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!product || !quantity || !date) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Submitting sale data:", { product, quantity, date });

    try {
      setIsLoading(true);
      handleSalesCreate(token, parseInt(product), quantity, date).then((data) => {
        if (data) {
          setSuccess(true);
          setIsLoading(false);
        } else {
          setError("Failed to submit data. Please try again.");
        }
      }
      );
      setProduct("");
      setQuantity(0);
      setDate("");
    } catch (err) {
      setError("Failed to submit data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Navbar />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Lubricant Sales Form
            </h1>
          </div>
        </header>
        {
          // turnery operator
          isLoading ? (
            <Loading/>
          ) : (
            <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold mb-1">
                      Enter Sale Data
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="product"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Product
                        </label>
                        <select
                          id="product"
                          name="product"
                          required
                          className="block w-full rounded-md border border-gray-300 bg-gray-50 py-3 px-4 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition duration-200"
                          value={product}
                          onChange={(e) => setProduct(e.target.value)}
                        >
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="quantity"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          required
                          min="1"
                          max="100"
                          className="block w-full rounded-md border border-gray-300 bg-gray-50 py-3 px-4 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition duration-200"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Date
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            className="block w-full rounded-md border border-gray-300 bg-gray-50 py-3 px-4 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition duration-200"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                      </div>
                      {error && (
                        <div className="rounded-md bg-red-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-5 w-5 text-red-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-red-800">
                                {error}
                              </h3>
                            </div>
                          </div>
                        </div>
                      )}
                      {success && (
                        <div className="rounded-md bg-green-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-5 w-5 text-green-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-green-800">
                                Data submitted successfully!
                              </h3>
                            </div>
                          </div>
                        </div>
                      )}
                      <div>
                        <button
                          type="submit"
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                              Processing...
                            </>
                          ) : (
                            "Submit Sales Data"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
          )
        }

      </div>
    </div>
  );
}
