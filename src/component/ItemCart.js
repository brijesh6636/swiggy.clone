import { useDispatch } from "react-redux";
// import { addItem } from "../Const/cartSlice";
import { removeItem } from "../Const/cartSlice";
import { imagelink } from "../Const/Const";

export const CheckItemCart = ({ items }) => {



  return (
    <div className="border-b border-slate-300 flex justify-between py-4 px-5 bg-white rounded-lg mb-3 shadow-sm">
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

      </div>
    </div>
  );
};


export const CartItemupdated = (CheckItemCart) => {
  const dispatch = useDispatch();

  const removeItemAndUpdateLocalStorage = (item) => {
    dispatch(removeItem(item));

    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];


    const updatedCartItems = existingCartItems.filter(cartItem => {

      return cartItem.card.info.id !== item.items.card.info.id;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCartItems));


  };
  return (props) => {

    return (
      <div className="relative mb-2">
        <CheckItemCart {...props} />
        <button className="absolute top-1/2 right-4 -translate-y-1/2 bg-red-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-red-700 transition duration-200 shadow-lg" onClick={() => removeItemAndUpdateLocalStorage(props)}>Remove</button>
      </div>
    )
  }
}