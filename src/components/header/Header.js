import React from "react";
import "./Header.css";
import { Context } from '../../Context';
import {SIGNIN_UP} from '../../actions/ActionType';
import { ISSEARCH } from "../../actions/ActionType";
import { useNavigate } from "react-router-dom";

const ICON = require("../../assets/swiggy_icon.png");
const SEARCH = require('../../assets/magnifying-glass-solid.svg');
const OFFERS = require('../../assets/percent-solid.svg');
const USER = require('../../assets/user-solid.svg');

export const Header = ({checkout=false, location=true, search=true, offers=true, cart=true, signIn=true, help=true}) => {
  const { state, dispatch } = React.useContext(Context);
  const navigate = useNavigate();
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="container">
            <div class="row">
              <div class="col">
                <img src={ICON} alt="" width={80} height={50} onClick={() => navigate('/')} />
                {checkout ?
                <span class=" location-res" aria-current="page" >
                  SECURE CHECKOUT
                </span> : null }
                {location ? 
                <span class="dropdown-toggle location-res" aria-current="page" onClick={() => dispatch({
                  type: ISSEARCH,
                  payload: {
                    searchEnabled: true,
                  },
                })}>
                  {localStorage.getItem('location')}
                </span> : null}
              </div>
              {/* </div> */}
              <div class="col">
                <div class="container header-menu">
                  <div class="row">
                    {search ? 
                    <div class="col" onClick={() => navigate('/search')}>
                        <img src={SEARCH.default} alt="" width={20} height={20} />
                        <span>Search</span>
                    </div> : null }
                    {offers ? 
                    <div class="col" onClick={() => navigate('/offers')}>
                        <img src={OFFERS.default} alt="" width={20} height={20} />
                        <span>Offers</span>
                    </div> : null }
                    {help ? 
                    <div class="col">Help</div> : null }
                    {signIn && !state.isAuthenticated ?
                    <div class="col" onClick={() => dispatch({
                      type: SIGNIN_UP,
                      payload: {
                        signInUpEnabled: true,
                        signInUpAction: 'LOGIN'
                      },
                    })}>
                        <img src={USER.default} alt="" width={20} height={20} />
                        <span>Sign In</span>
                    </div> : null }
                    {cart ? 
                    <div class="col" onClick={() => navigate('/checkout')}>
                        <span>Cart</span>
                    </div> : null }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
