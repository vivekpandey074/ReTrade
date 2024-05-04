import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { GetAllUsers, UpdateUserStatus } from "../../../services/users";
import { toast } from "react-toastify";

const options = {
  year: "numeric", // e.g., 2024
  month: "long", // e.g., April
  day: "numeric", // e.g., 26
  hour: "2-digit", // e.g., 07 AM/PM based on locale
  minute: "2-digit", // e.g., 44
};

const columns = ["Name", "Email", "Role", "Status", "Created At", "Action"];

export default function Users() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const getAllUserData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllUsers();
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(() => response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error("Error:" + err);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateUserStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        toast.success(response.message);
        getAllUserData();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error("Error:" + err);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <div>
      <div className="relative h-full dark:bg-gray-600  flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
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
              {users.map((user) => {
                return (
                  <>
                    {" "}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">
                        {user.firstname.toUpperCase() +
                          " " +
                          user.lastname.toUpperCase()}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role.toUpperCase()}</td>
                      <td className="px-6 py-4">{user.status.toUpperCase()}</td>
                      <td className="px-6 py-4">
                        {new Date(user.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          {user.status === "active" && (
                            <span
                              className="underline cursor-pointer text-red-500"
                              onClick={() =>
                                onStatusUpdate(user._id, "blocked")
                              }
                            >
                              Block
                            </span>
                          )}
                          {user.status === "blocked" && (
                            <span
                              className="underline cursor-pointer text-green-500"
                              onClick={() => onStatusUpdate(user._id, "active")}
                            >
                              Unblock
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
