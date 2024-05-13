import { useEffect, useState } from "react";
import TabsRender from "../../components/TabsRender";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../../services/products";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { SetLoader } from "../../redux/loaderSlice";
import { SetProducts } from "../../redux/productSlice";
import MyBids from "../../components/MyBids";

const productColumn = [
  "Product Name",
  "Description",
  "Price",
  "Category",
  "Age",
  "Status",
  "Added On",
  "Action",
];
export default function Profile() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async (user) => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllProducts({
        Seller: user._id,
      });
      dispatch(SetLoader(false));

      if (response.success) {
        dispatch(SetProducts(response.products));
      }
    } catch (err) {
      dispatch(SetLoader(false));

      toast.error(`Server:Something went wrong while fetching product.`);
    }
  };

  useEffect(() => {
    getData(user);
  }, []);

  return (
    <div className="flex flex-wrap h-full dark:bg-gray-900">
      <div className="w-full ">
        <div
          className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal bg-pink-600 text-white`}
        >
          <i className="fas fa-space-shuttle text-base mr-1"></i>Products
        </div>
      </div>
      <TabsRender choice={1} columns={productColumn} getData={getData} />
    </div>
  );
}
