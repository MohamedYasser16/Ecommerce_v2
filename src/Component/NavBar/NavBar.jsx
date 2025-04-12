import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/LocalContext";
import { CartContext } from "../../Context/CartContext";

export default function NavBar() {


  // let { dark, setDark } = useContext(darkModeContext)
  let [dark, setDark] = useState(false)


  let first = useRef(false)
  function setFirst() {
    first.current = true
  }

  useEffect(() => {
    console.log("dark in first use effect --------> ", dark);

    if (first.current) {

      // console.log("dark value store in local storage " , dark );

      localStorage.setItem("dark", dark)


      if (dark === true || dark == true) {
        // console.log("if dark 2 true ----> add dark class" , dark);

        document.querySelector("html").classList.add("dark")
      }
      else {
        // console.log("if dark 3 false -----> remove dark class", dark);

        document.querySelector("html").classList.remove("dark")
      }

    }
    else {

      console.log("first get value from local storage ");

      setFirst()
      // console.log("dark value in first resort -----------> ", localStorage.getItem("dark") );

      let x = JSON.parse(localStorage.getItem("dark"))
      //  console.log("my idea x x x x x x x x" , x );

      setDark(x)
    }

  }, [dark])





  let { number, setNumber } = useContext(CartContext)


  const { token, setToken } = useContext(tokenContext)
  const navigate = useNavigate()
  let logout = () => {
    setToken("")
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.clear()
    navigate("/login")
  }

  useEffect(() => {
    // console.log('token in nav ', token);
  }, [token])


  return (
    <>
      <nav className="bg-gray-100 mb-2 dark:bg-slate-700 dark:text-green-400 ">
        <div className="w-[90%] mx-auto flex flex-wrap items-center justify-between  p-2">

          <div className="flex justify-between w-full lg:w-1/5">

            <a
              to={"https://flowbite.com/"}
              className=" flex items-center space-x-3 rtl:space-x-reverse "
            >
              <img src={logo} className="h-8" alt="Logo" />
            </a>


            <div className=" items-center  lg:hidden  md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 dark:text-slate-200 dark:hover:text-green-400 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                aria-controls="navbar-cta"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
          </div>


          <div
            className="w-[75%] items-center justify-between hidden  lg:flex md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-0 lg:p-0 mt-4 ms-5 lg:ms-0 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row  items-start lg:items-center lg:mt-0 lg:border-0  ">
              <li>
                <NavLink
                  to={""}
                  className="block py-2 px-3  font-semibold lg:p-0 text-gray-900 rounded-sm hover:text-green-500 dark:text-slate-200 dark:hover:text-green-400 "
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/products"}
                  className="block py-2 px-3  font-semibold lg:p-0 text-gray-900 rounded-sm hover:text-green-500 dark:text-slate-200 dark:hover:text-green-400"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/categories"}
                  className="block py-2 px-3  font-semibold lg:p-0 text-gray-900 rounded-sm hover:text-green-500 dark:text-slate-200 dark:hover:text-green-400 "
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/brands"}
                  className="block py-2 px-3  font-semibold lg:p-0 text-gray-900 rounded-sm hover:text-green-500 dark:text-slate-200 dark:hover:text-green-400 "
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/wishList"}
                  className="block py-2 px-3  font-semibold lg:p-0 text-gray-900 rounded-sm hover:text-green-500 dark:text-slate-200 dark:hover:text-green-400 "
                >
                  Wish List
                </NavLink>
              </li>
              {
                token ? <li>
                  <NavLink
                    to={"/cart"}
                    className="block py-2 px-3  font-semibold lg:p-0 text-gray-900 rounded-sm hover:text-green-500 dark:text-slate-200 dark:hover:text-green-400 "
                  >
                    <div className="flex flex-col-reverse relative"> <i className={`fa-solid fa-cart-shopping text-2xl ${!number ? "text-red-500" : "text-green-400 "}`} ></i> <span className={`relative right-0 top-0 text-center ${!number ? " text-red-400" : "text-green-400 "}  `}>{number}</span></div>
                  </NavLink>
                </li> : " "
              }
            </ul>
            <div className="flex  items-center">
              <ul className="flex flex-col font-medium p-0 lg:p-0 mt-1 ms-5 lg:ms-0 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row  items-start lg:items-center lg:mt-0 lg:border-0 ">
                <li>
                  {
                    token ? " " :
                      <NavLink
                        to={"/login"}
                        className="block py-2 px-3  font-semibold lg:p-0 text-gray-900 rounded-sm hover:text-green-500 dark:text-slate-200 dark:hover:text-green-400"
                      >
                        Login
                      </NavLink>

                  }

                </li>
                <li>
                  {
                    token ? " " :
                      <NavLink
                        to={"/register"}
                        className="block py-2 px-3  font-semibold lg:p-0 text-gray-900 rounded-sm hover:text-green-500 dark:text-slate-200 dark:hover:text-green-400"
                      >
                        Register
                      </NavLink>

                  }

                </li>
                {token && <li onClick={logout} className="block py-2 px-3  font-semibold lg:p-0 text-gray-900 rounded-sm hover:text-green-500 hover:cursor-pointer dark:text-slate-200 dark:hover:text-green-400">
                  Logout
                </li>}

              </ul>

              <span className="text-white justify-between w-48   font-medium rounded-lg text-sm px-5 py-5 text-center hidden lg:flex">

                <i className="fa-brands fa-facebook text-black font-bold text-[22px]  hover:text-green-500 hover:cursor-pointer dark:text-slate-200 dark:hover:text-green-400"></i>
                <i className="fa-brands fa-instagram text-black font-bold text-[22px]  hover:text-green-500 hover:cursor-pointer dark:text-slate-200 dark:hover:text-green-400" />
                <i className="fa-brands fa-linkedin text-black font-bold text-[22px]  hover:text-green-500 hover:cursor-pointer dark:text-slate-200 dark:hover:text-green-400" />

                <label className="inline-flex items-center cursor-pointer ms-2">
                  <input onClick={() => {

                    setDark(!dark)
                    // console.log(dark);
                    // localStorage.setItem("dark"  , dark)


                  }} type="checkbox" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600" />
                </label>
              </span>
            </div>
          </div>



        </div>
      </nav>
    </>
  );
}
