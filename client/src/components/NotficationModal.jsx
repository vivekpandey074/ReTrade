import React from "react";
import { useNavigate } from "react-router-dom";

const options = {
  year: "numeric", // e.g., 2024
  month: "long", // e.g., April
  day: "numeric", // e.g., 26
  hour: "2-digit", // e.g., 07 AM/PM based on locale
  minute: "2-digit", // e.g., 44
};

export default function NotficationModal({
  notifications,
  reloadNotifications,
  setShowNotificationsModal,
  showNotificationsModal,
}) {
  const navigate = useNavigate();

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        !showNotificationsModal ? "hidden" : " "
      } overflow-y-auto overflow-x-hidden fixed  flex glassy z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setShowNotificationsModal(false)}
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
            <div className=" h-72 w-full p-4 border-4 border-black-300  overflow-y-auto scrollable-element">
              {notifications?.map((notification) => (
                <>
                  <div
                    onClick={() => {
                      navigate(notification.onClick);
                      setShowNotificationsModal(false);
                    }}
                    className=" cursor-pointer w-full rounded-lg bg-gray-200 p-5"
                  >
                    <p className="text-bold italic text-lg">
                      {notification?.title.toUpperCase() + ": "}
                    </p>
                    <p className="text-gray-600">{notification?.message}</p>
                    <p className="text-gray-600 w-full text-end">
                      {" "}
                      {new Date(notification?.createdAt).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
