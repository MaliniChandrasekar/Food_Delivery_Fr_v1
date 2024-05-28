import React, { useContext, useState, useEffect } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'


const MyOrders = () => {

    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrders = async () => {
        const response = await axios.get(url + "/getorder",{ headers: { token } })
        setData(response.data.data)
        console.log("response",response.data.data)
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    return (
        <div className='my-orders'>
           <div className='first'>
             <h2>My Orders</h2>
            <button onClick={fetchOrders}>Track Order</button>
            </div>
            <div className='container'>
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} />
                            <p>{order.items.map((item, index) => {
                                if(index === order.items.length - 1){
                                    return item.name + " X " + item.quantity
                                }
                                else{
                                    return item.name + " X " + item.quantity + ", "
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items : {order.items.length}</p>
                            <p><span className='dot'>&#x25cf;</span> <b className='font'>{order.status}</b></p>
                           
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default MyOrders
