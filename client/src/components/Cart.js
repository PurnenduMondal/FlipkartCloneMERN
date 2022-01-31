import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Cart.css"
import Header from './Header';
import {auth} from '../firebase'

function Cart() {

    const { cart, user, showLoginForm} = useSelector(state => ({ ...state }))

    const [items, setItems] = useState([])
    const dispatch = useDispatch()
    const [totalDiscountPrice, setTotalDiscountPrice] = useState(0)
    const [totalActualPrice, setTotalActualPrice] = useState(0)
    const [totalSellingPrice, setTotalSellingPrice] = useState(0)

    useEffect(() => {
        setItems(JSON.parse(cart))
    }, [cart])

    useEffect(() => {
        setTotalActualPrice(items.reduce((a, b) => (a + b.actual_price * b.quantity), 0))
        setTotalDiscountPrice(items.reduce((a, b) => parseInt(a + (b.actual_price - b.selling_price) * b.quantity), 0))
        setTotalSellingPrice(items.reduce((a, b) => (a + b.selling_price * b.quantity), 0))
    }, [items])

    const handlePlaceOrder = () => {
        if(user == null){
            dispatch({
                type: 'SHOW_LOGIN_FORM',
                payload: true,
            })
        }
    }
    
    const handleRemoveItem = (itemId) => {
        
        let remainingItems = items.filter((item) => (item._id !== itemId))

        dispatch({
            type: 'REMOVE_CART_ITEM',
            payload: JSON.stringify(remainingItems),
        })
    }

    const handleQuantity = (itemIndex, quantity) => {
        let cartItems = items
        cartItems[itemIndex].quantity = quantity
        
        dispatch({
            type: 'REMOVE_CART_ITEM',
            payload: JSON.stringify(cartItems),
        })
    }

    return (
        <div>
            <Header />
            <div >
                {items.length ? (
                    <div className="cart__container">
                        <div className="cart__items">

                            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px', backgroundColor: 'white' }}>
                                <div className="cart__header">
                                    <p>My Cart ({items.length})</p>
                                    <div className="cart__address">
                                        <img src="https://res.cloudinary.com/dj1rgwak8/image/upload/v1642616021/Pin.svg" alt="" />
                                        <span>Deliver to</span>
                                        <div>Address</div>
                                    </div>
                                </div>


                                {items.map((item, i) =>

                                    <div className="cart__item" key={i}>
                                        <div>
                                            <div className="cart__itemImage">
                                                <img src={item.images[0].url} alt="" />
                                            </div>
                                            <div className="cart__textContents">
                                                <div className="cart__itemName">
                                                    {item.name}
                                                </div>
                                                <div className="itemPrice">
                                                    <div className="product__sellingPrice">&#8377;<span>{item.selling_price *
                                                        item.quantity}</span></div>
                                                    <div className="product__actualPrice">&#8377;<span>{item.actual_price *
                                                        item.quantity}</span></div>
                                                    <div className="product__discount">{item.discount}% off</div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="item__remove" >

                                            <button className="cartItem__addRemoveBtn" onClick={handleQuantity.bind(this, i, item.quantity-1)}> - </button>
                                            <div className="item__quantity">
                                                <input type="text" id={item._id} name="quantity"
                                                    value={item.quantity} disabled />
                                            </div>
                                            <button className="cartItem__addRemoveBtn" onClick={handleQuantity.bind(this, i, item.quantity+1)}> + </button>

                                            <div style={{ fontWeight: '500', marginLeft: '24px' }} onClick={handleRemoveItem.bind(this, item._id)} >
                                                REMOVE
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="cart__footer" style={user === null ? { display : 'flex' } : { display : 'none' }}>
                                    <button onClick={handlePlaceOrder}>PLACE ORDER</button>
                                </div>
                                
                            </div>
                        </div>
                        <div className="cart__priceSection">
                            <div className="priceDetails">
                                PRICE DETAILS
                            </div>
                            <div className="allPrices">
                                <div className="price__row">
                                    <div className="text">Price ({items.length} items)</div>
                                    <div className="cart__totalActualPrice ">&#8377;<span>{ totalActualPrice }</span></div>
                                </div>
                                <div className="price__row">
                                    <div className="text">Discount</div>
                                    <div className="cart__totalDiscount" style={{ color: '#3ca842' }} className="amount">
                                        -&#8377;<span>{ totalDiscountPrice }</span></div>
                                </div>
                                <div className="price__row">
                                    <div className="text">Delivery Charges</div>
                                    <div style={{ color: '#3ca842' }} className="amount">FREE</div>
                                </div>
                                <div className="price__row totalamount">
                                    <div className="text">Total Amount</div>
                                    <div className="cart__totalSellingPrice ">&#8377;<span>{totalSellingPrice}</span></div>
                                </div>
                            </div>
                            { user !== null ? 
                            <form className="cart__payment" method='post' action="{{ route('make-payment') }}" data-cc-on-file="false"
                                data-stripe-publishable-key="{{ env('STRIPE_KEY') }}">

                                {/* @if (Session::has('success'))
                                <div className="alert alert-primary text-center">
                                    <p>{{ Session::get('success') }}</p>
                                </div>
                                @endif */}
                                <div style={{ display: 'flex' }}>
                                    <div className="cart__cardPayment" style={{ fontSize: '14px' }}>
                                        Credit / Debit / ATM Card
                                        <div className="cart__cardInput" style={{ width: '319px', marginTop: '8px' }}>
                                            <input type="number" className="card-number" required />
                                            <label htmlFor="">Enter Card Number</label>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div className="cart__cardDate" style={{ fontSize: '14px' }}>
                                                Valid Thru
                                                <select className="expiration_month" style={{ border: 'none', marginLeft: '5px' }}>
                                                    <option>MM</option>
                                                    {[...Array(12)].map((e, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)
                                                    }
                                                </select>
                                                <select className="expiration_year" id="" style={{ border: 'none' }}>
                                                    <option>YY</option>
                                                    {[...Array(20)].map((e, i) => <option key={i + 20} value={i + 20}>{i + 20}</option>)
                                                    }
                                                </select>
                                            </div>

                                            <div className="cart__cardInput" style={{ width: '128px' }}>
                                                <input className="cvv" type="number" required />
                                                <label htmlFor="">CVV</label>
                                            </div>
                                        </div>
                                        <div className="cart__payBtn">
                                            {/* <input type="hidden" name='amount' value="{{$total_selling_price }}"/> */}
                                            <input type="hidden" name="cartproducts" value='null' />
                                            <button type="submit">PAY &#8377;{totalSellingPrice}</button>
                                        </div>
                                    </div>
                                </div>
                            </form> : ''
                            }
                        </div>
                    </div>)
                    :
                    <div className="cart__container">
                        <div className="cart__empty">
                            <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                                alt="" />
                            <p>Your cart is empty!</p>
                            <Link to="/">Shop now</Link>
                        </div>
                    </div>
                }
            </div>
        </div>)
}

export default Cart;
