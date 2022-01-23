import React from "react";
import cart from '../img/cart.svg';

const CartIcon = ({url}) => {
    return (
        <a href={url} target='_blank' className='block w-4 h-4 opacity-30 hover:opacity-100 transition-all'>
            <img src={cart} alt="icône de panier"/>
        </a>
    )
}

export default CartIcon;


