
import { useContext, useEffect, useState } from "react"
import Title from "./Title"
import { ShopContext } from "../context/ShopContext"
import ProductItem from "./ProductItem";

const BestSaler = () => {
  const {products}=useContext(ShopContext);
  const [bestSaler, setBestSaler]=useState([])

  useEffect(()=>{
    const bestproduct= products.filter((item)=>(item.bestseller))
    setBestSaler(bestproduct.slice(0,5))
  },[products])
  return (
    <div>
        <div className="text-center py-8 text-3xl">
        <Title text1={'BEST'} text2={'SALER'}/>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          This is our BEST SALER.
        </p>
      </div>

      {/* Rendering Data that having Bestsaler as True */}
      <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
        {bestSaler.map((items,index)=>(
          <ProductItem key={index} id={items._id} name={items.name} image={items.image} price={items.price}/>
        ))}
      </div>
    </div>
  )
}

export default BestSaler