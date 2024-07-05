import React, { useState, useCallback, memo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Card, Button } from 'flowbite-react';
import { MdEdit } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiDeleteBin6Fill } from "react-icons/ri";
import Todayspecial from '../../../Modal/TodaySpecial';
import ConfirmDeleteModal from './ConfirmDelete';

const BASE_URL = 'https://hezqa.com';

const fetchMenuItems = async () => {
  const authToken = localStorage.getItem('authToken');
  const { data } = await axios.get(`${BASE_URL}/api/restaurent/all-menu`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  console.log(data.data.menu);
  return data.data.menu;
};

const updateTodaySpecial = async ({ menu_id, is_special }) => {
  const authToken = localStorage.getItem('authToken');
  const { data } = await axios.post(
    `${BASE_URL}/api/restaurent/todays-special-status`,
    { menu_id, is_special },
    {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  return data;
};

const CardWithEyeIcon = memo(({ item, onEditClick, onDeleteClick, updateSpecialMutation, currencySymbol }) => {
  const [isActive, setIsActive] = useState(item.status === 'Active');
  const [isSpecial, setIsSpecial] = useState(item.is_special === 1);

  const handleStatusToggle = useCallback(async () => {
    const newStatus = isActive ? 'Blocked' : 'Active';
    const data = { menu_id: item.id, status: newStatus };
  
    
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(
        'https://hezqa.com/api/restaurent/menu-status',
        data,
        { headers: { 'Authorization': `Bearer ${authToken}` } }
      );
      
      console.log('Response received:', response.data);
      
      setIsActive(!isActive);
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  }, [isActive, item.id]);

  const handleTodaySpecialClick = useCallback(() => {
    const newSpecialStatus = isSpecial ? 0 : 1;
    updateSpecialMutation.mutate({
      menu_id: item.id,
      is_special: newSpecialStatus
    }, {
      onSuccess: () => {
        setIsSpecial(newSpecialStatus === 1);
      }
    });
  }, [isSpecial, item.id, updateSpecialMutation]);

  const fullImageUrl = item.image ? `${BASE_URL}${item.image}` : "/placeholder.svg";

  const cardClassName = `w-full max-w-sm rounded-lg shadow-lg cardmenu ${
    isSpecial ? 'bg-yellow-100 border-2 border-yellow-400' : ''
  }`;

  return (
    <Card className={cardClassName} style={{ opacity: isActive ? 1 : 0.5 }}>
      <div className="relative">
        <img
          src={fullImageUrl}
          alt={item.menu_eng}
          className="h-56 w-full rounded-t-lg object-cover"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Button size="sm" className="rounded-full buttononmenu" onClick={() => onEditClick(item)}>
            <MdEdit className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button size="sm" className="rounded-full buttononmenu" onClick={() => onDeleteClick(item)}>
            <RiDeleteBin6Fill className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
        {isSpecial && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
            Today's Special
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{item.cat_eng}</span>
          <Button
            size="sm"
            className={`rounded-full ${isSpecial ? 'bg-yellow text-white' : 'border-2 border-yellow bg-transparent text-black'}`}
            onClick={handleTodaySpecialClick}
            disabled={updateSpecialMutation.isLoading}
          >
           {isSpecial?'Remove Special': 'Make Special'}
          </Button>
        </div>
        <h3 className="mb-2 text-lg font-bold">{item.menu_eng}</h3>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#4BB543]">{currencySymbol}{item.offer_price}</span>
            <span className="ml-2 text-sm font-medium text-muted-foreground line-through text-[#ff3333]">{currencySymbol}{item.normal_price}</span>
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
      </div>
    </Card>
  );
});

const MenuCardsAdmin = ({ currencySymbol }) => {
  const queryClient = useQueryClient();

  const { data: foodItems, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['menuItems'],
    queryFn: fetchMenuItems,
  });

  const updateSpecialMutation = useMutation(updateTodaySpecial, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['menuItems'], (oldData) => {
        return oldData.map(item => 
          item.id === variables.menu_id ? { ...item, is_special: variables.is_special } : item
        );
      });

      queryClient.setQueryData(['todaySpecial'], (oldData) => {
        if (variables.is_special) {
          const updatedItem = foodItems.find(item => item.id === variables.menu_id);
          return [...(oldData || []), updatedItem];
        } else {
          return oldData ? oldData.filter(item => item.id !== variables.menu_id) : [];
        }
      });
    },
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleEditClick = useCallback((item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  }, []);

  const onDeleteSuccess = useCallback(() => {
    refetch();
    closeDeleteModal();
  }, [refetch, closeDeleteModal]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (!Array.isArray(foodItems)) {
    console.error('foodItems is not an array:', foodItems);
    return <div>Error: Data is not in the expected format</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
      {foodItems.map((item) => (
        item ? (
          <CardWithEyeIcon
            key={item.id}
            item={item}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            updateSpecialMutation={updateSpecialMutation}
            currencySymbol={currencySymbol}
          />
        ) : null
      ))}
      <Todayspecial
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        modalType="Edit Menu"
        itemToEdit={editingItem}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDeleteSuccess={onDeleteSuccess}
        itemName={itemToDelete?.menu_eng}
        itemId={itemToDelete?.id}
        itemType="menu"
      />
    </div>
  );
};

export default MenuCardsAdmin;