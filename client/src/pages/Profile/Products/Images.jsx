import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SetLoader } from "../../../redux/loaderSlice";
import { ImageDelete, UploadProductImage } from "../../../../services/products";
import { MdDelete } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

export default function Images({
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [images, setImages] = useState(selectedProduct.Images);
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.users);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.info("Choose a file first");
      return;
    }
    const maxSizeInBytes = 1 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      toast.error("File size should not exceed 5MB");
      return;
    }

    // Check file extension
    const validExtensions = ["jpg", "jpeg", "png", "gif"]; // Extendable list
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      toast.error("Unsupported file type");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      dispatch(SetLoader(true));
      const response = await UploadProductImage(selectedProduct, formData);
      dispatch(SetLoader(false));
      if (response.success) {
        toast.success(response.message);
        setImages([...images, response.response.secure_url]);
        getData(user);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      toast.error(err.message);
    }
    fileInputRef.current.value = "";
  };

  //handling deleting image

  const handleImageDelete = async (index) => {
    setImages((currentImages) => {
      return currentImages.filter((item, i) => i !== index);
    });
    try {
      dispatch(SetLoader(true));
      const response = await ImageDelete(selectedProduct, images);
      dispatch(SetLoader(false));

      if (response.success) {
        setImages(response.response.Images);
        getData(user);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));

      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col  h-auto ">
      <div
        className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm p-8 lg:max-w-4xl  w-full 
       "
      >
        <form method="post" encType={"multipart/form-data"}>
          <div className="flex flex-row flex-wrap">
            {images.map((img, index) => {
              return (
                <>
                  <div className="w-1/4 relative border-4 border-gray-100">
                    <img
                      src={img}
                      className="w-full p-4 h-auto aspect-square "
                      alt="Product-img"
                    />
                    <RxCrossCircled
                      size={22}
                      className="absolute top-0 right-0 translate-y-[-50%] translate-x-[50%] z-[100]"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleImageDelete(index)}
                    />
                  </div>
                </>
              );
            })}
          </div>
          <input
            className="block mt-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            name="file"
            ref={fileInputRef}
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          ></input>
          <button
            data-modal-hide="default-modal"
            onClick={handleUpload}
            type="submit"
            className="py-2.5 mt-4  px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
          >
            Upload Image
          </button>
        </form>
      </div>
    </div>
  );
}
