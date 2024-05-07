import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { UpdateProductStatus } from "../../../services/products";
import { toast } from "react-toastify";

const options = {
  year: "numeric", // e.g., 2024
  month: "long", // e.g., April
  day: "numeric", // e.g., 26
  hour: "2-digit", // e.g., 07 AM/PM based on locale
  minute: "2-digit", // e.g., 44
};

const columns = [
  "Name",
  "Seller",
  "Description",
  "Price",
  "Category",
  "Age",
  "Status",
  "Added On",
  "Action",
];

export default function Products({ getData }) {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  let format = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateProductStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        toast.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error("Error:" + err);
    }
  };

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
              {products.map((product) => {
                return (
                  <>
                    {" "}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {product.Name}
                      </th>
                      <td className="px-6 py-4">
                        {product.Seller.firstname.toUpperCase() +
                          " " +
                          product.Seller.lastname.toUpperCase()}
                      </td>
                      <td className="px-6 py-4">{product.Description}</td>
                      <td className="px-6 py-4">
                        {format.format(product.Price)}
                      </td>
                      <td className="px-6 py-4">{product.Category}</td>
                      <td className="px-6 py-4">{product.Age}</td>
                      <td className="px-6 py-4">
                        {product.Status.toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(product.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          {product.Status === "pending" && (
                            <span
                              className="underline cursor-pointer text-green-500"
                              onClick={() =>
                                onStatusUpdate(product._id, "approved")
                              }
                            >
                              Approve
                            </span>
                          )}
                          {product.Status === "pending" && (
                            <span
                              className="underline cursor-pointer text-red-500"
                              onClick={() =>
                                onStatusUpdate(product._id, "rejected")
                              }
                            >
                              Reject
                            </span>
                          )}
                          {product.Status === "approved" && (
                            <span
                              className="underline cursor-pointer text-red-500"
                              onClick={() =>
                                onStatusUpdate(product._id, "blocked")
                              }
                            >
                              Block
                            </span>
                          )}
                          {product.Status === "blocked" && (
                            <span
                              className="underline cursor-pointer text-red-500"
                              onClick={() =>
                                onStatusUpdate(product._id, "approved")
                              }
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
