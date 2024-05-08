import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loaderSlice";
import { GetAllBids } from "../../services/products";
import { toast } from "react-toastify";

const columns = [
  "Name",
  "Bid Amount",
  "Bid Date",
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

export default function AllBidsModal({
  showBidModal,
  setShowBidModal,
  currentSelectedProduct,
}) {
  const dispatch = useDispatch();
  const [bidsData, setBidsData] = useState([]);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        product: currentSelectedProduct._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (currentSelectedProduct) {
      getData();
    }
  }, [currentSelectedProduct]);

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        !showBidModal ? "hidden" : " "
      } overflow-y-auto overflow-x-hidden fixed  flex glassy z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-6xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Bids:{` ${currentSelectedProduct?.Name}`}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setShowBidModal(false)}
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
            </button>
          </div>
          {/* modal body */}
          <div className="flex bg-white rounded-lg shadow-lg  mx-auto max-w-sm p-8 lg:max-w-6xl   w-full ">
            <div className="h-72 w-full border-4 border-black-300  ">
              <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                  {bidsData.map((bid) => {
                    return (
                      <>
                        <tr className="bg-white border-b text-black">
                          <td className="px-6 py-4">
                            {bid.buyer.firstname.toUpperCase() +
                              " " +
                              bid.buyer.lastname.toUpperCase()}
                          </td>
                          <td className="px-6 py-4">{bid.Bid}</td>
                          <td className="px-6 py-4">
                            {new Date(bid.createdAt).toLocaleDateString(
                              "en-US",
                              options
                            )}
                          </td>
                          <td className="px-6 py-4">{bid.Message}</td>
                          <td className="px-6 py-4">{bid.buyer.email}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
