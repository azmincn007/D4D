import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Card, Button } from 'flowbite-react';
import { MdEdit } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiDeleteBin6Fill } from "react-icons/ri";
import ConfirmDeleteModal from './ConfirmDelete';
import { API_BASE_URL } from '../../../../config/config';


const fetchFlyers = async () => {
  const authToken = localStorage.getItem('authToken');
  const { data } = await axios.get(`${API_BASE_URL}/api/restaurent/all-flyers`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  return data.data.flyers;
};

function Flyercard({ onEditFlyer,maxItems, onItemCountChange ,selectedSubcategory,selectedCategory}) {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [filteredFlyers, setFilteredFlyers] = useState([]);

  
  

  const { data: flyers, isLoading, isError, error } = useQuery({
    queryKey: ['flyers'],
    queryFn: fetchFlyers,
  });

  useEffect(() => {
    if (flyers && Array.isArray(flyers)) {
      onItemCountChange(flyers.length);
    }
  }, [flyers, onItemCountChange]);


  useEffect(() => {
    if (flyers) {
      setFilteredFlyers(flyers.filter(flyer => {
        const categoryMatch = selectedCategory === 'All' || flyer.cat_eng === selectedCategory;
        const subcategoryMatch = selectedSubcategory === 'All' || flyer.subcat_eng === selectedSubcategory;
        return categoryMatch && subcategoryMatch;
      }));
    }
  }, [flyers, selectedCategory, selectedSubcategory]);

  const updateFlyerStatus = async ({ flyer_id, status }) => {
    const authToken = localStorage.getItem('authToken');
    const { data } = await axios.post(
      `${BASE_URL}/api/restaurent/flyer-status`,
      { flyer_id, status },
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    return data;
  };

  const updateStatusMutation = useMutation(updateFlyerStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('flyers');
    },
  });

  const handleOpenDeleteModal = (flyer) => {
    setSelectedFlyer(flyer);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedFlyer(null);
  };

  const onDeleteSuccess = () => {
    queryClient.invalidateQueries('flyers');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (!Array.isArray(flyers)) {
    console.error('flyers is not an array:', flyers);
    return <div>Error: Data is not in the expected format</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
        {filteredFlyers.map((flyer, index) => (
          flyer ? (
            <FlyerCard
            key={index}
            flyer={flyer}
            updateStatusMutation={updateStatusMutation}
            onEditFlyer={onEditFlyer}
            onOpenDeleteModal={handleOpenDeleteModal}
          />
          ) : null
        ))}
      </div>
      {filteredFlyers.length === 0 && (
        <div className="text-center mt-4">
          No flyers found for the selected category and subcategory.
        </div>
      )}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDeleteSuccess={onDeleteSuccess}
        itemName={selectedFlyer?.title}
        itemId={selectedFlyer?.id}
        itemType="flyer"
      />
    </>
  );
}

const FlyerCard = ({ flyer, updateStatusMutation, onEditFlyer, onOpenDeleteModal }) => {
  if (!flyer) {
    console.error('Flyer is undefined in FlyerCard');
    return null;
  }

  const [isActive, setIsActive] = useState(flyer.status === 'Active');
  const [isHovered, setIsHovered] = useState(false);

  const handleStatusToggle = () => {
    const newStatus = isActive ? 'Blocked' : 'Active';
    updateStatusMutation.mutate(
      { flyer_id: flyer.id, status: newStatus },
      {
        onSuccess: () => {
          setIsActive(!isActive);
        },
      }
    );
  };

  const fullImageUrl = flyer.image ? `${API_BASE_URL}${flyer.image}` : "/placeholder.svg";

  return (
    <Card 
      className="w-full max-w-sm rounded-lg shadow-lg cardmenu relative overflow-hidden transition-all duration-300 ease-in-out" 
      style={{ opacity: isActive ? 1 : 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={fullImageUrl}
          alt={flyer.title}
          className="h-56 w-full rounded-t-lg object-cover"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <Button size="sm" className="rounded-full buttononmenu" onClick={() => onEditFlyer(flyer)}>
            <MdEdit className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button size="sm" className="rounded-full buttononmenu" onClick={() => onOpenDeleteModal(flyer)}>
            <RiDeleteBin6Fill className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold">{flyer.title}</h3>
          <Button color="gray" size="sm" className="rounded-full" onClick={handleStatusToggle}>
            {isActive ? (
              <FaEye className="h-5 w-5 text-muted-foreground" />
            ) : (
              <FaEyeSlash className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
        </div>
        <div className="text-sm font-medium">
          Expires: {flyer.valid_to}
        </div>
      </div>
      <div 
        className={`absolute inset-0 bg-white bg-opacity-90 p-4 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ zIndex: 5 }}
      >
        <div className='my-12 font-inter'>
        <h4 className="text-lg font-bold mb-2 my-4 mx-4">Products Linked</h4>
        <ul className='mx-4'>
          {flyer.products && flyer.products.map((product, index) => (
            <li key={index} className="mb-1">{product.product_eng}</li>
          ))}
        </ul>
        </div>
        
      </div>
    </Card>
  );
};

export default Flyercard;