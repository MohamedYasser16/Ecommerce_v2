import axios from "axios";
import React, { useContext, useState } from "react";
import { tokenContext } from "../Context/LocalContext";
import toast from "react-hot-toast";

export default function HeartComp2({ id }) {
  let [animation, setAnimation] = useState(false);
  let { token } = useContext(tokenContext);

  let addFav = async () => {
    try {
      let x = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: {
            token,
          },
        }
      );
      toast.success("Added to wished list successfully")
      console.log("add to wished list ", x);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <button
        onClick={() => {
          setAnimation(true);
          addFav();
          console.log(id);
        }}
      >
        <i
          className={`  ${
            animation ? "text-red-600 fa-beat fa-solid" : "fa-regular"
          }  fa-heart w-[10%] text-xl hover:text-red-600   dark:text-red-500 dark:hover:text-red-300 dark:hover:duration-700
              opacity-100 hover:cursor-pointer transition-all duration-1000 
              `}
        ></i>
      </button>
    </>
  );
}
