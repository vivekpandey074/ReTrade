import { useState } from "react";
import TabsRender from "../../../components/TabsRender";
import ProductDetailForm from "../../../components/ProductDetailForm";
import { useDispatch, useSelector } from "react-redux";
import Images from "./Images";

export default function ProductsForm({
  showProductForm,
  setShowProductForm,
  updateProductFormObj,
  getData,
}) {
  const [active, setActive] = useState(1);

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        !showProductForm ? "hidden" : " "
      } overflow-y-auto overflow-x-hidden fixed  flex glassy z-50 justify-center items-center w-full inset-0 h-[calc(100%)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full overflow-scroll no-scrollbar">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {updateProductFormObj ? "Update Product" : "Add Product"}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setShowProductForm(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* modal body */}
          <div className="flex flex-wrap" id="tabs-id">
            <div className="w-full">
              <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row px-2">
                <li
                  onClick={() => setActive(1)}
                  className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer "
                >
                  <a
                    className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-pink-600 bg-white  ${
                      active === 1 ? "!bg-pink-600 !text-white" : ""
                    }`}
                  >
                    <i className="fas fa-space-shuttle text-base mr-1"></i>
                    Product Details
                  </a>
                </li>
                {updateProductFormObj && (
                  <li
                    onClick={() => setActive(2)}
                    className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer"
                  >
                    <a
                      className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-pink-600 bg-white ${
                        active === 2 ? "!bg-pink-600 !text-white" : ""
                      }`}
                    >
                      <i className="fas fa-cog text-base mr-1"></i> Images
                    </a>
                  </li>
                )}
              </ul>
              {/* Product Details Form */}
              {active === 1 ? (
                <ProductDetailForm
                  setShowProductForm={setShowProductForm}
                  updateProductFormObj={updateProductFormObj}
                />
              ) : (
                <>
                  {/* Here i am sending selectedProduct this props is basically the product object that we want to add image to */}
                  <Images
                    setShowProductForm={setShowProductForm}
                    selectedProduct={updateProductFormObj}
                    getData={getData}
                  />
                </>
              )}
            </div>
          </div>
          {/* modal Footer */}
        </div>
      </div>
    </div>
  );
}
