import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import Productdata from "../Productdata/Productdata";
import Slider1 from "../slider1/slider1";
import Slider2 from "../slider2/slider2";

import { categoryTestContext } from "../../Context/CategoryTestProvider";
import { DisplayCartHome } from "../../Context/DisplayCartHome";
import { CartContext } from "../../Context/CartContext";
import useAllProducts from "../../Hooks/useAllProducts";

export default function Home() {

  // let [productsData, setProductsData] = useState({});
  // let [loading, setLoadng] = useState(true);
  // let [error, setMyError] = useState(false);
  // let {categoryData, setCategoryData , setLoadingCat } = useContext(categoryContext)
  //////////////////////////////////////////////////

  let { categoryTestData, myError, loading: loadingCategory } = useContext(categoryTestContext)
  // let { ProductData, setProductData, loading: loadingProduct, setLoading, myError: myErrorProduct } = useContext(ProductsContext)

  let {data , isError , isLoading , error  } = useAllProducts()
// console.log(data);


  // async function getData() {
  //   setLoadingCat(true)
  //   try {
  //     // var { data } = await axios.get(
  //     //   "https://ecommerce.routemisr.com/api/v1/categories"
  //     // );
  //     // setCategoryData(data.data);
  //     var { data } = await axios.get(
  //       "https://ecommerce.routemisr.com/api/v1/products"
  //     );
  //     setProductsData(data.data);
  //     console.log(data.data);
  //     setMyError(false);
  //   } catch (err) {
  //     setMyError(err.message);   
  //   }
  //   finally{
  //     setLoadingCat(false)
  //     setLoadng(false);
  //   }
  // }
  // useEffect(() => {
  //   getData();
  // }, []);





  // useEffect( ()=>{
  //   displayCart()
  // } , [] )

  if (myError || error ) {
    return (
      <>
        <div className="h-[88vh] flex justify-center items-center">
          <div className="bg-white font-bold text-2xl text-red-500"> {myError || error} </div>
        </div>
      </>
    );
  }
  /////////////////////////////////////////////////////////
  // let  {token} = useContext(tokenContext)
  // console.log('token in home',token);

  //   let [ArrCart, setArrCart] = useState([]);
  //    let { number , setNumber } = useContext(CartContext)

  // let displayCart = async () => {
  //   try {
  //     setLoading(true)

  //     let { data } = await axios.get(
  //       `https://ecommerce.routemisr.com/api/v1/cart`,
  //       {
  //         headers: {
  //            token     }
  //       }
  //     );

  //     console.log( 'display data  ' , data.data);
  //     console.log(data.data);

  //     setArrCart(data.data.products);


  //       // setNumber(ArrCart.length)
  //       console.log(number);



  //     setLoading(false)

  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false)

  //   }
  // };

  // useEffect(() => {
  //   if (token) {  // ✅ Run only when token is available
  //     // setNumber(ArrCart.length)
  //     displayCart(); 
  //   }
  // }, [token ]); 


  // useEffect(() => {
  //   if (token) {  // ✅ Run only when token is available
  //     setNumber(ArrCart.length)
  //   }
  // }, [ ArrCart.length]);  // ✅ Depend on `token`

  let { displayCart, ArrCart } = useContext(DisplayCartHome)
  let { number, setNumber } = useContext(CartContext)

  let arrangeFunc = async () => {
    await displayCart();
    setNumber(ArrCart.length)

  }


  return (
    <>

      <div className="flex flex-wrap w-full">
        {loadingCategory || isLoading ? (
          <div className="h-[88vh] flex justify-center items-center mx-auto">
            {" "}
            <ScaleLoader
              color="#08f32c"
              height={29}
              speedMultiplier={1}
              width={4}
            />{" "}
          </div>
        ) : (
          <div>
            <Slider1 />
            <Slider2 categoryData={categoryTestData} />
            <div className="flex flex-wrap p-6 w-[90%] mx-auto">
              {data?.map((prod) => (
                <Productdata prod={prod} key={prod._id} arrangeFunc={arrangeFunc} ></Productdata>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
