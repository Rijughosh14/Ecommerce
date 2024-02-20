import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userSignIn } from '../services/UserService'





const Index = () => {

    const [name,Setname]=useState('')
    const [pass,Setpass]=useState('')
    const navigate=useNavigate()

    const Submit=async()=>{
        if(name===''||pass==='') return
        await userSignIn(name,pass)
        navigate('/home')
    }

  return (

    <div className='min-[425px]:container w-screen flex bg-gradient-to-br from-blue-200 to-blue-100 mx-auto min-h-screen rounded-2xl shadow-2xl shadow-black'>
        <div className='m-auto flex flex-col shadow-xl '>
            <div className='flex flex-col h-64 min-[425px]:w-96 max-[375px]:w-full max-[375px]:m-auto bg-white px-6 py-6 rounded-2xl gap-10'>
        <div>
            <input type="text" className='focus:outline-none  border-b border-black border-opacity-30  w-full p-2 focus:border-opacity-60' placeholder='Name' 
            value={name} onChange={(e)=>Setname(e.target.value)}
             />
        </div>
        <div>
            <input type="password" className='focus:outline-none  border-b border-black border-opacity-30 w-full p-2 focus:border-opacity-60' placeholder='Password' 
            value={pass} onChange={(e)=>Setpass(e.target.value)} 
            />
        </div>
        <div className='mx-auto'>
            <button className='bg-transparent border border-purple-600 py-2 px-4 rounded-lg text-lg text-purple-600 hover:bg-purple-600 hover:text-white' 
            onClick={Submit}
            >
              Sign In
            </button>
        </div>
    </div>
        </div>
    </div>  )
}

export default Index