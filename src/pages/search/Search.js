import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { getRestaurants } from "../../apiCall";
const SEARCH = require("../../assets/magnifying-glass-solid.svg");
const CLOSE = require("../../assets/xmark-solid.svg");

export const Search = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  const handleResChange = (e) => {
    if (e.target.value.length > 3)
    getRestaurants(`restaurantName=${e.target.value}`).then(res => {
      setRestaurants(res.data.restaurants);
    })
  }

  return (
    <>
      <Header />
      <div style={{ position: "relative", top: "100px" }}>
        <div
          style={{
            border: "1px solid black",
            width: "800px",
            marginLeft: "20%",
          }}
        >
          <img
            src={SEARCH.default}
            alt=""
            width={20}
            height={20}
            style={{ float: "left", marginLeft: "20px", marginTop: "20px" }}
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for restaurants"
            style={{
              padding: "20px",
              width: "50%",
              outline: "none",
              border: "none",
            }}
            onChange={(e) => handleResChange(e)}
          />
          <img
            src={CLOSE.default}
            alt=""
            width={30}
            height={30}
            style={{
              float: "right",
              marginRight: "20px",
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          />
        </div>
        <ul class="list-group">
              {restaurants.map((item) => (
                <li
                  class="list-group-item"
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={() => navigate(`/restaurants/${item._id}`)}
                >
                  <div>
                    {item.name.toUpperCase()}
                  </div>
                  <div style={{ fontWeight: "bold" }}>
                    {item.type}
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};
