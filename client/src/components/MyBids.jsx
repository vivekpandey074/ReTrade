import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SetLoader } from "../redux/loaderSlice";
import { GetAllBids } from "../../services/products";

const columns = [
  "Product",
  "Bid Placed On",
  "Seller",
  "Bid Amount",
  "Original Amount",
  "Message",
  "Contact Details",
];
const options = {
  year: "numeric", // e.g., 2024
  month: "long", // e.g., April
  day: "numeric", // e.g., 26
  hour: "2-digit", // e.g., 07 AM/PM based on locale
  minute: "2-digit", // e.g., 44
};

export default function MyBids() {
  const [Bids, setBids] = useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  let format = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const getAllMyBids = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setBids(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getAllMyBids();
  }, []);

  return (
    <>
      {" "}
      <div className="dark:bg-gray-900 pb-10">
        <div className="w-full text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal bg-pink-600 text-white">
          <i className="fas fa-space-shuttle text-base mr-1"></i>My Bids
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
            {Bids.length > 0 ? (
              Bids?.map((bid) => {
                return (
                  <>
                    {" "}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {bid.product.Name}
                      </th>
                      <td className="px-6 py-4">
                        {new Date(bid.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {bid.seller.firstname.toUpperCase() +
                          " " +
                          bid.seller.lastname.toUpperCase()}
                      </td>
                      <td className="px-6 py-4">{format.format(bid.Bid)}</td>
                      <td className="px-6 py-4">
                        {format.format(bid.product.Price)}
                      </td>

                      <td className="px-6 py-4">{bid.Message}</td>

                      <td className="px-6 py-4">{bid.seller.email}</td>
                    </tr>
                  </>
                );
              })
            ) : (
              <h1 className="text-white ml-4 mt-4">
                No Bids has been placed till now.
              </h1>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
