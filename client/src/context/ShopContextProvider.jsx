import PropTypes from "prop-types";
import { ShopContext } from "./ShopContext"; 
import axios from 'axios'
import { useEffect, useState  } from "react";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 10;

  const backendUrl= import.meta.env.VITE_BACKEND_URL;

  const [token,setToken]=useState('')

  const [products, setProducts]=useState([])
  //for search 
  const [search,setSearch]=useState('')
  const [showSearch,setShowSearch]=useState(false)
  const navigate =useNavigate();
  // for cart
  const [cartItems,setCartItems]=useState({})

  // setCardItems
  

  const addToCart=async(itemId,size)=>{
    if(!size){
      toast.error("Select Product Size")
      return;
    }
    let cardData = structuredClone(cartItems);
    if(cardData[itemId]){
      if(cardData[itemId][size]){
        cardData[itemId][size] += 1;
      }
      else{
        cardData[itemId][size] = 1;
      }
    }
    else{
      cardData[itemId]={};
      cardData[itemId][size]=1;
    }
    setCartItems(cardData)

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  const cartCount = () => {
  let totalCount = 0;
    for (let itemId in cartItems) {
      for (let size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
  return totalCount;
  }

  // update when we delete item
  const updateQuantity = async (itemId,size,quantity)=>{
    let cartData=structuredClone(cartItems)
    cartData[itemId][size]=quantity;
    setCartItems(cartData)

    if(token){
      try {
        await axios.post(backendUrl+"/api/cart/update",{itemId,size,quantity},{headers:{token}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }
  
  const getUserCart=async(token)=>{
    try {
      const response=await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
      
      if(response.data.success){
        setCartItems(response.data.cartData)
      }

    } catch (error) {
      console.log(error)
        toast.error(error.message)
    }
  }
  // cart amount
  const getCartAmount=()=>{
      let totalAmount=0;
      for(const itemId in cartItems){
        let itemInfo=products.find((product)=>product._id===itemId);
        if (!itemInfo) continue;
        
        for(const size in cartItems[itemId]){
          try {
            if(cartItems[itemId][size]>0){
              totalAmount += itemInfo.price * cartItems[itemId][size]
            }
          } catch (error) {
            console.error(error)
          }
        }
      }
      return totalAmount;
  }

  const getProduct=async()=>{
    try {
      const response=await axios.get(backendUrl + "/api/product/list")
      
      if(response.data.success){
        setProducts(response.data.product)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    getProduct()
  },[])

  useEffect(()=>{
    if(!token && localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      getUserCart(localStorage.getItem("token"))
    }
  },[])

  const value = { products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch ,
    cartItems,addToCart,setCartItems,
    cartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,token,
   };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
