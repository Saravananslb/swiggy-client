import React from "react";
import { FoodCard } from "../../components/foodCard/FoodCard";
import { Header } from "../../components/header/Header";
import { getRestaurants } from "../../apiCall";
import { useNavigate } from "react-router-dom";

export const Offers = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = React.useState([]);

  const handleResChange = () => {
    const locationId = localStorage.getItem('locationId');
    if (locationId)
    getRestaurants(`locationId=${locationId}`).then(res => {
      setRestaurants(res.data.restaurants.filter(item => item.offerPercent > 0));
    })
  }

  React.useEffect(() => {
    handleResChange();
  }, [])

  return (
    <>
      <Header />
      <div class="container">
        <div class="row" style={{ backgroundColor: "#005062" }}>
          <div
            class="col"
            style={{
              textAlign: "center",
              color: "#ffffff",
              position: "relative",
              top: "50px",
            }}
          >
            <div>
              <h1>Offers for you</h1>
            </div>
            <div>Explore top deals and offers exclusively for you!</div>
          </div>
          <div class="col"></div>
          <div class="col">
            <img
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/KHu24Gqw_md3ham"
              alt=""
              width={300}
              height={200}
            />
          </div>
        </div>
        <div style={{ position: "relative", top: "50px" }}>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <span
                class="nav-link active"
                aria-current="page"
                style={{ cursor: "pointer" }}
              >
                Restaurant offers
              </span>
            </li>
            <li class="nav-item">
              <span class="nav-link" style={{ cursor: "pointer" }}>
                Payment offers/Coupons
              </span>
            </li>
          </ul>
        </div>
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
    </>
  );
};
