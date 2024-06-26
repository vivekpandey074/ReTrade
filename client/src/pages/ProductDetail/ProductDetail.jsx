import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { GetAllBids, GetProductById } from "../../../services/products";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import defaultPoster from "../../assets/no-image.jpg";
import { TbCertificate } from "react-icons/tb";
import BidModal from "../../components/BidModal";
import Comments from "../../components/Comments";
import { GetAllComments } from "../../../services/comments";
import { CheckoutHandler, GetProductSoldOut } from "../../../services/payment";

const options = {
  year: "numeric", // e.g., 2024
  month: "long", // e.g., April
  day: "numeric", // e.g., 26
  hour: "2-digit", // e.g., 07 AM/PM based on locale
  minute: "2-digit", // e.g., 44
};

export default function ProductDetail() {
  const [product, SetProduct] = useState(null);
  const [index, setIndex] = useState(0);

  const [tab, setTab] = useState(1);
  const [showProductForm, setShowProductForm] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { id } = useParams();

  let format = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsReponse = await GetAllBids({ product: id });
        const commentResponse = await GetAllComments({ product: id });
        let getSoldOut = await GetProductSoldOut({ product: id });
        console.log(getSoldOut);
        if (!getSoldOut.success) {
          getSoldOut = false;
        } else {
          getSoldOut = true;
        }

        SetProduct({
          ...response.data,
          bids: bidsReponse.data,
          comments: commentResponse.data,
          soldOut: getSoldOut,
        });
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(err.message);
    }
  };

  const handleBuy = async (amount) => {
    try {
      dispatch(SetLoader(true));
      const response = await CheckoutHandler(amount, user, id);
      dispatch(SetLoader(false));
      if (response.success) {
        console.log(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="py-12 sm:py-12 ">
        <div className="container mx-auto px-4">
          <div className="lg:col-gap-12 xl:col-gap-16  grid grid-cols-1 gap-12  lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1 ">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5 w-full h-95">
                  <div className="max-w-xl h-95   overflow-hidden rounded-lg ">
                    <img
                      className="h-full w-full max-w-full object-cover  aspect-[4/3] bg-cover"
                      src={
                        product?.Images[index]
                          ? product?.Images[index]
                          : defaultPoster
                      }
                      alt=""
                    />
                  </div>
                </div>

                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0 sm:h-80 overflow-y-scroll  scrollable-element">
                  <div className="flex flex-row items-start lg:flex-col">
                    {product?.Images?.map((image, index) => {
                      return (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setIndex(index);
                            }}
                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                          >
                            <img
                              className="h-auto w-full object-cover"
                              src={image}
                              alt=""
                            />
                          </button>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                {product?.Name}
              </h1>

              <div className="mt-5 flex items-center">
                <TbCertificate color="orange" size={40} />
                <p className="ml-2 text-sm font-medium text-gray-500">
                  ReTrade Certified
                </p>
                <p className="ml-2 text-sm font-medium text-gray-500">
                  {"Added On: " +
                    " " +
                    new Date(product?.createdAt).toLocaleDateString(
                      "en-US",
                      options
                    )}
                </p>
              </div>

              <h1 className="mt-8 text-base text-gray-900">
                {product?.Description}
              </h1>
              <div className="mt-8 flow-root sm:mt-12">
                <h1 className="text-3xl font-bold">Product Details</h1>
                <div className="text-grey-900 mt-2">
                  <div className="flex flex-row justify-between">
                    <span>Category</span>
                    <span>{product?.Category}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Purchased Year</span>
                    <span>{new Date().getFullYear() - product?.Age}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Bill Available</span>
                    <span>{product?.Bill ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Box Available</span>
                    <span>{product?.Box ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Accessories Available</span>
                    <span>{product?.Accessories ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Warranty Available</span>
                    <span>{product?.Warranty ? "Yes" : "No"}</span>
                  </div>
                </div>
                <h1 className="mt-8 text-3xl font-bold">Owner Details</h1>
                <div className="text-grey-900 mt-2">
                  <div className="flex flex-row justify-between">
                    <span>Owner Name</span>
                    <span>
                      {product?.Seller.firstname.charAt(0).toUpperCase() +
                        product?.Seller.firstname.slice(1).toLowerCase() +
                        " " +
                        product?.Seller.lastname.charAt(0).toUpperCase() +
                        product?.Seller.lastname.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Email</span>
                    <span>{product?.Seller.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h1 className="text-3xl font-bold">
                    {format.format(product?.Price)}
                  </h1>
                </div>

                <button
                  type="button"
                  disabled={product?.soldOut}
                  onClick={() => handleBuy(product?.Price)}
                  className={`${
                    product?.Seller._id === user._id ? "hidden" : ""
                  } inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 mr-3 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {product?.soldOut ? "Sold Out" : "Buy now"}
                </button>
              </div>

              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      className=""
                    ></path>
                  </svg>
                  Free shipping worldwide
                </li>

                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      className=""
                    ></path>
                  </svg>
                  Cancel Anytime
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3  ">
              <div className="border-b border-gray-300 cursor-pointer ">
                <nav className="flex gap-4">
                  <div
                    onClick={() => setTab(1)}
                    className={`inline-flex border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800 ${
                      tab === 1 ? "border-b-2" : " "
                    }`}
                  >
                    {" "}
                    BIDS{" "}
                    <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                      {" "}
                      {product?.bids?.length}{" "}
                    </span>
                  </div>

                  <div
                    onClick={() => setTab(2)}
                    className={`inline-flex items-center   border-gray-900  py-4 text-sm font-medium text-gray-900 ${
                      tab === 2 ? "border-b-2" : ""
                    }`}
                  >
                    Comments
                    <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                      {" "}
                      {product?.comments?.length}{" "}
                    </span>
                  </div>
                </nav>
              </div>

              <div className="mt-8 flow-root">
                {tab == 1 ? (
                  <>
                    {" "}
                    <div className="flex flex-row w-full justify-between">
                      <h1 className=" text-xl sm:text-3xl font-bold">
                        {product?.Seller._id === user._id
                          ? "All bids for product"
                          : "Place your bid for product"}
                      </h1>

                      <button
                        type="button"
                        onClick={() => setShowProductForm(true)}
                        className={`${
                          product?.Seller._id === user._id ? "hidden" : ""
                        } inline-flex items-center  justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-4 py-1 sm:px-12 sm:py-3 mx-1 text-center text-[14px] sm:text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800`}
                      >
                        Place bid
                      </button>
                    </div>
                    {/* bids */}
                    <div className="w-full mt-4 h-40 border-2 border-dashed border-black overflow-scroll no-scrollbar p-3">
                      {product?.bids.length > 0 ? (
                        product?.bids?.map((bid) => {
                          return (
                            <>
                              <div className="w-full bg-[#f3f4f6] mt-2 h-auto bg-yellow-100 p-4 ">
                                <div className="w-full flex flex-row justify-between">
                                  <p>
                                    {bid.buyer.firstname
                                      .charAt(0)
                                      .toUpperCase() +
                                      bid.buyer.firstname
                                        .slice(1)
                                        .toLowerCase() +
                                      " " +
                                      bid?.buyer.lastname
                                        .charAt(0)
                                        .toUpperCase() +
                                      bid?.buyer.lastname
                                        .slice(1)
                                        .toLowerCase()}
                                  </p>
                                  <p>{format.format(bid.Bid)}</p>
                                </div>
                                <div className="w-full flex flex-row justify-between">
                                  <p>Placed On</p>
                                  <p>
                                    {new Date(bid.createdAt).toLocaleDateString(
                                      "en-US",
                                      options
                                    )}
                                  </p>
                                </div>
                                <div className="w-full flex flex-row justify-between">
                                  <p>Contact:</p>
                                  <p>{bid?.buyer.email}</p>
                                </div>
                              </div>
                            </>
                          );
                        })
                      ) : (
                        <h2>No bids for now on this product.</h2>
                      )}
                    </div>
                  </>
                ) : (
                  <Comments
                    comments={product?.comments}
                    getData={getData}
                    productId={id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <BidModal
        showProductForm={showProductForm}
        setShowProductForm={setShowProductForm}
        product={product}
        getData={getData}
      />
    </>
  );
}
