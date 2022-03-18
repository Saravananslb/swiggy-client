import React, { useState } from "react";
import './Home.css';
import { useContext } from 'react';
import { Context } from '../../Context';
import {SIGNIN_UP} from '../../actions/ActionType';
import {getLocations} from '../../apiCall';
import { useNavigate } from "react-router-dom";
const LOGO = require('../../assets/Swiggy_logo.png');

export const Home = () => {

  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  const handleSignIn = (action) => {
    dispatch({
      type: SIGNIN_UP,
      payload: {
        signInUpEnabled: true,
        signInUpAction: action
      },
    });
  }

  const handleLocationChange = (e) => {
    getLocations(e.target.value).then(res => {
      if (res.data.status) {
        setLocations(res.data.locations)
      }
    })
  }

  const handleLocationSelect = (loc) => {
    localStorage.setItem('location', loc.name.toUpperCase() + ', ' + loc.district.toUpperCase() + ', ' + loc.state.toUpperCase());
    localStorage.setItem('locationId', loc._id);
    navigate('/restaurants');
  }
  
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-7 left-container">
              <div class="row">
                  <div className="col">
                      <img src={LOGO} alt="Logo" width={189} height={55} />
                  </div>
                  {!state.isAuthenticated ? 
                  <div className="col header-btn">
                        <span className="login-btn" onClick={() => handleSignIn('LOGIN')}>Login</span>
                        <span className="signup-btn" onClick={() => handleSignIn('CONTINUE')}>Sign up</span>
                  </div> : null}
              </div>
              <div className="content-container">
                  <div>
                      <h1>Gaming Night?</h1>
                  </div>
                  <div className="content-home">
                  Order food from favourite restaurants near you.
                  </div>
                  <div>
                      <form className="form-find">
                        <input type="text" placeholder="Enter your delivery location" onChange={handleLocationChange} />
                        <button className="find-btn">FIND FOOD</button>
                        <ul class="list-group" >
                          {locations.map(item =>
                          <li class="list-group-item" style={{padding: '10px', cursor: 'pointer'}} onClick={() => handleLocationSelect(item)}>
                            <div>{item.name.toUpperCase() + ', ' + item.district.toUpperCase()}</div>
                            <div style={{fontWeight: 'bold'}}>{item.state.toUpperCase()}</div>
                          </li>
                          )}
                        </ul>
                      </form>
                  </div>
              </div>
          </div>
         
          <div class="col-5 right-image-container" >
              <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Dinner1-new_s93yyf" alt="" />
          </div>
        </div>
      </div>
      
      <div className="container delivery">
          <div className="row">
            <div className="col">
                <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_210,h_398/4x_-_No_min_order_x0bxuf" alt="" />
                <h5>No Minimum Order</h5>
                <p>Order in for yourself or for the group, with no restrictions on order value</p>
            </div>
            <div className="col">
                <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_412/4x_Live_order_zzotwy" alt="" />
                <h5>Live Order Tracking</h5>
                <p>Know where your order is at all times, from the restaurant to your doorstep</p>
            </div>
            <div className="col">
                <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn" alt="" />
                <h5>Lightning-Fast Delivery</h5>
                <p>Experience Swiggy's superfast delivery for food delivered fresh & on time</p>
            </div>
          </div>
      </div>
      
    </>
  );
};
