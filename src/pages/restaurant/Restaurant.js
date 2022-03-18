import React from "react";
import { useState, useEffect } from "react";
import { Header } from "../../components/header/Header";
import { getRestaurants } from "../../apiCall";
import { NoRestaurant } from "../../components/noRestaurant/NoRestaurant";
import { FoodCard } from "../../components/foodCard/FoodCard";
import { useNavigate } from "react-router-dom";

export const Restaurant = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  const handleResChange = () => {
    const locationId = localStorage.getItem('locationId');
    if (locationId)
    getRestaurants(`locationId=${locationId}`).then(res => {
      setRestaurants(res.data.restaurants);
    })
  }

  useEffect(() => {
    handleResChange();
  }, [])

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col">
          <Header/>
            {/* <NoRestaurant /> */}
          </div>
        </div>
      </div>
      <div class="container" style={{marginTop: '20px', backgroundColor: "#171a29", padding: '50px'}}>
        <div class="row">
          <div class="col">
            <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/sfyhpdhesv3hp2vvmmtt" alt="" width={260} height={260} />
          </div>
          <div class="col">
          <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/s5ug2key6e2sptaxku5v" alt="" width={260} height={260} />
          </div>
          <div class="col">
          <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/oxe97jexxbnxqtbhg2zo" alt="" width={260} height={260} />
          </div>
          <div class="col">
          <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/ifi2lbzxeu1hvsqrsip3" alt="" width={260} height={260} />
          </div>
        </div>
      </div>
      <br />
      {restaurants.length ?
      <div className="container">
        <h2 style={{float: 'left'}}>{restaurants.length} restaurants</h2>
        <div style={{ position: "relative", top: "100px" }}>
          <div class="container">
            <div class="row">
              {restaurants.map(item =>
              <div class="col" onClick={() => navigate(`${item._id}`)}>
                <FoodCard item={item}/>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
      : <NoRestaurant/>}
      
    </>
  );
};
