import { useContext, useEffect, useState } from "react"
import {ShopContext} from '../context/ShopContext'
import {assets} from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
const Collection = () => {
  
  const {products ,search , showSearch}=useContext(ShopContext)
  const [showFilter,setShowFliter]=useState(false)
  const [filterProducts,setFilterProducts]=useState([]);

  const [sortType,setSortType]=useState('relavent')

  // adding logic to filter options ******************************
  const [category,setCategory]=useState([])
  const [subCategory,setSubCategory]=useState([])

  const toggle = e=>{
    if(category.includes(e.target.value)){
        setCategory(prev=>prev.filter(items=>items!==e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }
  const subCategoryToggle=e=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(items=>items!==e.target.value))
    }
    else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }

  const applyFilter=()=>{
    let productCopy=products.slice();
    if(category.length>0){
      productCopy=productCopy.filter(items=> category.includes(items.category))
    }
    //for subcategory
    if(subCategory.length>0){
      productCopy=productCopy.filter(items=> subCategory.includes(items.subCategory))
    }

    // for search purpose 
    if(showSearch && search){
      productCopy=productCopy.filter(items=>items.name.toLowerCase().includes(search.toLowerCase()))
    }
    setFilterProducts(productCopy)
  }

  useEffect(()=>{
    applyFilter()
  },[category,subCategory,search,showSearch,products])
   
  // experiment to add time
  // useEffect(()=>{    
  //   setTimeout(()=>{
  //     applyFilter
  //   },2000)
  // },[search,showSearch])
  // *************************************************************
  
  const sortProduct =()=>{
    let fpCopy= filterProducts.slice()

    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;
      
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{ 
    sortProduct()
  },[sortType])
 
  
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-10 pt-10 border-t">

      {/* Filter Option */}
      <div className="min-w-60">
        <p className="py-2 items-center text-xl gap-2 flex cursor-pointer" onClick={()=>setShowFliter(!showFilter)}>FILTER
          <img className={`h-3 sm:hidden ${showFilter? 'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>
        

        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 pt-6 mt-6 ${showFilter ? '' : 'hidden'} sm:block`} >
          <p className="font-medium mb-3 text-sm">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={"Men"} onChange={toggle}/>Men
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={"Women"} onChange={toggle}/>Women
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={"Kids"} onChange={toggle}/>Kids
              </p>
          </div>
        </div>
        
        {/* subcatories */}
        <div className={`border border-gray-300 pl-5 py-3 pt-6 my-5 ${showFilter ? '' : 'hidden'} sm:block`} >
          <p className="font-medium mb-3 text-sm">TYPE</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={"Topwear"} onChange={subCategoryToggle}/>Topwear
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={subCategoryToggle}/>Bottomwear
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value={"Winterwear"}  onChange={subCategoryToggle}/>Winterwear
              </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={"ALL"} text2={'COLLECTION'}/>
            {/* product sort */}
            <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
              <option value="relavent">Sort by : Relavent</option>
              <option value="low-high">Sort by:Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
        </div>
        {/* map product */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((items,index)=>(
              <ProductItem key={index} name={items.name} id={items._id} price={items.price} image={items.image}/>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Collection