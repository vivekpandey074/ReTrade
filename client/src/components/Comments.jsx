import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loaderSlice";
import { toast } from "react-toastify";
import { PlaceComment } from "../../services/comments";

const options = {
  year: "numeric", // e.g., 2024
  month: "long", // e.g., April
  day: "numeric", // e.g., 26
  hour: "2-digit", // e.g., 07 AM/PM based on locale
  minute: "2-digit", // e.g., 44
};

export default function Comments({ comments = [], getData, productId }) {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const handleSubmit = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceComment({
        user: user._id,
        message: commentText,
        product: productId,
      });
      dispatch(SetLoader(true));

      if (response.success) {
        toast.success(response.message);
        setCommentText("");
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-row w-full justify-between ">
        <textarea
          type="text"
          required
          placeholder="Add your comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full bg-gray-200  mx-2  p-2 h-24 rounded-lg outline-none resize-none scrollable-element "
        />
      </div>
      <div className="w-full flex flex-row justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className={`my-2 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-4 py-2 sm:px-12 sm:py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800`}
        >
          Commment
        </button>
      </div>
      {/* ALl comments */}
      <div className="w-full mt-4 h-60 border-2 border-dashed border-black overflow-scroll no-scrollbar p-3">
        {comments?.length > 0 ? (
          comments?.map((comment) => {
            return (
              <>
                <div className="bg-gray-300 my-2 p-4 rounded-lg  shadow-md">
                  <h3 className="text-lg font-bold">
                    {comment.user.firstname.toUpperCase() +
                      " " +
                      comment.user.lastname.toUpperCase()}
                  </h3>
                  <p className="text-gray-700 text-sm mb-2">
                    {"Posted on: " +
                      new Date(comment.createdAt).toLocaleDateString(
                        "en-US",
                        options
                      )}
                  </p>
                  <p className="text-gray-700">{comment.message}</p>
                </div>
              </>
            );
          })
        ) : (
          <h2>No comments for now on this product.</h2>
        )}
      </div>
    </>
  );
}
