import React from 'react'
import { useState } from 'react'

const CartComponent = ({cartTotalPrice}) => {


  return (
    <div className='bg-white min-h-28 w-44 rounded-xl shadow-lg flex '>
        <div className='h-full w-full flex flex-col px-2 py-2  text-lg font-semibold '>
          <p >
            Total Price
          </p>
          <p>
           Rs. {cartTotalPrice}
          </p>
        </div>
    </div>
  )
}

export default CartComponent