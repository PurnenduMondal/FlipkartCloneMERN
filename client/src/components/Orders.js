import React, { useEffect, useState } from 'react'
import "./Orders.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getOrders, updateOrderStatus } from '../functions/order'
import Header from './Header'

function Orders() {

  const { user } = useSelector(state => ({ ...state }))
  const [ orders, setOrders ] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if(user) { 
      getOrders(user._id).then((res) => setOrders(res.data))
    }
    else {
      navigate('/')
    }
  },[user])
  
  const handleCancelOrder = (orderId) => {
    updateOrderStatus(orderId, "Cancelled").then((res) => {
      getOrders(user._id).then((res) => setOrders(res.data))
    })
  }

  return (
    <div>
    
    <Header/>
      <div className="order__container">
        <div className="order__filters">
          <div className="order__filtersText">
            <span>Filters</span>
          </div>
          <div className="order__filtersText">
            ORDER STATUS
          </div>
          <div className="order__filteroptions">
            <input type="checkbox" id="option1" name="option1" value="On The Way" />
            <label htmlFor="option1">On The Way</label><br />
            <input type="checkbox" id="option2" name="option2" value="Delivered" />
            <label htmlFor="option2">Delivered</label><br />
            <input type="checkbox" id="option3" name="option3" value="Cancelled" />
            <label htmlFor="option3">Cancelled</label><br />
            <input type="checkbox" id="option4" name="option4" value="Returned" />
            <label htmlFor="option4">Returned</label><br />
          </div>
        </div>

        <div className="order__items">
          {orders.map((order, i) => 

          <div className="order__item" key={i} >
            <div style={{display:'flex', alignItems: 'center'}}>
              <div className="order__itemImage">
                <img src={order.image}
                  alt="" />
              </div>
              <div className="order__itemName">
                {order.productName} 
              </div>
            </div>
            <div>
              Qty. {order.quantity}
            </div>
            <div className="itemPrice">
              ₹{order.sellingPrice}
            </div>
            <div className="order__status">
              <div style={order.status === 'Cancelled' ? {backgroundColor: '#ff6161',border: '2px solid #ff6161'} : {backgroundColor: 'green',border: '2px solid green'}}></div> {order.status}
            </div>
            {order.status !== 'Cancelled' && order.status !== 'Delivered' ?
            <div className="order__cancelOrder" onClick={handleCancelOrder.bind(this, order._id)}>
              <img src="https://res.cloudinary.com/dj1rgwak8/image/upload/v1642616022/ordercancel.svg" alt="" /> Cancel Order
            </div> : ''
            }
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders
