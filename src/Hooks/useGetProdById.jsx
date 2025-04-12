import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetProdById(productId) {

    
    


    let getSpecificProduct = async () => {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);

    };


  

    return useQuery({ queryKey:["prodById" , productId ] , queryFn: getSpecificProduct , select: (data) => data?.data?.data , refetchOnMount:false , refetchOnWindowFocus:false })
}
