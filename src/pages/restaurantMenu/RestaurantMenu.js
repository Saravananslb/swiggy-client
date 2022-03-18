import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartEmpty } from "../../components/cartEmpty/CartEmpty";
import { Header } from "../../components/header/Header";
import { getCartItem, getRestaurants, addToCart, checkout } from "../../apiCall";
import "./RestaurantMenu.css";

export const RestaurantMenu = () => {

  const { restaurantId } = useParams();
  let [totalPrice, setTotalPrice] = useState(0);

  const [restaurants, setRestaurants] = useState({});
  const [cart, setCart] = useState([]);

  const handleResChange = (restaurantId) => {
    getRestaurants(`restaurantId=${restaurantId}`).then(res => {
      setRestaurants(res.data.restaurants[0]);
    })
  }

  const getCarts = () => {
    getCartItem().then(res => {
      setCart(res.data.carts ? res.data.carts : [])
      if (res.data.carts) {
        res.data.carts.foods.map(item => {
          setTotalPrice(totalPrice + (item.price * item.count))
        })
      }
    })
  }

  useEffect(() => {
    handleResChange(restaurantId);
    getCarts();
  }, [restaurantId])

  const addCart = (add, food) => {
    let newCart;
    let findStatus = false;
    if (add) {
      if (cart && cart.foods.length){
        console.log(cart)
        newCart = cart.foods.map(item => {
          if (item.id === food.id) {
            item.count += 1;
            findStatus = true;
          }
          console.log(item, food)
          return item;
        })
      }

      
      console.log(newCart)
      if (!findStatus || !cart) {
        food.count = 1;
        if (cart.length) {
          newCart = [...cart, {...food, restaurantId}];
        }
        else
        newCart = [{...food, restaurantId}];
      }
    }
    else {
      newCart = [];
      cart.foods.map(item => {
        if (item.id === food.id) {
          if (item.count > 1){
            item.count -= 1;
            newCart.push(item)
          }
          
        }
        else {
          newCart.push(item)
        }
      })
    }
    console.log(newCart);
    addToCart({foods: newCart}).then(res => {
      if (res.data.status) {
        setTotalPrice(0);
        getCarts();
      }
    })
    
  }

  const handleCheckout = (id) => {
    checkout(id).then(res => {
      if (res.data.status) {
        getCarts();
      }
    })
  }

  return (
    <>
      <Header />
      <div style={{ position: "relative", top: "50px" }}>
        <div
          class="container"
          style={{
            backgroundColor: "#171a29",
            padding: "40px",
            color: "#ffffff",
          }}
        >
          <div class="row">
            <div class="col">
              <img
                src={restaurants.foodImage}
                alt=""
                width={260}
                height={200}
              />
            </div>
            <div class="col">
              <h2 style={{textTransform: 'uppercase'}}>{restaurants.name}</h2>
              <p className="food-card-text">{restaurants.type}</p>
              <p className="food-card-text">{restaurants.address}</p>
              <div class="container food-card-text">
                <div class="row">
                  <div class="col">
                    <div>{restaurants.star}</div>
                    <div>{restaurants.ratings}+ Ratings</div>
                  </div>
                  <div class="col">
                    <div>{restaurants.deliveryTime} Mins</div>
                    <div>Delivery Time</div>
                  </div>
                  <div class="col">
                    <div>₹ {restaurants.price}</div>
                  </div>
                </div>
              </div>
            </div>
            {restaurants.offerPercent ?
            <div class="col">
              <h5>OFFER</h5>
              <p>{restaurants.offerPercent}% off up to ₹{(restaurants.price * restaurants.offerPercent)/100}</p>
            </div> : null}
          </div>
        </div>
        <div class="container" style={{ padding: "10px" }}>
          <div class="row">
            <div class="col"></div>
            <div class="col-5">
              {/* <h1>Idly Varaties</h1> */}
              {restaurants.foods && restaurants.foods.map(item =>
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div className="styles_ribbon__3tZ21">Best Seller</div>
                    <h5>{item.name}</h5>
                    <p>₹ {item.price}</p>
                  </div>
                  <div class="col"></div>
                  <div class="col">
                    <div>
                      <img
                        src={item.image}
                        className="styles_itemImage__3CsDL"
                        alt=""
                      />
                      <div className="add-btn-food">
                        <span style={{ marginRight: "10px" }} onClick={() => addCart(false, item)}>-</span>
                        <span onClick={() => addCart(true, item)}>Add</span>
                        <span style={{ marginLeft: "10px" }} onClick={() => addCart(true, item)}>+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
              <hr />
            </div>
            {cart && cart.foods && cart.foods.length ?
            <div class="col">
              <h2>Cart</h2>
              <span className="food-card-text1">{cart && cart.length} ITEM</span>
              <div class="container">
                {cart.foods && cart.foods.map(item =>
                <div class="row" style={{padding: '10px'}}>
                  <div class="col">{item.name}</div>
                  <div class="col">
                    <div className="cart-add-btn-food">
                      <span style={{ marginRight: "10px" }}>-</span>
                      <span>Add</span>
                      <span style={{ marginLeft: "10px" }}>+</span>
                    </div>
                  </div>
                  <div class="col">₹ {item.price * item.count}</div>
                  
                </div>)}
              </div>
              <div class="container">
                <div class="row">
                  <div class="col-8">
                      <h5>Subtotal</h5>
                      <p className="food-card-text1">Extra charges may apply</p>
                  </div>
                  <div class="col">₹ {totalPrice}</div>
                </div>
              </div>
              <button className="checkout-btn" onClick={() => handleCheckout(cart._id)}>CHECK OUT</button>
            </div> :
            <div class="col">
            <CartEmpty btn={false} cartText={false} />
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};
