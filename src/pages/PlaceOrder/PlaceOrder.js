import React, { useContext, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url} =useContext(StoreContext)

  const [data, setData] = useState({
    firstname : "",
    lastname : "",
    email : "",
    street : "",
    city : "",
    state : "",
    zipcode :"",
    country : "",
    phone : ""
  })

  const onChangeHander = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({ ...data, [name] : value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address : data,
      items : orderItems,
      amount : getTotalCartAmount() + 2
    }
    let response = await axios.post(url + "/placeorder", orderData, {headers : {token}})
    if (response.data.success){
      const {session_url} = response.data
      window.location.replace(session_url)
    }
    else{
      alert("Login to place orders")
    }
  }

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input name ="firstname" value={data.firstname} onChange={onChangeHander} type='text' placeholder='First Name' required/>
          <input name ="lastname" value={data.lastname} onChange={onChangeHander} type='text' placeholder='Last Name' required/>
        </div>
        <input name ="email" value={data.email} onChange={onChangeHander} type='email' placeholder='Email address' required/>
        <input name ="street" value={data.street} onChange={onChangeHander} type='text' placeholder='Street' required/>
        <div className='multi-fields'>
          <input name ="city" value={data.city} onChange={onChangeHander} type='text' placeholder='City' required/>
          <input name ="state" value={data.state} onChange={onChangeHander} type='text' placeholder='State' required/>
        </div>
        <div className='multi-fields'>
          <input name ="zipcode" value={data.zipcode} onChange={onChangeHander} type='text' placeholder='Zip Code' required/>
          <input name ="country" value={data.country} onChange={onChangeHander} type='text' placeholder='Country' required/>
        </div>
        <input name ="phone" value={data.phone} onChange={onChangeHander} type='text' placeholder='Phone' required/>
      </div>
      <div className='place-order-right'>
      <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
                <p>SubTotal</p>
                <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount()=== 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
