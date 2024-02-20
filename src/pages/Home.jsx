import React from 'react'
import { getProducts, searchProduct, userLogout } from '../services/UserService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import FilterComponent from './components/FilterComponent'
import CartComponent from './components/CartComponen'






const Home = () => {

  const [ProductData, SetProductData] = useState([])
  const [SearchData,SetSearchData]=useState('')
  const [ClearOption,SetClearOption]=useState(false)
  const [FilterTrue,SetFilterTrue]=useState(false)
  const [CardTrue,SetCardTrue]=useState(false)
  const [Check,SetCheck]=useState('')
  const [cartCount,SetcartCount]=useState(0)
  const [cartList,SetCartList]=useState([])
  const [cartTotalPrice,SetCartTotalPrice]=useState(0)

  const navigate = useNavigate()

  const logout = () => {
    userLogout()
    navigate('/')
  }

  const products = async () => {
    const response = await getProducts()
    SetProductData(response.products)
  }

  const handleSearchproducts=async()=>{
    if(SearchData===''||SearchData===' ')return
    const response=await searchProduct(SearchData)
    SetProductData(response.products)
    SetSearchData('')
    SetClearOption(true)
  }

  const clearOptions=()=>{
    products()
    SetClearOption(false)
  }

  const filterProductsByPrice=( minPrice, maxPrice)=> {
    const result= ProductData.filter(product => product.price > minPrice && product.price <= maxPrice);
    SetProductData(result)
    SetFilterTrue(false)
    SetClearOption(true)
  }

  const ApplyFilter=(condition)=>{
    switch (condition) {
      case "checkbox1":filterProductsByPrice(0,1000)
        
        break;
      
      case "checkbox2":filterProductsByPrice(1000,2000)

        break;
      
      case "checkbox3":filterProductsByPrice(2000,null)

        break;
    }
  }

  const AddToCart=(id,price)=>{
    SetcartCount(cartCount+1)
    SetCartList([...cartList,id])
    SetCartTotalPrice(cartTotalPrice+price)
  }

  const RemoveFromCart=(id,price)=>{
    SetcartCount(cartCount-1)
    const list=cartList.filter((data)=>data!==id)
    SetCartList(list)
    SetCartTotalPrice(cartTotalPrice-price)
  }


  useEffect(() => {
    products()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-white flex' 
    //onClick={()=>SetFilterTrue(false)}
    >
      <div className='h-full w-full flex flex-col'>
        {/* header */}
        <div className='w-full  rounded-lg flex flex-row h-fit py-2 px-3 items-center gap-3'>
          <div className='ml-5'>
            <a href="/" className='text-gray-600 text-xl'>HOME</a>
          </div>
          <div className='w-1/3  ml-4 bg-white rounded-xl border border-gray-300 flex flex-row items-center'>
            <input type="text"
             placeholder='Search your product' className='rounded-xl px-4 py-2 h-fit focus:outline-none flex flex-grow '
             value={SearchData}
             onChange={(e)=>SetSearchData(e.target.value)}
             />
            <i className="fa-solid fa-magnifying-glass fa-xl mr-3 hover:cursor-pointer"
            onClick={handleSearchproducts}
            ></i>
          </div>
          <div className='ml-auto flex flex-row gap-8 relative '>
            {CardTrue&&<div className='absolute top-0 right-20'>
              <CartComponent cartTotalPrice={cartTotalPrice}/>
            </div>}
            {/* <!-- Cart counter --> */}
            <span onClick={()=>SetCardTrue(!CardTrue)} className="absolute -top-6 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold hover:cursor-pointer">
              {cartCount}
            </span>
            <i className="fa-solid fa-cart-shopping fa-xl hover:cursor-pointer" onClick={()=>SetCardTrue(!CardTrue)}></i>
            <i className="fa-solid fa-right-from-bracket fa-xl hover:cursor-pointer" onClick={logout}></i>
          </div>
        </div>

        {/* content */}
        <div className=" flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-col sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl border border-white min-h-[526px] rounded-xl shadow-lg">
          
          <div className='w-full flex flex-row gap-4 py-2 justify-end items-center relative'>
            {FilterTrue&&
            <div className='absolute top-3 right-0'>
              <FilterComponent 
              ApplyFilter={ApplyFilter}
              Check={Check}
              SetCheck={SetCheck}
              />
            </div>}
          {ClearOption&&
            <button 
            className='h-fit rounded-xl shadow bg-white text-lg px-2'
            onClick={clearOptions}
            >
              clear result X
            </button>}
            <i className=" fa-solid fa-filter fa-2xl hover:cursor-pointer" style={{"color":" #1f5149"}} 
            onClick={(e)=>{
              e.stopPropagation()
              SetFilterTrue(!FilterTrue)}}></i>
          </div>
          <div className="flex-1 px-2 sm:px-0 ">
            <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              {
                ProductData.map((data, index) => {
                  return (
                    <div className=" bg-white hover:border border-gray-200 py-5 px-4 flex flex-col cursor-pointer rounded-md h-96 hover:shadow-xl w-[18rem] gap-2"
                      key={index}
                    > 
                    <div className='w-full'>
                      <img src={data.images[0]} alt="img" className='h-[14rem] w-full rounded' />
                    </div>
                    <p>
                      {data.title}
                    </p>
                    <div className='flex flex-row gap-8 items-center text-lg'> 
                      <p className='font-semibold text-lg'>
                      Rs.{data.price}
                      </p>
                      <p className='text-green-500 font-semibold text-sm'>
                      {data.discountPercentage+"% OFF"}
                      </p>
                    </div>
                    <div>
                      {
                        cartList.includes(data.id)?
                        <button className='bg-green-300 text-white text-lg font-semibold rounded-xl hover:shadow-lg px-3'
                        onClick={()=>RemoveFromCart(data.id,data.price)}
                        >
                          Already Added
                        </button>
                        :
                        <button className='bg-green-300 text-white text-lg font-semibold rounded-xl hover:shadow-lg px-3'
                      onClick={()=>AddToCart(data.id,data.price)}
                      >
                        Add To Cart
                      </button>

                      }
                    </div>
                    </div>
                  )
                })
              }
            </div>
            {
              ProductData.length===0&&
              <div className='flex text-xl font-semibold'>
                  <p className='m-auto'>
                    No Products Found
                  </p>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home