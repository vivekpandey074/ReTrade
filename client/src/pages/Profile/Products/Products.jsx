import React, { useState } from "react";
import ProductsForm from "./ProductsForm";

export default function Products() {
  const [showProductForm, setShowProductForm] = useState(false);

  return (
    <div className="flex justify-end">
      <button
        type="button"
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800  focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 "
        onClick={() => setShowProductForm(true)}
      >
        Add Product
      </button>
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
        />
      )}
    </div>
  );
}
