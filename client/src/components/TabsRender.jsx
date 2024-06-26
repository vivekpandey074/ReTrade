import { DeleteProduct, updateProduct } from "../../services/products";
import Products from "../pages/Profile/Products/Products";
import ProductsForm from "../pages/Profile/Products/ProductsForm";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { SetLoader } from "../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { SetProducts } from "../redux/productSlice";
import { useState } from "react";
import AllBidsModal from "./AllBidsModal";

const options = {
  year: "numeric", // e.g., 2024
  month: "long", // e.g., April
  day: "numeric", // e.g., 26
  hour: "2-digit", // e.g., 07 AM/PM based on locale
  minute: "2-digit", // e.g., 44
};

export default function TabsRender({ choice, columns, getData }) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  //below show product form is for updating button
  const [showProductForm, setShowProductForm] = useState(false);
  const [updateProductFormObj, setUpdateProductFormObj] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [currentSelectedProduct, setCurrentSelectedProduct] = useState(null);

  let format = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const handleDelete = async (product) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteProduct(product._id);
      dispatch(SetLoader(false));
      if (response.success) {
        toast.success(response.message);
        const updatedItems = products.filter(
          (item) => item._id !== product._id
        );
        dispatch(SetProducts(updatedItems));
      } else {
        toast.error(`${response.message}`);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(err.message);
    }
  };

  const toggleModal = async (product) => {
    setShowProductForm(true);
    setUpdateProductFormObj(product);
  };

  return (
    <>
      <div className="relative h-full dark:bg-gray-800   flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto ">
          <div className="tab-content tab-space">
            <div className="block" id="tab-profile">
              {choice === 1 ? <Products /> : <> </>}
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {columns.map((colName) => (
                  <>
                    <th scope="col" className="px-6 py-3">
                      {colName}
                    </th>
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => {
                  return (
                    <>
                      {" "}
                      <tr className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {product.Name}
                        </th>
                        <td className="px-6 py-4">{product.Description}</td>
                        <td className="px-6 py-4">
                          {format.format(product.Price)}
                        </td>
                        <td className="px-6 py-4">{product.Category}</td>
                        <td className="px-6 py-4">{product.Age}</td>
                        <td className="px-6 py-4">{product.Status}</td>
                        <td className="px-6 py-4">
                          {new Date(product.createdAt).toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-row justify-between">
                            {" "}
                            <FaEdit
                              size={20}
                              onClick={() => {
                                toggleModal(product);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                            <MdDelete
                              size={22}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(product)}
                            />
                            <span
                              onClick={() => {
                                setCurrentSelectedProduct(product);
                                setShowBidModal(true);
                              }}
                              className="underline ml-2 cursor-pointer"
                            >
                              Show Bids
                            </span>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <h1 className="p-4">No products till now....</h1>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showProductForm && (
        <>
          <ProductsForm
            showProductForm={showProductForm}
            setShowProductForm={setShowProductForm}
            updateProductFormObj={updateProductFormObj}
            getData={getData}
          />
        </>
      )}
      <AllBidsModal
        showBidModal={showBidModal}
        setShowBidModal={setShowBidModal}
        currentSelectedProduct={currentSelectedProduct}
      />
    </>
  );
}
