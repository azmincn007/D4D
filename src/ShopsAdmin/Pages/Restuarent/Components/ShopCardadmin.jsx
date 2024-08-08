import React, { useEffect, useRef, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Card, Button } from 'flowbite-react';
import { MdEdit } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiDeleteBin6Fill } from "react-icons/ri";
import ConfirmDeleteModal from './ConfirmDelete';
import Errorpage404 from '../../../../api/Errorpage404';
import Loading from '../../../../api/Loading';
import { API_BASE_URL } from '../../../../config/config';


const fetchProducts = async () => {
  const authToken = localStorage.getItem('authToken');
  const { data } = await axios.get(`${API_BASE_URL}/api/restaurent/all-products`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  return data.data.products;
};

const ShopCardAdmin = ({ currencySymbol, onEditProduct, selectedCategory, selectedSubcategory, onProductsLoad }) => {
  const { data: products, isLoading, isError, error, refetch } = useQuery('products', fetchProducts);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      const productInfo = products.map(item => ({
        id: item.id,
        product_eng: item.product_eng
      }));
      onProductsLoad(productInfo);
    }
  }, [products, onProductsLoad]);

  if (isLoading) return <div><Loading/></div>;
  if (isError) return <div><Errorpage404/></div>;

  if (!Array.isArray(products)) {
    console.error('products is not an array:', products);
    return <div>Error: Data is not in the expected format</div>;
  }

  const filteredProducts = products.filter(item => {
    if (selectedCategory === 'All') return true;
    if (item.cat_eng !== selectedCategory) return false;
    if (selectedSubcategory === 'All') return true;
    return item.subcat_eng === selectedSubcategory;
  });

  const handleDeleteSuccess = () => {
    refetch();
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
      {filteredProducts.map((item, index) => (
        item ? (
          <ProductCard
            key={item.id || index}
            item={item}
            currencySymbol={currencySymbol}
            onEdit={onEditProduct}
            onDeleteSuccess={handleDeleteSuccess}
            refetch={refetch}
          />
        ) : null
      ))}
    </div>
  );
};

const ProductCard = ({ item, currencySymbol, onEdit, onDeleteSuccess, refetch }) => {
  const [isActive, setIsActive] = useState(item.status === 'Active');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleStatusToggle = async () => {
    const newStatus = isActive ? 'Blocked' : 'Active';
    const data = { product_id: item.id, status: newStatus };
    
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(
        `${API_BASE_URL}/api/restaurent/product-status`,
        data,
        { headers: { 'Authorization': `Bearer ${authToken}` } }
      );
      
      console.log('Response received:', response.data);
      setIsActive(!isActive);
      refetch();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const fullImageUrl = item.image ? `${API_BASE_URL}${item.image}` : "/placeholder.svg";
  
  return (
    <>
      <Card className="w-full max-w-sm rounded-lg shadow-lg cardmenu" style={{ opacity: isActive ? 1 : 0.5 }}>
        <div className="relative">
          <img
            src={fullImageUrl}
            alt={item.product_eng}
            className="h-56 w-full rounded-t-lg object-cover"
          />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button size="sm" className="rounded-full buttononmenu" onClick={() => onEdit(item)}>
              <MdEdit className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button size="sm" className="rounded-full buttononmenu" onClick={handleDeleteClick}>
              <RiDeleteBin6Fill className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{item.cat_eng}</span>
          </div>
          <h3 className="mb-2 text-lg font-bold">{item.product_eng}</h3>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-[#4BB543]">{currencySymbol}{item.offer_price}</span>
              {item.normal_price && (
                <span className="ml-2 text-sm font-medium text-muted-foreground line-through text-[#ff3333]">{currencySymbol}{item.normal_price}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button color="gray" size="sm" className="rounded-full" onClick={handleStatusToggle}>
                {isActive ? (
                  <FaEye className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <FaEyeSlash className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-medium text-gray-500">Expires</p>
              <p className="font-medium">{item.valid_to || 'N/A'}</p>
            </div>
            <div>
             <div className='border-2 border-yellow flex justify-center rounded-xl'>
             <p className="font-medium">{item.subcat_eng}</p>
             </div>
            </div>
          </div>
        </div>
      </Card>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDeleteSuccess={onDeleteSuccess}
        itemName={item.product_eng}
        itemId={item.id}
        itemType="shopcard"
      />
    </>
  );
};

export default ShopCardAdmin;