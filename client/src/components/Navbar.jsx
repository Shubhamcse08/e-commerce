import { Link, NavLink } from "react-router-dom"
import { assets } from '../assets/frontend_assets/assets'
import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"

const Navbar = () => {
    const [visible, setVisible] = useState(false)

    // search bar to make active
    const { showSearch, setShowSearch, cartCount, setToken, setCartItems, navigate, token } = useContext(ShopContext);

    // making logout button last--backend
    const logout = () => {
        navigate('/login')
        localStorage.removeItem("token")
        setToken('')
        setCartItems({})
    }
    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to='/'><img src={assets.logo} className="w-36" alt="Logo" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <a href="http://localhost:5175" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center  gap-1 border border-gray-700 rounded-full px-4  hover:bg-gray-100 transition-all">
                    <p>ADMIN</p>
                </a>


            </ul>

            <div className="flex items-center gap-6">
                <img onClick={() => setShowSearch(!showSearch)} src={assets.search_icon} alt="Search" className="w-5 cursor-pointer" />

                {/* Profile */}
                <div className="group relative">

                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="contact" className="w-5 cursor-pointer" />
                    {/* drop down menu */}
                    {token &&
                        <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                                <p className="cursor-pointer hover:text-black">My Profile</p>
                                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                                <p onClick={logout} className="cursor-pointer hover:text-black">LogOut</p>
                            </div>
                        </div>
                    }
                </div>

                {/* Cart */}
                <Link to='/cart' className="relative">
                    <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                        {cartCount()}
                    </p>
                </Link>

                {/* This part is shown in case of small screen  */}
                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="hidden" className="w-5 cursor-pointer sm:hidden" />

                <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                    <div className="flex flex-col text-gray-500">
                        <div className="flex items-center gap-4 p-3">
                            <img onClick={() => setVisible(false)} src={assets.dropdown_icon} className=" h-4 rotate-180" />
                            <p>Back</p>
                        </div>
                        <div className="flex flex-col">
                            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">Home</NavLink>
                            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">Collection</NavLink>
                            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">About</NavLink>
                            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">Contact</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar