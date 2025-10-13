import { assets } from "../assets/frontend_assets/assets"

const Footer = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
                <img src={assets.logo} alt="" className="mb-5 w-32"/>
                <p className="w-full md:w-2/3 text-gray-600">This is a demo website created by Shubham Singh .</p>
            </div>
            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col">
                <p>Home</p>
                <p>About us</p>
                <p>Delivery</p>
                <p>Private Policy</p>
                </ul>
            </div>
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul>
                    <p>91+ 78.......</p>
                    <p>shubhamcse.eng@gmail.com</p>
                    <p>github.com/Shubhamcse08</p>
                </ul>
            </div>
        </div>
        <div className="text-center py-5">
            <p className="text-sm">Copyright 2025@ shubhamsingh - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer