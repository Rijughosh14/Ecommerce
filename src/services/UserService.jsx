import axios from 'axios'
import Cookies from 'js-cookie'

export const userSignIn=(username,password)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            
            const config={
                method:'post',
                url:'https://dummyjson.com/auth/login',
                headers:
                { 
                    'Content-Type': 'application/json' 
                },
                data: JSON.stringify({
        
                    username:username,
                    password:password,
                    // expiresInMins: 60, // optional
                  })
            }
            const response=await axios(config)
            Cookies.set('userToken',response.data.token)
            return resolve()
        } catch (error) {
            return reject(error)
        }
    })
}

export const getUserSession=()=>{
    const data=Cookies.get('userToken')

    if(data){
        return true
    }

    return false
}

export const userLogout=()=>{
    Cookies.remove('userToken')
}

export const getProducts=()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const config={
                method:'get',
                url:'https://dummyjson.com/products'
            }
            const response=await axios(config)
            return resolve(response.data)
            
        } catch (error) {
            return reject(error)
        }
    })
}

export const searchProduct=(product)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const config={
                method:'get',
                url:'https://dummyjson.com/products/search',
                params:{
                    q:product
                }
            }

            const response=await axios(config)
            return resolve(response.data)
        } catch (error) {
            return reject(error)
        }
    })
}