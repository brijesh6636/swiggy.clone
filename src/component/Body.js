import { Restrocard, PromotedRestrocard } from "./Restrocard";
import React, { useEffect, useState } from "react";
import { Shimmer } from "../smallComponents/Shimmer";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../Const/useOnlineStatus";
import { WhatsOnMind } from "../smallComponents/WhatsOnMind";
import { fetchdata } from "../Const/restroApi";

export const Body = () => {
  const ProRestrocard = PromotedRestrocard(Restrocard);
  const [restrolist, setrestrolist] = useState([]);
  const [searchvalue, setsearchvalue] = useState("");
  let [restrolistCopy, setrestrolistCopy] = useState([]);

  const filterestro = () => {
    let filteredlist = restrolistCopy.filter((resti) => resti.info.avgRating > 4);
    setrestrolist(filteredlist);
  };

  const filterDeserts = () => {
    let filteredList = restrolistCopy.filter((rest) =>
      rest.info.cuisines.map(cuisine => cuisine.toLowerCase()).includes("desserts".toLowerCase())
    );
    setrestrolist(filteredList)
  };



  useEffect(() => {
    const fetchRestroData = async () => {
      const data = await fetchdata();
      setrestrolist(data);
      setrestrolistCopy(data);
    }
    fetchRestroData()
  }, []);

  useOnlineStatus();

  const searchrestro = () => {
    let searchedrestro = restrolistCopy.filter(
      (res) =>
        res.info.name &&
        res.info.name.toLowerCase().includes(searchvalue.toLowerCase())
    );
    if (searchedrestro.length === 0) {
      console.log('no restro found')
    } else {
      setrestrolist(searchedrestro);
    }
  };

  return !restrolist?.length ? (
    <Shimmer />
  ) : (
    <div className="body bg-gray-200 px-8 py-6">
      <WhatsOnMind />
      <div className="flex flex-wrap items-center gap-3 mb-6 mt-6">
        <input
          type="text"
          className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200 min-w-[250px]"
          value={searchvalue}
          onChange={(e) => {
            setsearchvalue(e.target.value);
            searchrestro();
          }}
          placeholder="Search Restro"
        />

        <button
          type="button"
          className="px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-medium"
          onClick={searchrestro}
        >
          Search
        </button>

        <button
          type="button"
          className="text-white px-4 py-2.5 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out font-medium"
          onClick={filterestro}
        >
          Ratings 4.0
        </button>

        <button
          type="button"
          className="text-white px-4 py-2.5 bg-purple-500 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium"
          onClick={filterDeserts}
        >
          Filter Deserts
        </button>

        <button
          type="button"
          className="text-white px-4 py-2.5 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out font-medium"
          onClick={() => setrestrolist(restrolistCopy)}
        >
          Remove Filter
        </button>



      </div>
      <p className="px-2 py-4 font-bold text-3xl">Top restaurant chains in Bangalore</p>
      <div className="appbody flex flex-wrap gap-4 pb-6">
        {restrolist.map((restroo) => (
          <Link key={restroo.info.id} to={"/restromenu/" + restroo.info.id}>
            {restroo.info.sla.deliveryTime < 35 ? (
              <ProRestrocard restro={restroo} />
            ) : (
              <Restrocard restro={restroo} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
