import PropTypes from "prop-types";
import { ShopContext } from "./ShopContext"; 
import { products } from "../assets/frontend_assets/assets";
import { useState  } from "react";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 10;

  //for search 
  const [search,setSearch]=useState('')
  const [showSearch,setShowSearch]=useState(false)
  const navigate =useNavigate();
  // for cart
  const [cartItems,setCardItems]=useState({})

  // 
  

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
    setCardItems(cardData)
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
    setCardItems(cartData)
  }
  
  // cart amount
  const getCartAmount=()=>{
      let totalAmount=0;
      for(const itemId in cartItems){
        let itemInfo=products.find((product)=>product._id===itemId);
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

  const value = { products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch ,
    cartItems,addToCart,
    cartCount,
    updateQuantity,
    getCartAmount,
    navigate
   };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
