
import React from "react";

export const Restrocard = ({ restro }) => {
  const {
    info: {
      cloudinaryImageId,
      name,
      avgRating,
      cuisines,
      sla: { deliveryTime },
    },
  } = restro;
  return (
    <div className="restro-card p-5 w-[300px] shadow-xl rounded-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-slate-300">
      <img
        className="h-[200px] w-full rounded-xl object-cover" alt={name}
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
      ></img>

      <div className="RestroDetails mt-6 space-y-3 px-2">
        <h3 className="font-bold text-lg">
          {name}
        </h3>
        <h4 className="font-bold text-sm text-gray-700">
          ⭐ {avgRating}  •  {deliveryTime} min
        </h4>
        <h5 className="font-medium text-sm text-gray-600">
          {cuisines.join(", ")}
        </h5>
      </div>

    </div>
  );
};

export const PromotedRestrocard = (Restrocard) => {
  return (props) => {
    return (
      <div className="promoted relative">
        <label className="prostatus absolute text-white px-3 py-1.5 ml-[175px] bg-black rounded-lg z-50 mt-6 text-sm font-medium">Wait longer</label>
        <Restrocard {...props} />
      </div>

    )
  }
}