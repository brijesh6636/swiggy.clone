import { MenuItem } from "./MenuItem";

const MenuCard = ({ menu, showitem, setindexset }) => {
    const itemsarray = menu?.card?.card?.itemCards;
    const itemCardsCount = itemsarray?.length;


    const handleclick = () => {
        setindexset()
    }


    return itemsarray === undefined ? null : (
        <div className="">
            <div className="w-7/12 my-4 mx-auto px-6 py-4 shadow-xl cursor-pointer rounded-lg bg-white" onClick={handleclick}>
                <span className="font-bold text-lg w-full flex justify-center">{menu.card?.card?.title} ({itemCardsCount})</span>
                <span className="flex justify-center text-xl mt-1">⬇️</span>
            </div>
            <div className="w-7/12 border border-gray-200 rounded-lg flex flex-col my-3 mx-auto bg-white p-4">
                {showitem && itemsarray.map((item, index) => {
                    return <MenuItem key={index} items={item} />;
                })}</div>
        </div>
    );
}

export default MenuCard;
