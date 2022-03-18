import React from 'react';
import { CartEmpty } from '../../components/cartEmpty/CartEmpty';
import { Header } from '../../components/header/Header';
import { getCartItem, addToCart, checkout } from "../../apiCall";

export const Checkout = () => {

  const [cart, setCart] = React.useState([]);
  let [totalPrice, setTotalPrice] = React.useState(0);

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

  React.useEffect(() => {
    getCarts();
  }, [])

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
          newCart = [...cart, {...food}];
        }
        else
        newCart = [{...food}];
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
            <Header location={false} search={false} checkout={true} cart={false}/>
            {cart ?
            <div class="col">
              <h2>Cart</h2>
              <span className="food-card-text1">{cart && cart.length} ITEM</span>
              <div class="container">
                {cart.foods && cart.foods.map(item =>
                <div class="row" style={{padding: '10px'}}>
                  <div class="col">{item.name}</div>
                  <div class="col">
                    <div className="cart-add-btn-food">
                      <span style={{ marginRight: "10px" }} onClick={() => addCart(false, item)}>-</span>
                      <span onClick={() => addCart(true, item)}>Add</span>
                      <span style={{ marginLeft: "10px" }} onClick={() => addCart(true, item)}>+</span>
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
        </>
    )
}