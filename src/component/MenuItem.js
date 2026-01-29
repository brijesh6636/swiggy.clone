import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../Const/cartSlice";
import { imagelink } from "../Const/Const";

export const MenuItem = ({ items }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handlebutton = (item) => {
    dispatch(addItem(item));

    // Retrieve existing cart items from local storage or initialize an empty array
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    // Add the new item to the existing cart items
    const updatedCartItems = [...existingCartItems, item];
    // Update local storage with the updated cart items
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));

    // Set added state to true to trigger the effect
    setAdded(true);

    // Reset added state after 1 second to remove the effect
    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <div className="border-b border-slate-300 flex justify-between py-4 px-4">
      <div className="flex-1">
        <span className="font-bold text-base block mb-2">{items.card?.info?.name}</span>
        <span className="font-bold text-base block">
          ₹
          {items.card?.info?.price / 100 ||
            items.card?.info?.defaultPrice / 100}
        </span>
      </div>

      <div className="relative ml-4">
        <img
          src={imagelink + items.card?.info?.imageId}
          className="w-[150px] h-[150px] rounded-lg object-cover"
          alt="Menu Food "
        />
        <button
          type="button"
          className={`${added ? "bg-green-500 text-white" : "bg-green-600 text-gray-100"
            } absolute transform -translate-x-1/2 left-1/2 bottom-[-12px] py-2.5 px-5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200`}
          onClick={() => handlebutton(items)}
        >
          {added ? "Added" : "Add +"}
        </button>
      </div>
    </div>
  );
};
