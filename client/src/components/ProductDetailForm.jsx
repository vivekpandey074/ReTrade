import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loaderSlice";
import { AddProduct, updateProduct } from "../../services/products";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { SetProducts } from "../redux/productSlice";

const initialState = {
  Name: "",
  Description: "",
  Price: "",
  Age: "",
  Category: " ",
  Bill: false,
  Warranty: false,
  Box: false,
  Accessories: false,
  // Seller: "6627e8c8e9b46a75ae69e5c4",
  // Status: "pending",
};

export default function ProductDetailForm({
  setShowProductForm,
  updateProductFormObj: UO, //UO stands for update object
}) {
  let initialStateFinal = UO ? UO : initialState;
  const [state, setState] = useState(initialStateFinal);
  const [focused, setFocus] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);

  const {
    Name,
    Description,
    Price,
    Age,
    Category,
    Bill,
    Warranty,
    Box,
    Accessories,
  } = state;

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setState(() => ({ ...state, [e.target.name]: e.target.checked }));
    } else setState(() => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleProductFormSubmit = async (e) => {
    e.preventDefault();
    const obj = { ...state, Seller: user._id, Status: "pending" };
    setState(obj);

    try {
      dispatch(SetLoader(true));
      const response = await AddProduct(obj);
      dispatch(SetLoader(false));
      if (response.success) {
        toast.success(`Product added successfully.`);
        dispatch(SetProducts([...products, response.data]));
        setShowProductForm(false);
      } else {
        toast.error(`Server:` + response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(`Server:Something went wrong while adding product.` + err);
    }
  };

  const handleUpdateFormSubmit = async (e, product) => {
    e.preventDefault();
    console.log(state);

    try {
      dispatch(SetLoader(true));
      const response = await updateProduct(product);
      dispatch(SetLoader(false));

      if (response.success) {
        toast.success(response.message);
        const updateProductList = products.filter(
          (item) => item._id != product._id
        );
        dispatch(SetProducts([...updateProductList, response.data]));
        setShowProductForm(false);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col  h-auto">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm p-8 lg:max-w-4xl  w-full ">
          <form
            method="POST"
            onSubmit={
              UO
                ? (e) => {
                    handleUpdateFormSubmit(e, state);
                  }
                : (e) => {
                    handleProductFormSubmit(e);
                  }
            }
            className="  w-full"
          >
            <div className="mt-4 ">
              <label
                htmlFor="Name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Name
              </label>
              <input
                name="Name"
                id="Name"
                placeholder="Enter Product Name"
                required
                autoComplete="off"
                value={Name}
                onChange={handleChange}
                onBlur={() => setFocus(true)}
                focused={focused.toString()}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border  inputField  border-gray-300 rounded py-2 px-4 block  w-full appearance-none"
                type="text"
              />
              <span className="error-msg">*Product name is required!</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  htmlFor="Description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Product Description
                </label>
              </div>
              <textarea
                name="Description"
                id="Description"
                required
                autoComplete="off"
                placeholder="Description"
                value={Description}
                onChange={handleChange}
                onBlur={() => setFocus(true)}
                focused={focused.toString()}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border h-48  inputField  border-gray-300 rounded py-2 px-4 block w-full appearance-none resize-none"
                type="text"
              />
              <span className="error-msg">
                *Product description is required
              </span>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                {" "}
                <div className="flex justify-between">
                  <label
                    htmlFor="Price"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Price (&#8377;)
                  </label>
                </div>
                <input
                  name="Price"
                  id="Price"
                  required
                  autoComplete="off"
                  placeholder="Price"
                  value={Price}
                  onChange={handleChange}
                  onBlur={() => setFocus(true)}
                  focused={focused.toString()}
                  min={0}
                  max={100000000}
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border inputField  border-gray-300 rounded py-2 px-4 block w-full appearance-none "
                  type="number"
                />
                <span className="error-msg">*Product price is invalid</span>
              </div>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="Age"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Product Age (in years)
                  </label>
                </div>
                <input
                  name="Age"
                  id="Age"
                  required
                  autoComplete="off"
                  placeholder="Product Age"
                  value={Age}
                  onChange={handleChange}
                  min={0}
                  max={100}
                  onBlur={() => setFocus(true)}
                  focused={focused.toString()}
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border   inputField  border-gray-300 rounded py-2 px-4 block w-full appearance-none "
                  type="number"
                />
                <span className="error-msg">*Product Age is invalid</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  htmlFor="Category"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Product Category
                </label>
              </div>

              <select
                name="Category"
                value={Category}
                id="Category"
                required
                onBlur={() => setFocus(true)}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border   inputField  border-gray-300 rounded py-2 px-4 block w-full appearance-none "
                onChange={handleChange}
                defaultValue={" "}
              >
                <option value=" ">Please select product category</option>
                <option value="Electronics">Electronics</option>
                <option value="Automobile">Automobile</option>
                <option value="Clothings">Clothings</option>
                <option value="Books">Books,Stationary & Toys</option>
                <option value="Furniture">Furniture</option>
                <option value="Fashion">Fashion & Cosmetics</option>
                <option value="others">others</option>
              </select>

              {focused && Category === " " && (
                <span
                  className={`${Category === " " ? "display" : " "} error-msg`}
                >
                  *Product Category is required
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-col">
              <label>
                <input
                  type="checkbox"
                  name="Bill"
                  checked={Bill}
                  onChange={handleChange}
                />{" "}
                Bill Available
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Warranty"
                  checked={Warranty}
                  onChange={handleChange}
                />{" "}
                Warranty Available
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Box"
                  checked={Box}
                  onChange={handleChange}
                />{" "}
                Box Available
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Accessories"
                  checked={Accessories}
                  onChange={handleChange}
                />{" "}
                Accessories Available
              </label>
            </div>
            <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="default-modal"
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {UO ? "Update Product" : "Add Product"}
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={() => setShowProductForm(false)}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
