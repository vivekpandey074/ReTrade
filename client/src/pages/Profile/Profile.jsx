import { useEffect, useState } from "react";
import TabsRender from "../../components/TabsRender";
import { useDispatch } from "react-redux";
import { GetAllProducts } from "../../../services/products";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { SetLoader } from "../../redux/loaderSlice";
import { SetProducts } from "../../redux/productSlice";

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
  const [active, setActive] = useState(1);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllProducts();
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
              className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-pink-600  ${
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
              <i className="fas fa-cog text-base mr-1"></i> Bids
            </a>
          </li>
          <li
            onClick={() => setActive(3)}
            className="-mb-px mr-2 last:mr-0 flex-auto text-center"
          >
            <a
              className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-pink-600 bg-white ${
                active === 3 ? "!bg-pink-600 !text-white" : ""
              }`}
            >
              <i className="fas fa-briefcase text-base mr-1"></i> General
            </a>
          </li>
        </ul>
        {active === 1 ? (
          //passing getData for image upload other wise it has nothing to do with form
          <TabsRender choice={1} columns={productColumn} getData={getData} />
        ) : active === 2 ? (
          <TabsRender choice={2} />
        ) : (
          <TabsRender choice={3} />
        )}
      </div>
    </div>
  );
}
