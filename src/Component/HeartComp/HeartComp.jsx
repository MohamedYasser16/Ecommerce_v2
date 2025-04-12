import React, { useContext, useState } from "react";
import { tokenContext } from "../../Context/LocalContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function HeartComp({ id }) {
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
          console.log(id);
          addFav();
        }}
      >
        <i
          className={`  ${
            animation ? "text-red-600 fa-beat fa-solid" : "fa-regular"
          }  fa-heart w-[10%] text-xl hover:text-red-600  dark:text-white dark:hover:text-red-500 dark:hover:duration-700
              opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:cursor-pointer transition-all duration-1000 translate-y-9
              `}
        ></i>
      </button>
    </>
  );
}
