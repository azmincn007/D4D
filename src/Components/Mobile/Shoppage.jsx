import React, { useContext, useState } from "react";
import { NavbarComponent } from "../../Pages/Navbar/Navbar";
import "../../styles/Cards.css";
import { useLocation } from "react-router-dom";
import { UseridContext } from "../../App";
import { useMutation } from "react-query";
import LazyImage from "../../api/Lazyimage";
import { API_BASE_URL } from "../../config/config";
import axios from "axios";


const fetchProductDetails = async ({ product_id, user_id }) => {
  console.log(product_id);
  console.log(user_id);
  
  
  const { data } = await axios.post(`${API_BASE_URL}/api/public/shop/product-details`, {
    product_id,
    user_id,
  });
  console.log(data);

  return data.data;
};

function Shoppage() {
  const [Userid] = useContext(UseridContext);
  const location = useLocation();
  const { productId } = location.state || {};
  const [productData, setProductData] = useState(null);
console.log(Userid);

  console.log(productId);
  

  const mutation = useMutation(fetchProductDetails, {
    onSuccess: (data) => {
      console.log("Product details:", data);
      setProductData(data);
    },
    onError: (error) => {
      console.error("Error fetching product details:", error);
    },
  });

  React.useEffect(() => {
    if (productId && Userid) {
      mutation.mutate({ product_id: productId, user_id: Userid });
    }
  }, [productId, Userid]);

  if (mutation.isLoading) return <div>Loading...</div>;
  if (mutation.isError) return <div>Error: {mutation.error.message}</div>;

  const { details, product } = productData || {};

  return (
    <div className="mobilessingle">
      <NavbarComponent hideToggle={true} />
      <div className="m-8 font-inter">
        <div className="bg-[#F1F1F1] w-[100%]  rounded-[20px] p-8">
          {productData && (
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Product Image */}
              <div className="col-span-4 w-full">
                {product?.image && (
                  <LazyImage src={product.image} alt={`Image of ${product.product_eng || "product"}`} className="w-full max-h-[300px] rounded-[30px]" />
                )}
              </div>

              {/* Content */}
              <div className="col-span-8 h-full flex flex-col justify-between py-4">
                <div className="flex gap-4 items-center  ">
                  <div>
                    <LazyImage src={details.logo} alt={`Image of ${product.product_eng || "product"}`} className=" h-[50px] w-[50px] rounded-[10px]" />
                  </div>
                  <div className="text-[22px] font-semibold">{details.shopname_eng}</div>
                </div>

                <div> {details.desc}</div>
                <div className='grid grid-cols-12' >
                
                  <div className="col-span-9 flex gap-8 items-center" > 
                    <p className="text-[18px] font-semibold">
                      {details.shopname_eng}
                    </p>
                    <p className="bg-yellow px-4 py-2 rounded-3xl">{product.offer_price}</p>
                    <div className="relative">
                <div className="absolute w-full h-[1px] bg-[#FF0000] top-1/2 transform -rotate-12"></div>
                <div className="absolute w-full h-[1px] bg-[#FF0000] top-1/2 transform rotate-12"></div>
                <p className=" text-[20px] ">{product.normal_price}</p>
              </div>

                  </div>
                  <div className="col-span-3 flex justify-end">
                    <button className="bg-yellow py-2 px-4 font-semibold  rounded-3xl">Go to FLyer</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shoppage;
