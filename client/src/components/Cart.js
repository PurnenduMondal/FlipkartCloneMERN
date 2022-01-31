import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Cart.css"
import Header from './Header';

function Cart() {

  const { cart } = useSelector(state => ({ ...state }))

  const [items, setItems] = useState({})
  useEffect(() => {
    setItems(JSON.parse(cart))
  },[cart])

  return (
  <div>
    <Header />
    <div className="cart__container">
        <div className="cart__items">
            <div style={{boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px', backgroundColor: 'white'}}>
                <div className="cart__header">
                    <p>My Cart ({_.size(items) })</p>
                    { items !== {} ?
                    <div className="cart__address">
                        <img src="https://res.cloudinary.com/dj1rgwak8/image/upload/v1642616021/Pin.svg" alt=""/>
                        <span>Deliver to</span>
                        <div>Address</div>
                    </div> : ''
                    
                    }
                </div>

                { items !== {} ?
                items.map( (item) => 
                <div className="cart__item">
                    <div style="display: flex;">
                        <div className="cart__itemImage">
                            <img src="{{asset('uploads/'.$productImages->firstWhere('product_id', $product->id)->image_name)}}"
                                alt=""/>

                        </div>
                        <div className="cart__textContents">
                            <div className="cart__itemName">
                                {item.name}
                            </div>
                            <div className="itemPrice">
                                <div className="product__sellingPrice">&#8377;<span>{ $product->selling_price *
                                        $cart_items_quentity[$item->id]}</span></div>
                                <div className="product__actualPrice">&#8377;<span>{{ $product->actual_price *
                                        $cart_items_quentity[$product->id]}}</span></div>
                                <div className="product__discount">{{ $product->discount }}% off</div>
                            </div>

                        </div>
                    </div>
                    <div className="item__remove" style="padding-top: 10px; display: flex">

                        <button className="cartItem__addRemoveBtn"> - </button>
                        <div className="item__quantity">
                            <input type="text" id="{{ $product->id }}" name="quantity"
                                value="{{$cart_items_quentity[$product->id]}}" disabled/>
                        </div>
                        <button className="cartItem__addRemoveBtn"> + </button>

                        <a href="{{route('delete_cartItem', $product->id)}}" style="margin-left: 24px;">
                            REMOVE
                        </a>
                    </div>
                </div>
                )
                
                <div className="cart__footer">
                    <input type="hidden" value="124" name="amount"/>
                    <button>PLACE ORDER</button>
                </div>
            </div>

        </div>
        <div className="cart__priceSection">
            <div className="priceDetails">
                PRICE DETAILS
            </div>
            <div className="allPrices">
                <div className="price__row">
                    <div className="text">Price ({{ items->count() }} items)</div>
                    <div className="cart__totalActualPrice ">&#8377;<span>{{$total_actual_price}}</span></div>
                </div>
                <div className="price__row">
                    <div className="text">Discount</div>
                    <div className="cart__totalDiscount" style="color:#3ca842" className="amount">
                        -&#8377;<span>{{$total_discount}}</span></div>
                </div>
                <div className="price__row">
                    <div className="text">Delivery Charges</div>
                    <div style="color:#3ca842" className="amount">FREE</div>
                </div>
                <div className="price__row totalamount">
                    <div className="text">Total Amount</div>
                    <div className="cart__totalSellingPrice ">&#8377;<span>{{ $total_selling_price }}</span></div>
                </div>
            </div>

            <form className="cart__payment" method='post' action="{{ route('make-payment') }}" data-cc-on-file="false"
                data-stripe-publishable-key="{{ env('STRIPE_KEY') }}">
                @csrf
                @if (Session::has('success'))
                <div className="alert alert-primary text-center">
                    <p>{{ Session::get('success') }}</p>
                </div>
                @endif
                <div style="display: flex">
                    <div className="cart__cardPayment" style="font-size: 14px;">
                        Credit / Debit / ATM Card
                        <div className="cart__cardInput" style="width: 319px; margin-top: 8px;">
                            <input type="number" className="card-number" required/>
                            <label for="">Enter Card Number</label>
                        </div>
                        <div style="display: flex">
                            <div className="cart__cardDate" style="font-size: 14px;">
                                Valid Thru
                                <select className="expiration_month" style="border: none; margin-left:5px">
                                    <option>MM</option>
                                    @for ($i = 1; $i <= 12; $i++) <option value="{{$i}}">{{ $i }}</option>
                                        @endfor
                                </select>
                                <select className="expiration_year" id="" style="border: none;">
                                    <option>YY</option>
                                    {for (var i = 22; i < 40; i++) {<option value={i}>{i}</option>}}
                                </select>
                            </div>

                            <div className="cart__cardInput" style={{width: '128px'}}>
                                <input className="cvv" type="number" required/>
                                <label for="">CVV</label>
                            </div>
                        </div>
                        <div className="cart__payBtn">
                            <input type="hidden" name='amount' value="{{$total_selling_price }}"/>
                            <input type="hidden" name="cartproducts" value="{{ json_encode($cart_items_quentity) }}"/>
                            <button type="submit">PAY &#8377;{{$total_selling_price }}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        :
        <div className="cart__empty">
            <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                alt=""/>
            <p>Your cart is empty!</p>
            <a href="/">Shop now</a>
        </div>
        }
    </div>
  </div>)
}

export default Cart;
