import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import HeartComp from '../HeartComp/HeartComp'
import { addCartContext } from '../../Context/AddCartContext'
import { DisplayCartHome } from '../../Context/DisplayCartHome'
import { CartContext } from '../../Context/CartContext'



export default function SpecificBrand({ specificBrands, clickedBrand, firstOne }) {

    let { token, addCart } = useContext(addCartContext)

    //    if ( !specificBrands.length ) {
    //     return <h1 className='capitalize text-2xl text-center font-bold text-green-400 my-7 mb-9'> we haven't any product from <span className='text-black'>{clickedBrand}</span> brand </h1>
    //    }


    //////////
    if (!specificBrands.length && firstOne) {
        return <div>
            <p className=' text-black dark:text-slate-300  text-2xl font-bold my-8 text-center capitalize '>sorry !!<br /> <br /> we haven't any product from <span className='text-green-400 text-2xl font-bold my-4 text-center capitalize'>{clickedBrand}</span> brand </p>
        </div>
    }
    else if (!firstOne) {
        return null
    }

    /////////////////////////////////////////////

    let { displayCart, ArrCart } = useContext(DisplayCartHome)
    let { number, setNumber } = useContext(CartContext)


    let arrangeFunc5 = async (id) => {

        await addCart(id)
        //  await arrangeFunc()
        await displayCart();
        setNumber(ArrCart.length)
    }


    return (
        <>

            <div>
                <div>
                    <h1 className='text-black text-2xl text-center font-bold mt-5 capitalize dark:text-slate-100'>Our<span className='text-green-500 font-bold text-2xl'> {specificBrands[0]?.brand.name}</span> Products </h1>
                    <div className='w-[85%] mx-auto flex flex-wrap my-4'>

                        {
                            specificBrands?.map( (brand , index) =>
                                <div key={index} className='w-[85%] mx-auto md:mx-0 md:w-1/2 lg:w-1/3 xl:w-1/5 p-4 cursor-pointer group '>
                                    <div className='p-2 pt-4 h-[120px] bg-white dark:bg-slate-200/[0.06] border-[1px] border-gray-400 dark:border-green-400 dark:border-[1px] rounded-lg  min-h-[330px] hover:shadow-lg hover:shadow-green-300 transition-all duration-500'>
                                        <Link to={`/products/${brand?.id}`} >
                                            <div className='  mx-auto '>
                                                <img className='w-[50%] object-cover mx-auto' src={brand.imageCover} alt={brand.name} />
                                            </div>
                                            <p className='text-green-400 text-center font-bold text-lg my-2'>{brand.title.split(" ").slice(0, 4).join(" ")}</p>
                                        </Link>
                                        <div className="flex justify-between p-4">
                                            {/* <i className="fa-regular fa-heart " style="color: #FFD43B;"></i> */}

                                            <div className="product  w-[90%] ">
                                                <button onClick={() => {
                                                    arrangeFunc5(brand.id)
                                                    console.log(brand.id)

                                                }} className="opacity-0 w-full mx-auto rounded-md  p-2 text-white bg-green-500 translate-y-12 hover:bg-green-600  transition-all duration-500 btn group-hover:opacity-100 group-hover:translate-y-0 group-hover:cursor-pointer">
                                                    Add
                                                </button>

                                            </div>
                                            <HeartComp id={brand?.id} />
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
