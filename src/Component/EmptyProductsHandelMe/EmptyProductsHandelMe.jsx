import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { categoryTestContext } from '../../Context/CategoryTestProvider';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Loading from '../Loading/Loading.jsx';
import { RelatedProductsContext } from '../../Context/RelatedProductsContext.jsx';
import axios from 'axios';
import Productdata from '../Productdata/Productdata.jsx';
import { GetSpecificProductById } from '../../Context/GetSpecificProductById.jsx';
import useAllProducts from '../../Hooks/useAllProducts.jsx';

export default function EmptyProductsHandelMe() {



  let [values, setValues] = useState({})
  let [clickedType, seyClickedType] = useState("")
  let [categoryId, setCategoryId] = useState("")
  let [clickedCategory, setClickedCategory] = useState("")
  let [clickedProduct, setClickedProduct] = useState("")
  let [firstOne, setFirstOne] = useState(true)

  let formik = useFormik({

    initialValues: {
      searchType: "",

      searchValue2: ""
    },
    onSubmit: value => {
      setValues(value);
    }

  })


  let { categoryTestData, loading: loading1, myError: erorr1 } = useContext(categoryTestContext)


  let { data , isLoading , error:errorAllProd , isError } = useAllProducts()

console.log(data);


  let [dataArray, setDataArray] = useState([])
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState(false)

  let [buttonClicked, setButtonClicked] = useState(false)

  let getRelatedProduct = async (category) => {
    try {
      setLoading(true)
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${category}`)

      setDataArray(data.data)
      setLoading(false)
      setError(false)
    } catch (er) {
      setError(true)
      setLoading(false)
    }
  };

  let { data: dataProd, loading: loading4, myError: error4, getSpecificProduct } = useContext(GetSpecificProductById)



  let getIdProduct = () => {
    let x = data.filter(prod => prod.title == `${clickedProduct}`)
    return (x[0].id);
  }

  useEffect(() => {

    if (clickedType == "categoryName") {

      console.log("clicked type",clickedType);
      getRelatedProduct(categoryId)
      setButtonClicked(false)
      getSpecificProduct("")

    }

    if (clickedType == "productName") {

      let id = getIdProduct()
      getSpecificProduct(id)
      setButtonClicked(false)
      getRelatedProduct("")
    }

  }, [buttonClicked])

  if (loading1 || isLoading || loading) {
    return < Loading />
  }

  let empty = true   // change the width if the product.jsx call in empty
  return (
    <>

      <div className="my-8 p-5">



        <form className="w-[60%] mx-auto my-8" onSubmit={formik.handleSubmit} >

          <div className="mt-8 p-4 ">
            <h3 className="my-4 text-2l font-bold text-green-500 capitalize dark:text-white">your Search is by</h3>
            <ul className="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input onClick={(e) => {
                  // setFirstOne(true)
                  seyClickedType("productName")
                }}
                  onChange={formik.handleChange}

                  type="radio" id="productName" name="searchType" defaultValue="productName" className="hidden peer" required />
                <label htmlFor="productName" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 dark:peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="block">
                    {/* <div className="w-full text-lg font-semibold">0-50 MB</div> */}
                    <div className="w-full capitalize"> product Name </div>
                  </div>
                  <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </label>
              </li>
              <li>
                <input type="radio" onClick={(e) => {
                  // setFirstOne(true)
                  seyClickedType("categoryName")
                }}
                  onChange={formik.handleChange}

                  id="categoryName" name="searchType" defaultValue="categoryName" className="hidden peer" />
                <label htmlFor="categoryName" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 dark:peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="block">
                    {/* <div className="w-full text-lg font-semibold">500-1000 MB</div> */}
                    <div className="w-full capitalize"> category name </div>
                  </div>
                  <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </label>
              </li>
            </ul>
          </div>




          <div className="w-[100%] mx-auto flex flex-wrap lg:flex-nowrap justify-center items-center mt-2 py-1">

            <input onInput={(e) => {
              setFirstOne(true)
              clickedType == "categoryName" ? setCategoryId(categoryTestData?.find(x => e.target.value == x.name)?._id) : ""
              clickedType == "categoryName" ? setClickedCategory(e.target.value) : ''


              clickedType == "productName" ? setClickedProduct(e.target.value) : ""

            }}
              onChange={formik.handleChange}
              list="browsers2" name="searchValue2" id="browser22" className="w-full lg:w-[90%] me-0 lg:me-3 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
            <datalist id="browsers2">

              {
                clickedType == "categoryName" ?
                  categoryTestData.map(category => <option key={category.name} value={category.name}></option>)
                  : data.map(product => <option key={product._id} value={product.title}></option>)
              }

            </datalist>

            <button type='submit' onClick={() => {
              setButtonClicked(true)
              setFirstOne(false)
            }} className="lg:w-[100px] w-[100%] lg:mx-auto mt-4 lg:mt-0 text-white  bottom-2.5 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-0 lg:px-4 mx-0  py-3 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 "> search </button>

          </div>
        </form>

        <div className='flex flex-wrap p-3 '>

          <div className="w-[90%] mx-auto flex flex-wrap">
            {
              values.searchType === "categoryName" && categoryId && dataArray.length ? dataArray?.map((x, index) => <Productdata key={index} prod={x} />) :
                <div className='w-full text-center'>
                  {
                    !firstOne && values.searchType === "categoryName" && !dataArray.length ? <h2 className='text-black dark:text-white text-xl font-bold my-6'>there aren't any product from <span className='text-green-400 text-xl font-bold'>{clickedCategory}</span> </h2>
                      : ' '
                  }
                </div>
            }
          </div>


          {/* values.searchType === "productName" &&  data.length ? " " : <div className='w-full text-center'> */}

          {
            values.searchType === "productName" && dataProd.id ?  <Productdata empty={empty} prod={dataProd} />  :
              <div className='w-full text-center'>
                {
                  !firstOne && values.searchType === "productName" && !dataProd.id ? <h2 className='text-black dark:text-slate-300 text-xl font-bold my-6'>there aren't any product from <span className='text-green-400 text-xl font-bold'>{clickedProduct}</span> </h2>
                    : ' '
                }
              </div>
          }



        </div>



      </div>


    </>
  )
}






{/* ////////////////////////////////////////////////////////// */ }
{/* <div className="w-[100%] mx-auto flex justify-center items-center mt-2 py-1"> 
       <label htmlFor="browser">Choose your browser from the list:</label> 
        <input  onChange={formik.handleChange} list="browsers2" name="searchValue2" id="browser22"  className=" w-[90%] me-3 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
        <datalist id="browsers2">{ categoryTestData.map( category =>  <option key={category.name} value={category.name}></option> )}
        <option value="Edge"></option>
        <option value="Firefox"></option>
        <option value="Firefox fi eb hs"></option>
        <option value="Chrome"></option>
        <option value="Chrome fh dfj"></option>
        <option value="Opera"></option>
        <option value="Opera kfb ho"></option>
        <option value="Safari"></option>
        <option value="Safari cb ce wb vi"></option></datalist>
        <button type='submit' className="w-[10%] text-white  bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "> search </button> 
    </div> */}
