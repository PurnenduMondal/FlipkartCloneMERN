import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrders, updateOrderStatus } from '../functions/order';
import AdminSidebar from './AdminSidebar';

function AdminOrders() {

    const { user } = useSelector(state => ({ ...state }))
    const [ orders, setOrders ] = useState([])
    const navigate = useNavigate()
  
    useEffect(() => {
      if(user) { 
        getOrders("").then((res) => setOrders(res.data))
      }
      else {
        navigate('/')
      }
    },[])

    const handleOrderStatusChange = (e, orderId) => {

        updateOrderStatus(orderId, e.target.value)
        .then((res) => {
            getOrders("").then((res) => setOrders(res.data))
        })
    }

    return (
        <div>
            <div style={{display:'flex',height: '100vh'}}>

        <AdminSidebar panelName={'Orders'}/>
        <div className="verticalLine" style={{ borderLeft: '1px solid #b1b1b1' }}></div>
        <div className="p-3" style={{ width: '100%' }}>
        
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center" scope="col">Order ID</th>
                        <th className="text-center" scope="col">Name</th>
                        <th className="text-center" scope="col">selling price</th> 
                        <th className="text-center" scope="col">Quantity</th>           
                        <th className="text-center" scope="col">Status</th>
                        <th className="text-center" scope="col">Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, i) =>
                    <tr key = {i}>
                        <td className="text-center">{ order._id }</td>
                        <td className="text-center">{ order.productName }</td>
                        <td className="text-center">{ order.sellingPrice }</td>
                        <td className="text-center">{ order.quantity }</td>
                        <td className="text-center">{ order.status }</td>
                        <td className="text-center">
                            <form>             
                                    <select name="status" value={order.status} onChange={(e) => handleOrderStatusChange(e, order._id)}>
                                        <option>Select Status</option>
                                        <option value="Order Placed">Order Placed</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                            </form>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
        </div>
    );
}

export default AdminOrders;
