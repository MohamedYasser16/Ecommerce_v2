import React, { useContext, useEffect, useState } from 'react'
// import { searchSpecificCategory } from '../../Context/SearchSpecificCategoryContext'
import Loading from '../Loading/Loading'
import { addCartContext } from '../../Context/AddCartContext'
import { Link } from 'react-router-dom'
import HeartComp from '../HeartComp/HeartComp'
import { categoryTestContext } from '../../Context/CategoryTestProvider'
import axios from 'axios'
import { DisplayCartHome } from '../../Context/DisplayCartHome'
import { CartContext } from '../../Context/CartContext'

export default function SpecificCategory({ specificCategoryId, firstOne, clickedCategory }) {


    let { token, addCart } = useContext(addCartContext)


    console.log(specificCategoryId);
    let [error, setError] = useState(false)
    let [loading1, setLoading1] = useState(false)
    let [specificCategory, setSpecificCategory] = useState([])


    let getSpecificCategory = async (id) => {

        if (id) {

            try {

                setLoading1(true)
                // console.log(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`);
                let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
                console.log(data.data);

                setSpecificCategory(data.data);
                setLoading1(false)
                setError(false)

            } catch (error) {
                console.log(error.message);
                setLoading1(false)
                setError(error.message)
            }
            // finally{
            //     setLoadingCat(false)
            // } 


        }

    }

    useEffect(() => {

        getSpecificCategory(specificCategoryId)


    }, [specificCategoryId])

    //   console.log(firstOne);


    //////////////////////////////////////////////
    let { displayCart, ArrCart } = useContext(DisplayCartHome)
    let { number, setNumber } = useContext(CartContext)


    let arrangeFunc4 = async (id) => {

        await addCart(id)
        //  await arrangeFunc()
        await displayCart();
        setNumber(ArrCart.length)
    }

    if (loading1) {
        return <Loading />
    }

    if (!specificCategory.length && firstOne) {
        return <div>
            <p className=' text-black text-2xl font-bold my-4 text-center capitalize dark:text-slate-100 '>sorry !!<br /> <br /> we haven't any product from <span className='text-green-400 text-2xl font-bold my-4 text-center capitalize'>{clickedCategory}</span> category </p>
        </div>
    }
    else if (!firstOne) {
        return null
    }

    return (
        <>
            <div>
                <h1 className='text-black text-2xl text-center font-bold mt-5 capitalize dark:text-slate-100'>Our<span className='text-green-500 font-bold text-2xl'> {specificCategory[0]?.category.name}</span> Products </h1>
                <div className='w-[85%] mx-auto flex flex-wrap my-4'>

                    {
                        specificCategory?.map( (category , index ) =>
                            <div key={index} className='w-[85%] mx-auto md:mx-0 md:w-1/2 lg:w-1/3 xl:w-1/5 p-4 cursor-pointer group '>
                                <div className='p-2 pt-4 dark:bg-slate-100/[.06]  border-[1px] border-green-400 dark:border-green-400 dark:border-[1px]  rounded-lg  min-h-[280px] hover:shadow-lg hover:shadow-green-300 transition-all duration-500'>
                                    <Link to={`/products/${category?.id}`} >
                                        <div className='  mx-auto '>
                                            <img className='w-[50%] object-cover mx-auto' src={category.imageCover} alt={category.title} />
                                        </div>
                                        <div className="h-[30px] mb-5">

                                            <p className='text-green-400 text-center font-bold text-lg my-2'>{category.title.split(" ").slice(0, 3).join(" ")}</p>
                                        </div>
                                    </Link>
                                    <div className="flex justify-between p-2">
                                        {/* <i className="fa-regular fa-heart " style="color: #FFD43B;"></i> */}

                                        <div className="product  w-[90%] ">
                                            <button onClick={() => {
                                                arrangeFunc4(category.id)
                                                console.log(category.id)

                                            }} className="opacity-0 w-full mx-auto rounded-md  p-2 text-white bg-green-500 translate-y-12 hover:bg-green-600  duration-500 btn group-hover:opacity-100 group-hover:translate-y-0 group-hover:cursor-pointer">
                                                Add
                                            </button>

                                        </div>
                                        <HeartComp id={category?.id} />
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>

        </>
    )
}
