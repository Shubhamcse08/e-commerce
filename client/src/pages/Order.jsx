import { useContext,useEffect ,useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"



// import { useContext } from "react"
// import { ShopContext } from "../context/ShopContext"
// import Title from "../components/Title"

// const Order = () => {
//   const {products,currency}=useContext(ShopContext)
//   return (
//     <div className="border-t pt-16">
//       <div className="text-2xl">
//         <Title text1={"My"} text2={"Order"} />
//       </div>
//       <div>
//         {products.slice(1,4).map((iteam,index)=>(
//           <div key={index} className="py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex items-start gap-6 text-sm">
//             <img src={iteam.image[0]} className='w-16 sm:w-20' alt="" />
//             <div>
//               <p className="sm:text-base font-medium">{iteam.name}</p>
//               <div className="flex items-center gap-3 mt-2 text-base text-gray-500">
//                 <p className="text-lg">{currency}{iteam.price}</p>
//                 <p>Quantity:1</p>
//                 <p>Size:m</p>
//               </div>
//               <p className="mt-2">Date: <span className="text-gray-400">25,Oct 2025 </span></p>
//             </div>
//             </div>
//             <div className="md:w-1/2 flex justify-between">
//               <div className="flex items-center gap-2">
//                 <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
//                 <p className="text-sm md:text-base">Ready to ship</p>
//               </div> 
//               <button className="border px-4 text-sm font-medium rounded-sm">Track Order</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Order


// *******************************************************************************************



const Order = () => {
  const {cartItems,products,currency}=useContext(ShopContext)
  const [cartData,setCardData]=useState([])
  useEffect(()=>{
      const tempData=[];
      for(const itemId in cartItems){
        for(const size in cartItems[itemId]){
          if(cartItems[itemId][size]>0){
            tempData.push({
              _id:itemId,
              size:size,
              quantity:cartItems[itemId][size]
            })
          }
        }
      }
      setCardData(tempData)
    },[cartItems])

    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short", // e.g., Oct
      year: "numeric",
    });
  
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Order"} />
      </div>
      
      <div>
        {
          cartData.map((item,index)=>{
            const productData=products.find((product)=> product._id===item._id)

            return (
              <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6 text-sm">
                  <img src={productData.image[0]} className="w-16 sm:w-20" alt="" />
                  <div>
                    <p className=" sm:text-base font-medium">{productData.name}</p>
                    <div className="flex items-center gap-3 text-base text-gray-500 mt-2">
                      <p className="text-lg">{currency}{productData.price}</p>
                      <p >{item.size}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p className="mt-2">Date: <span className="text-gray-400">{formattedDate}</span></p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">Ready to ship</p>
                  </div> 
                  
                </div>
                <button className="border px-4 text-sm font-medium rounded-sm">Track Order</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Order