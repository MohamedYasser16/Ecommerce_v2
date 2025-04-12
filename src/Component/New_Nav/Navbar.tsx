import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { NavLink } from "react-router-dom";
import { tokenContext } from "../../Context/LocalContext";
import { CartContext } from "../../Context/CartContext";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CategoryIcon from '@mui/icons-material/Category';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import BookIcon from '@mui/icons-material/Book';
import LoginIcon from '@mui/icons-material/Login';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {


  ////////////////////////////////


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


  ///////////////////////////////
  //  dark mode 

  const mode = localStorage.getItem("dark") === 'dark' ? 'dark' : 'light';

  const darkTheme = createTheme({
    palette: {
      mode,
      background: {
        paper: mode === 'dark' ? '#334155' : '#f3f4f6',
        default: '#f3f4f6',
      },
    },
  });

  ///////////////////////////////


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Link to={"/myProfile"} ><MenuItem onClick={handleMenuClose}>Profile</MenuItem></Link>
        <Link to={"/favorite"} >      <MenuItem onClick={handleMenuClose}>Favorite Posts</MenuItem>      </Link>
      </Menu>
    </>

  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <>
      <Menu
        sx={{ margin: "0px", padding: "0px" }}
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >

        <div className="bg-gray-100 dark:bg-slate-700 dark:text-green-400 my-0 py-0">

          <MenuItem >

            <NavLink
              to={""}
              className="block py-2   font-semibold lg:p-0 text-gray-900 rounded-sm  dark:text-slate-200  "
              aria-current="page"
            >
              <HomeIcon sx={{ fontSize: "29px", marginRight: "8px" }} />
              Home
            </NavLink>
          </MenuItem>



          <MenuItem >
            <NavLink
              to={"/products"}
              className="flex py-2 font-semibold lg:p-0 text-gray-900 rounded-sm  dark:text-slate-200 "
            >
              <LibraryAddIcon sx={{ fontSize: "29px", marginRight: "8px" }} />
              <p className="mx-3">Products</p>
            </NavLink>
          </MenuItem>

          {/* <MenuItem >
        <NavLink
                  to={"/categories"}
                  className="block py-2   font-semibold lg:p-0 text-gray-900 rounded-sm  dark:text-slate-200  "
                >
                 <CategoryIcon sx={{fontSize: "29px" , marginRight:"8px" }} />
                  Categories
                </NavLink>
        </MenuItem> 
        <MenuItem >
          <NavLink
            to={"/brands"}
            className="block py-2   font-semibold lg:p-0 text-gray-900 rounded-sm  dark:text-slate-200  "
          >
            <BookIcon sx={{fontSize: "29px" , marginRight:"8px" }} />
            Brands
          </NavLink>
        </MenuItem> */}


          <MenuItem >
            <NavLink
              to={"/wishList"}
              className=" py-2  flex font-semibold lg:p-0 text-gray-900 rounded-sm  dark:text-slate-200  "
            >
              < FavoriteIcon sx={{ fontSize: "29px", marginRight: "8px" }} />
              <p className="mx-3"> Wish List</p>

            </NavLink>
          </MenuItem>

          {
            token ?
              <MenuItem >
                <NavLink
                  to={"/cart"}
                  className="block font-semibold lg:p-0 text-gray-900 rounded-sm  dark:text-slate-200  "
                >
                  <div className=" flex items-center h-[40px]">

                    <div className="flex flex-col-reverse relative">
                      <i className={`relative right-[2px] top-[-4px] fa-solid fa-cart-shopping text-2xl  ${!number ? "text-red-500" : "text-green-400 "}`} ></i>
                      <span className={`relative right-0 top-[0px] text-center ms-2 ${!number ? " text-red-400" : "text-green-400 "}  `}>{number}</span>
                    </div>
                    <p className=" mx-3 ">Cart</p>

                  </div>

                </NavLink>
              </MenuItem>
              : " "
          }


          {
            token ? " " :
              <MenuItem >
                <NavLink
                  to={"/login"}
                  className="flex py-2 font-semibold lg:p-0 text-gray-900 rounded-sm  dark:text-slate-200 "
                >
                  <LoginIcon sx={{ fontSize: "29px", marginRight: "8px" }} />
                  <p className="capitalize mx-3">Login</p>
                </NavLink>
              </MenuItem>

          }


          {
            token ? " " :
              <MenuItem >
                <NavLink
                  to={"/register"}
                  className="flex py-2   font-semibold lg:p-0 text-gray-900 rounded-sm dark:text-slate-200 "
                >
                  <VpnKeyIcon sx={{ fontSize: "29px", marginRight: "8px" }} />
                  <p className="capitalize mx-3"> Register </p>
                </NavLink>
              </MenuItem>

          }

          {
            token ? <MenuItem onClick={
              () => {
                logout()
              }
            } >

              <LogoutIcon sx={{ fontSize: "29px", marginRight: "8px" }} />

              <p onClick={logout} className="block py-2   font-semibold lg:p-0 text-gray-900 rounded-sm hover:cursor-pointer dark:text-slate-200 ">
                Logout
              </p>
            </MenuItem> : ""
          }

          {/* <MenuItem>
          <label className="inline-flex items-center cursor-pointer ms-2">
            <input onClick={() => {

              setDark(!dark)
              // console.log(dark);
              // localStorage.setItem("dark"  , dark)


            }} type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600" />
          </label>
          </MenuItem> */}



        </div>
      </Menu>
    </>


  );

  return (
    <div className="w-full bg-gray-100 mb-2 dark:bg-slate-700 dark:text-green-400 ">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: "transparent" }} position="static">
          <Toolbar sx={{ margin: "0px", paddingX: "18px", display: "flex", justifyContent: "space-between" }} >

<div className="flex justify-between items-center w-full">

           <div className="">
           <Link to={"/"} >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'block' } }}
                  >
                    <img src={logo} className="h-8" alt="Logo" />
                  </Typography>
                </Link>
           </div>
         


            <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: "center", gap: "5px" } , minWidth:"70%"}}>


              <div className="w-[100%] items-center justify-between hidden  md:flex " id="navbar-cta">

                {/* <Link to={"/"} >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'block' } }}
                  >
                    <img src={logo} className="h-8" alt="Logo" />
                  </Typography>
                </Link> */}

                <ul className="flex flex-col font-medium p-0 lg:p-0 my-4 ms-5 lg:ms-0 rounded-lg lg:space-x-8 rtl:space-x-reverse md:flex-row  md:items-center md:py-0 items-start lg:items-center  lg:border-0  ">
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
                      className="block py-2 px-3 font-semibold lg:p-0 text-gray-900 rounded-sm hover:text-green-500 dark:text-slate-200 dark:hover:text-green-400 "
                    >
                      WishList
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

                <div className="flex items-center ms-9" >

                  <ul className="flex font-medium  lg:p-0 ms-5 my-4 lg:ms-0 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row  items-start lg:items-center  lg:border-0 ">
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

                  <div>

                    <span className="text-white justify-between w-48   font-medium rounded-lg text-sm px-5 py-5 text-center hidden lg:flex">

                      <i className="fa-brands fa-facebook text-black font-bold text-[22px] mx-2 hover:text-green-500 hover:cursor-pointer dark:text-slate-200 dark:hover:text-green-400"></i>
                      <i className="fa-brands fa-instagram text-black font-bold text-[22px] mx-2 hover:text-green-500 hover:cursor-pointer dark:text-slate-200 dark:hover:text-green-400" />
                      <i className="fa-brands fa-linkedin text-black font-bold text-[22px] mx-2 hover:text-green-500 hover:cursor-pointer dark:text-slate-200 dark:hover:text-green-400" />

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

            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none', alignItems: 'center', padding: '5px' } }}>

              <div className="flex items-center"> <label className="inline-flex items-center cursor-pointer ms-2">
                <input onClick={() => {
                  setDark(!dark)
                  // console.log(dark);
                  // localStorage.setItem("dark"  , dark)
                }} type="checkbox" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600" />
              </label></div>

              <IconButton
                sx={{ marginLeft: "8px" }}
                // size="large"
                // aria-label="show more"
                aria-controls={mobileMenuId}
                // aria-haspopup="true"
                onClick={handleMobileMenuOpen}
              // color="inherit"
              >
                <div className="text-slate-900 dark:text-slate-200">
                  <MoreIcon />
                </div>
              </IconButton>
            </Box>

            {/* </div> */}
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}

      </Box>
    </div>
  );
}
