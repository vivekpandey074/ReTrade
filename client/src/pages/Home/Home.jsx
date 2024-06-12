import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { GetAllProducts } from "../../../services/products";
import { toast } from "react-toastify";
import defaultPoster from "../../assets/no-image.jpg";
import { useNavigate } from "react-router-dom";

const initialState = {
  Price: 10000000,
  Age: 100,
  Category: null,
  SortOrder: "RECENT",
  SearchQuery: "",
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    Status: "approved",
  });
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  let format = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const handleChange = async (e) => {
    setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "SortOrder")
      setFilters({ ...state, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.products);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 ">
        <div className="container px-6 py-8 mx-auto ">
          <div className="lg:flex lg:-mx-2">
            <div className="  space-y-3 py-4 lg:w-1/5 lg:px-4  lg:space-y-4  ">
              <h1 className=" text-xl mb-4  text-white"> Categories</h1>
              <a
                onClick={() => {
                  setState({ ...state, Category: null });
                  setFilters({ ...state, Category: null });
                }}
                className={`block font-medium text-gray-500 dark:text-gray-300 hover:underline ${
                  state.Category === null ? "dark:text-sky-300" : ""
                }  cursor-pointer`}
              >
                All Products
              </a>
              <a
                onClick={() => {
                  setState({ ...state, Category: "Electronics" });
                  setFilters({ ...state, Category: "Electronics" });
                }}
                className={`block font-medium text-gray-500 dark:text-gray-300 hover:underline
                ${
                  state.Category === "Electronics" ? "dark:text-sky-300" : ""
                }  cursor-pointer`}
              >
                Electronics
              </a>
              <a
                onClick={() => {
                  setState({ ...state, Category: "Automobile" });
                  setFilters({ ...state, Category: "Automobile" });
                }}
                className={`block font-medium text-gray-500 dark:text-gray-300 hover:underline ${
                  state.Category === "Automobile" ? "dark:text-sky-300" : ""
                }  cursor-pointer`}
              >
                Automobile
              </a>
              <a
                onClick={() => {
                  setState({ ...state, Category: "Clothings" });
                  setFilters({ ...state, Category: "Clothings" });
                }}
                className={`block font-medium hover:underline text-gray-500 dark:text-gray-300 ${
                  state.Category === "Clothings" ? "dark:text-sky-300" : ""
                }  cursor-pointer`}
              >
                Clothings
              </a>
              <a
                onClick={() => {
                  setState({ ...state, Category: "Books" });
                  setFilters({ ...state, Category: "Books" });
                }}
                className={`block font-medium text-gray-500 dark:text-gray-300 hover:underline
                ${
                  state.Category === "Books" ? "dark:text-sky-300" : ""
                }  cursor-pointer`}
              >
                Books, Stationary & toys
              </a>
              <a
                onClick={() => {
                  setState({ ...state, Category: "Furniture" });
                  setFilters({ ...state, Category: "Furniture" });
                }}
                className={`block font-medium text-gray-500 dark:text-gray-300 hover:underline ${
                  state.Category === "Furniture" ? "dark:text-sky-300" : ""
                }  cursor-pointer`}
              >
                {" "}
                Furniture{" "}
              </a>
              <a
                onClick={() => {
                  setState({ ...state, Category: "Fashion" });
                  setFilters({ ...state, Category: "Fashion" });
                }}
                className={`block font-medium text-gray-500 dark:text-gray-300 hover:underline
                ${
                  state.Category === "Fashion" ? "dark:text-sky-300" : ""
                }  cursor-pointer`}
              >
                Fashion & Cosmetics
              </a>
              <a
                onClick={() => {
                  setState({ ...state, Category: "others" });
                  setFilters({ ...state, Category: "others" });
                }}
                className={`block font-medium text-gray-500 dark:text-gray-300 hover:underline ${
                  state.Category === "others" ? "dark:text-sky-300" : ""
                }  cursor-pointer`}
              >
                Others
              </a>

              <div className="p-3">
                <label
                  htmlFor="minmax-range"
                  className="block flex flex-row w-full justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price (0- 10cr)
                  <p>{"<" + format.format(state.Price)}</p>
                </label>
                <input
                  name="Price"
                  id="minmax-range"
                  type="range"
                  min="0"
                  max="10000000"
                  onChange={handleChange}
                  value={state.Price}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              <div className="p-3">
                <label
                  htmlFor="minmax-range"
                  className="block flex flex-row w-full justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <p>Age (0- 100yrs)</p>
                  <p>{"<" + state.Age}</p>
                </label>
                <input
                  name="Age"
                  id="minmax-range"
                  type="range"
                  min="0"
                  onChange={handleChange}
                  max="100"
                  value={state.Age}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setFilters(state);
                }}
                className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Filter
              </button>
            </div>

            <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
              <div className="flex items-center justify-between text-sm tracking-widest uppercase ">
                <p className="text-gray-500 dark:text-gray-300">
                  {products.length} Items
                </p>

                <div className="flex flex-row gap-2">
                  {" "}
                  <select
                    id="countries"
                    onChange={handleChange}
                    name="SortOrder"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Sort</option>
                    {/* LTH=>Lowest to highest */}
                    <option value="PriceOrderLTH">
                      Price (Lowest to highest)
                    </option>
                    <option value="PriceOrderHTL">
                      Price (Highest to lowest)
                    </option>
                    <option value="AGE">Age (min to max)</option>
                    <option value="RECENT">Recently added</option>
                  </select>
                  <form className="w-full ">
                    <div className="relative">
                      <input
                        type="search"
                        name="SearchQuery"
                        id="default-search"
                        onChange={handleChange}
                        className="block w-full p-4 pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                        required
                      />
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          setFilters(state);
                        }}
                        className="absolute bg-blue-700 inset-y-2 end-0 mr-2 pr-2 rounded-lg  flex  flex-row items-center justify-center ps-3 cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {products?.length == 0 ? (
                  <h1 className="text-white">No Products stay tuned..</h1>
                ) : (
                  products.map((product) => {
                    return (
                      <>
                        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                          <img
                            className="object-cover  w-full rounded-md h-62 xl:h-70 aspect-[4/3]"
                            src={
                              product.Images[0]
                                ? product.Images[0]
                                : defaultPoster
                            }
                            alt="T-Shirt"
                          />

                          <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                            {product.Name}
                          </h4>
                          <div className="flex flex-col w-full">
                            <div className="flex flex-row   justify-between mt-2 w-4/5">
                              <p className="text-blue-500">
                                {format.format(product.Price)}
                              </p>
                              <p className="text-blue-500">
                                {product.Age > 1
                                  ? product.Age + "yrs"
                                  : product.Age + "yr"}
                              </p>
                            </div>
                            <p className="text-white">
                              {Math.floor(
                                (new Date().getTime() -
                                  new Date(product?.createdAt).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              ) + " days ago"}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              navigate(`/product/${product._id}`);
                            }}
                            className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 mx-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                            <span className="mx-1">Buy now</span>
                          </button>
                        </div>
                      </>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
