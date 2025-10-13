
const NewsLetterBox = () => {

    const onSumbitHandler=(event)=>{
        event.preventDefault();
    }

  return (
    <div className="text-center ">
        <p className="text-2xl font-medium text-gray-800">Buy Now & get 20% off</p>
        <p className="text-gray-400 mt-3"></p>

        <form onSubmit={onSumbitHandler} className="w-full flex items-center gap-3 sm:w-1/2 mx-auto my-6 border pl-3">
            <input type="email" placeholder="Enter Your Email" className="w-full sm:flex-1 outline-none" required/>
            <button type="submit" className="bg-black text-white text-xs px-10 py-4">SUBMIT</button>
        </form>
    </div>
  )
}

export default NewsLetterBox