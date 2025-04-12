import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useAllProducts() {


 

    async function getData() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }


    return useQuery({
        queryKey:["allProducts"] , 
        queryFn: getData , 
        select: (data) => data.data.data ,
        refetchOnMount: false ,
        refetchOnWindowFocus:false
    })
}
