import React from "react";
import './cartEmpty.css';

export const CartEmpty = ({cartText=true, btn=true}) => {
    return (
        <>
            <div>
                <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" width={500} height={400} />
                <h3 style={{marginTop: '10px'}}>Your cart is empty</h3>
                {cartText ? <div>You can go to home page to view more restaurants</div> : null}
                {btn ? <button className="see-rest">See restaurants near you</button> : null}
            </div>
        </>
    )
}