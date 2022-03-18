import React from 'react';
import { Home } from './pages/home/Home';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import { Restaurant } from './pages/restaurant/Restaurant';
import { Search } from './pages/search/Search';
import { Checkout } from './pages/checkout/Checkout';
import { Offers } from './pages/offers/Offers';
import { RestaurantMenu } from './pages/restaurantMenu/RestaurantMenu';
import { Reducer } from './reducer/Reducer';
import { Context } from './Context';
import { useState } from 'react';
import { useReducer } from 'react';
import { SignInUp } from './components/signInUp/SignInUp';
import { SideSearchBar } from './components/sideSearchBar/SideSearchBar';
import { cookie, validateUser } from './apiCall';
import { useContext } from 'react';
import { AUTHENTICATE } from './actions/ActionType';
import { useEffect } from 'react';

function App() {
  const [initialState, setInitialState] = useState({
    signInUpEnabled: false,
    signInUpAction: 'LOGIN',
    searchEnabled: false,
    isAuthenticated: false
  });

  useEffect(() => {
    validateAuth();
  }, [])

  const validateAuth = () => {
    validateUser().then(res => {
      if (res.data && res.data.status) {
        cookie.set('Authorization', res.data.authToken);
        dispatch({
          type: AUTHENTICATE,
          payload: {
            isAuthenticated: true
          }
        })
      }
      else {
        cookie.remove('Authorization');
      }
    })
  }

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={{state, dispatch}}>
    <div className='App'>
      <SignInUp/>
      <SideSearchBar />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/restaurants' element={<Restaurant />} ></Route>
        <Route path='/search' element={<Search />} ></Route>
        <Route path='/checkout' element={<Checkout />} ></Route>
        <Route path='/offers' element={<Offers />} ></Route>
        <Route path='/restaurants/:restaurantId' element={<RestaurantMenu />} ></Route>
      </Routes>
    </BrowserRouter>
    </div>
    </Context.Provider>
  );
}

export default App;
