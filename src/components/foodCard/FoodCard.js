import React from "react";
import './FoodCard.css';

export const FoodCard = ({item}) => {
  return (
    <>
      <div class="card" style={{width: "18rem", cursor: 'pointer'}} >
        <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/apxoeoqyzisb7wl3jkoe" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title" style={{textTransform: 'upperCase'}}>{item.name}</h5>
          <p class="card-text food-card-text-dark">
          {item.type}
          </p>
          <div class="_9uwBC wY0my"><span class="icon-star _537e4"></span><span>4.4</span></div>
          <div  className="food-card-text-dark">{item.deliveryTime} Mins</div>
          <div className="food-card-text-dark">₹{item.price} FOR TWO</div>
        </div>
        <div className="food-card-text-dark">{item.offerPercent}% off</div>
      </div>
    </>
  );
};
