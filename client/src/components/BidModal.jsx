import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SetLoader } from "../redux/loaderSlice";
import { PlaceNewBid } from "../../services/products";
import { AddNotification } from "../../services/notifications";

const initialState = {
  Message: "",
  Bid: null,
};

export default function BidModal({
  showProductForm,
  setShowProductForm,
  product,
  getData,
}) {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid({
        ...state,
        buyer: user._id,
        seller: product?.Seller,
        product: product?._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        toast.success(response.message);

        //send notifcation to seller
        await AddNotification({
          title: "New Bid Placed",
          message: `A new bid has been placed on your product ${
            product?.Name
          } by ${user.firstname + " " + user.lastname} for ${state.Bid}`,
          user: product.Seller._id,
          onClick: "/Product",
          read: false,
        });

        getData();
        setShowProductForm(false);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(err.message);
    }
  };

  const handleChange = (e) => {
    setState(() => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        !showProductForm ? "hidden" : " "
      } overflow-y-auto overflow-x-hidden fixed  flex glassy z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              PLACE A BID
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
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm p-8 lg:max-w-4xl  w-full ">
            <form method="POST" onSubmit={handleBidSubmit} className="w-full">
              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="Description"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Message
                  </label>
                </div>
                <textarea
                  name="Message"
                  required
                  id="Message"
                  autoComplete="off"
                  placeholder="type you message"
                  value={state.Message}
                  onChange={handleChange}
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border h-24  inputField  border-gray-300 rounded py-2 px-4 block w-full appearance-none resize-none"
                  type="text"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  {" "}
                  <div className="flex justify-between">
                    <label
                      htmlFor="Price"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Your Bid (&#8377;)
                    </label>
                  </div>
                  <input
                    name="Bid"
                    id="Bid"
                    required
                    autoComplete="Bid"
                    placeholder="Bid"
                    value={state.Bid}
                    onChange={handleChange}
                    min={0}
                    max={100000000}
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border inputField  border-gray-300 rounded py-2 px-4 block w-full appearance-none "
                    type="number"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end p-4 md:p-5  rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Done
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
      </div>
    </div>
  );
}
