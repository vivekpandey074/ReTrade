import { useEffect, useState } from "react";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { GetAllProducts } from "../../../services/products";
import { SetProducts } from "../../redux/productSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Users from "./Users";

export default function Admin() {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllProducts(null);
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
    if (user.role !== "admin") {
      navigate("/");
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap h-full dark:bg-gray-600" id="tabs-id">
      <div className="w-full ">
        <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row px-2 ">
          <li
            onClick={() => setActive(1)}
            className="-mb-px mr-2 last:mr-0 flex-auto text-center"
          >
            <a
              className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-pink-600 bg-white  ${
                active === 1 ? "!bg-pink-600 !text-white" : ""
              }`}
            >
              <i className="fas fa-space-shuttle text-base mr-1"></i>Products
            </a>
          </li>
          <li
            onClick={() => setActive(2)}
            className="-mb-px mr-2 last:mr-0 flex-auto text-center"
          >
            <a
              className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-pink-600 bg-white ${
                active === 2 ? "!bg-pink-600 !text-white" : ""
              }`}
            >
              <i className="fas fa-cog text-base mr-1"></i> Users
            </a>
          </li>
        </ul>
        {active === 1 ? (
          <>
            <Products getData={getData} />
          </>
        ) : (
          <Users />
        )}
      </div>
    </div>
  );
}
