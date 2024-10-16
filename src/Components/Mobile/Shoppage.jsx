import React, { useContext, useState, useEffect } from "react";
import "../../styles/Cards.css";
import { useParams, Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { UseridContext } from "../../App";
import { useMutation } from "react-query";
import { API_BASE_URL } from "../../config/config";
import axios from "axios";
import Homecards from "../Cards/Homecards";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useLanguageText from "../Uselanguagetext";
import { ShimmerCard, ShimmerEffect, ShimmerText } from "../Cards/Shimmer/Shimmer";

const fetchProductDetails = async ({ product_id, user_id }) => {
  const { data } = await axios.post(`${API_BASE_URL}/api/public/shop/product-details`, {
    product_id,
    user_id,
  });
  return data.data;
};

function Shoppage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [Userid] = useContext(UseridContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const isFlyer = location.pathname.includes('/flyer/');

  const symbol = localStorage.getItem('currencySymbol');

  const handleGoToFlyer = () => {
    if (productData && productData.flyers) {
      navigate(`flyer/${productId}`, { 
        state: { flyers: productData.flyers, isLoading: true },
        relative: 'route'
      });
    } else {
      console.error("Flyers data not available");
    }
  };

  const mutation = useMutation(fetchProductDetails, {
    onSuccess: (data) => {
      setProductData(data);
    },
    onError: (error) => {
      console.error("Error fetching product details:", error);
      navigate('/404'); // Navigate to 404 page on error
    },
  });

  useEffect(() => {
    const effectiveUserId = Userid || 0;
    if (productId) {
      mutation.mutate({ product_id: productId, user_id: effectiveUserId });
    }
  }, [productId, Userid]);

  // Add this error check
  if (mutation.isError) {
    React.useEffect(() => {
      navigate('/404');
    }, []);
    return null;
  }

  const { details, product, similar_products, compare_products } = productData || {};  

  return (
    <div className="mobilessingle">
      {isFlyer ? (
        <Outlet />
      ) : (
        <>
          <div className="m-8 font-inter">
            <div className="bg-[#F1F1F1] w-[100%] rounded-[20px] p-8">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Product Image */}
                <div className="col-span-3 w-full Tab:col-span-12">
                  {mutation.isLoading || !product?.image ? (
                    <ShimmerEffect className="w-full h-[300px] " />
                  ) : (
                    <img 
                      src={`${API_BASE_URL}${product.image}`} 
                      alt={`Image of ${product.product_eng || "product"}`} 
                      className="w-full max-h-[300px] rounded-[30px]" 
                    />
                  )}
                </div>
                
                {/* Content */}
                <div className="col-span-9 h-full flex flex-col justify-between py-4 Tab:col-span-12 Tab:gap-4">
                  <div className="flex gap-4 items-center Mobile:justify-center">
                    <div>
                      {mutation.isLoading || !details?.logo ? (
                        <ShimmerEffect className="h-[50px] w-[50px] rounded-[10px]" />
                      ) : (
                        <img 
                          src={`${API_BASE_URL}${details.logo}`} 
                          alt={`Logo of ${details.shopname_eng || "shop"}`} 
                          className="h-[50px] w-[50px] rounded-[10px]" 
                        />
                      )}
                    </div>
                    <div className="text-[22px] font-semibold">
                      {mutation.isLoading ? (
                        <ShimmerText width="w-40" height="h-6" />
                      ) : (
                        useLanguageText({
                          country_eng: details?.shopname_eng,
                          country_ar: details?.shopname_ar,
                          country_mal: details?.shopname_mal,
                          country_hin: details?.shopname_hin,
                        })
                      )}
                    </div>
                  </div>
                  
                  <div className="Mobile:flex Mobile:justify-center Mobile:text-center">
                    {mutation.isLoading ? (
                      <>
                        <ShimmerText className='w-full' />
                      </>
                    ) : (
                      useLanguageText({
                        country_eng: product?.desc_eng,
                        country_ar: product?.desc_ar,
                        country_mal: product?.desc_mal,
                        country_hin: product?.desc_hin
                      })
                    )}
                  </div>
                  <div className='grid grid-cols-12'>
                    <div className="col-span-9 flex gap-8 items-center">
                      <p className="text-[18px] font-semibold">
                        {mutation.isLoading ? (
                          <ShimmerText width="w-32" />
                        ) : (
                          useLanguageText({
                            country_eng: details?.shopname_eng,
                            country_ar: details?.shopname_ar,
                            country_mal: details?.shopname_mal,
                            country_hin: details?.shopname_hin
                          })
                        )}
                      </p>
                      {mutation.isLoading ? (
                        <ShimmerEffect className="w-20 h-10 rounded-3xl" />
                      ) : (
                        <p className="bg-yellow px-4 py-2 rounded-3xl">
                          {`${symbol}${product?.offer_price}`}
                        </p>
                      )}
                      {mutation.isLoading ? (
                        <ShimmerEffect className="w-20 h-8" />
                      ) : (
                        <div className="relative">
                          <div className="absolute w-full h-[1px] bg-[#FF0000] top-1/2 transform -rotate-12"></div>
                          <div className="absolute w-full h-[1px] bg-[#FF0000] top-1/2 transform rotate-12"></div>
                          <p className="text-[20px]">{`${symbol}${product?.normal_price}`}</p>
                        </div>
                      )}
                    </div>
                    <div className="col-span-3 flex justify-end">
                      {mutation.isLoading ? (
                        <ShimmerEffect className="w-28 h-10 rounded-3xl" />
                      ) : (
                        <button 
                          className="bg-yellow py-2 px-4 font-semibold rounded-3xl"
                          onClick={handleGoToFlyer}
                        >
                          {useLanguageText({
                            country_eng: "Go to Flyer",
                            country_ar: "الذهاب إلى النشرة",
                            country_mal: "ഫ്ലയറിലേക്ക് പോകുക",
                            country_hin: "फ्लायर पर जाएं"
                          })}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Products Section */}
            {similar_products && similar_products.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  {mutation.isLoading ? (
                    <ShimmerText width="w-48" height="h-8" />
                  ) : (
                    useLanguageText({
                      country_eng: "Similar Products",
                      country_ar: "منتجات مماثلة",
                      country_mal: "സമാനമായ ഉൽപ്പന്നങ്ങൾ",
                      country_hin: "समान उत्पाद"
                    })
                  )}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {mutation.isLoading ? (
                    Array(6).fill().map((_, index) => (
                      <Homecards
                        key={index}
                        isLoading={true}
                      />
                    ))
                  ) : (
                    similar_products.map((product, index) => (
                      <Link key={index} to={`/Shoppage/${product.id}`} className="w-full">
                        <Homecards
                          product={product}
                          currencySymbol={symbol}
                          isRestaurant={false}
                          isLoading={false}
                        />
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Compare Products Section */}
          {productData && productData.compare_products && productData.compare_products.length > 0 && (
            <div className="mt-8 mx-8">
              <h2 className="text-2xl font-semibold mb-4">
                {mutation.isLoading ? (
                  <ShimmerText width="w-48" height="h-8" />
                ) : (
                  useLanguageText({
                    country_eng: "Compare Products",
                    country_ar: "قارن المنتجات",
                    country_mal: "ഉൽപ്പന്നങ്ങൾ താരതമ്യം ചെയ്യുക",
                    country_hin: "उत्पादों की तुलना करें"
                  })
                )}
              </h2>
              <div className="flex flex-col lg:flex-row">
                {/* Left section: Current product */}
                <div className="w-full lg:w-1/6 pr-4 mb-4 lg:mb-0">
                  <div className="current-product-card relative">
                    <Homecards
                      product={productData.product}
                      currencySymbol={symbol}
                      isRestaurant={false}
                      isLoading={mutation.isLoading}
                    />
                    <div className="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 text-sm rounded-tl-md rounded-br-md">
                      {mutation.isLoading ? (
                        <ShimmerText width="w-24" height="h-4" />
                      ) : (
                        useLanguageText({
                          country_eng: "Current Product",
                          country_ar: "المنتج الحالي",
                          country_mal: "നിലവിലെ ഉൽപ്പന്നം",
                          country_hin: "वर्तमान उत्पाद"
                        })
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Right section: Compare products with swiper */}
                <div className="w-full lg:w-5/6">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    spaceBetween={10}
                    breakpoints={{
                      320: { slidesPerView: 2, spaceBetween: 10 },
                      640: { slidesPerView: 3, spaceBetween: 15 },
                      768: { slidesPerView: 3, spaceBetween: 20 },
                      1024: { slidesPerView: 5, spaceBetween: 25 }
                    }}
                  >
                    {mutation.isLoading ? (
                      Array(5).fill().map((_, index) => (
                        <SwiperSlide key={index}>
                          <Homecards isLoading={true} />
                        </SwiperSlide>
                      ))
                    ) : (
                      productData.compare_products.map((product, index) => (
                        <SwiperSlide key={index}>
                          <Homecards
                            product={product}
                            currencySymbol={symbol}
                            isRestaurant={false}
                            isLoading={false}
                          />
                        </SwiperSlide>
                      ))
                    )}
                  </Swiper>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Shoppage;