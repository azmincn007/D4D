


import React, { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Card, Button } from 'flowbite-react';
import { MdEdit } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiDeleteBin6Fill } from "react-icons/ri";
import Todayspecial from '../../../Modal/Addmenu';
import ConfirmDeleteModal from './ConfirmDelete';
import Loading from '../../../../api/Loading';
import ErrorMessage from '../../../../Pages/Authentication/ErrorValidation';
import LazyImage from '../../../../api/Lazyimage';
import { API_BASE_URL } from '../../../../config/config';

const fetchMenuItems = async () => {
  const authToken = localStorage.getItem('authToken');
  const { data } = await axios.get(`${API_BASE_URL}/api/restaurent/all-menu`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  return data.data.menu;
};

const updateTodaySpecial = async ({ menu_id, is_special }) => {
  const authToken = localStorage.getItem('authToken');
  const { data } = await axios.post(
    `${API_BASE_URL}/api/restaurent/todays-special-status`,
    { menu_id, is_special },
    {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  return data;
};

const CardWithEyeIcon = React.memo(({ item, onEditClick, onDeleteClick, updateSpecialMutation, currencySymbol, onStatusToggle }) => {
  const [isSpecial, setIsSpecial] = useState(item.is_special === 1);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusToggle = useCallback(() => {
    const newStatus = item.status === 'Active' ? 'Blocked' : 'Active';
    onStatusToggle(item.id, newStatus);
  }, [item.id, item.status, onStatusToggle]);

  const handleTodaySpecialClick = useCallback(() => {
    const newSpecialStatus = isSpecial ? 0 : 1;
    setIsLoading(true);
    updateSpecialMutation.mutate(
      {
        menu_id: item.id,
        is_special: newSpecialStatus
      },
      {
        onSuccess: () => {
          setIsSpecial(!isSpecial);
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        }
      }
    );
  }, [isSpecial, item.id, updateSpecialMutation]);

  const cardClassName = useMemo(() => `w-full max-w-sm rounded-lg shadow-lg cardmenu ${
    isSpecial ? 'border-[2px] border-green-500' : ''
  }`, [isSpecial]);

  return (
    <Card className={cardClassName} style={{ opacity: item.status === 'Active' ? 1 : 0.5 }}>

<div className="relative">
<LazyImage
  src={item.image}
  alt={item.menu_eng}
  className="h-56 w-full rounded-t-lg object-cover"
/>
<div className="absolute top-4 right-4 flex items-center gap-2 ">
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
  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
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
    disabled={isLoading}
  >
    {isLoading ? 'Loading...' : (isSpecial ? 'Remove Special' : 'Make Special')}
  </Button>
</div>
<h3 className="mb-2 text-lg font-bold">{item.menu_eng}</h3>
<div className="mb-4 flex items-center justify-between">
  <div>
    <span className="text-2xl font-bold text-[#4BB543]">{currencySymbol}{item.offer_price}</span>
    <span className="ml-2 text-sm font-medium text-muted-foreground line-through text-[#ff3333]">{currencySymbol}{item.normal_price}</span>
  </div>
  <div className="flex items-center gap-2">
    <Button color="gray" size="sm" className="rounded-full buttonss" onClick={handleStatusToggle}>
      {item.status === 'Active' ? (
        <FaEye className="h-5 w-5 text-muted-foreground" />
      ) : (
        <FaEyeSlash className="h-5 w-5 text-muted-foreground" />
      )}
    </Button>
  </div>
</div>
</div>    </Card>
  );
});

const MenuCardsAdmin = ({ currencySymbol, selectedCategory }) => {
  const queryClient = useQueryClient();

  const { data: foodItems, isLoading, isError, error } = useQuery({
    queryKey: ['menuItems'],
    queryFn: fetchMenuItems,
  });

  const updateSpecialMutation = useMutation(updateTodaySpecial, {
    onSuccess: () => {
      queryClient.invalidateQueries(['menuItems']);
      queryClient.invalidateQueries(['todaySpecial']);
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

  const invalidateQueries = useCallback(() => {
    queryClient.invalidateQueries('menuItems');
    queryClient.invalidateQueries('todaySpecial');
  }, [queryClient]);

  const onDeleteSuccess = useCallback(() => {
    invalidateQueries();
    closeDeleteModal();
  }, [invalidateQueries, closeDeleteModal]);

  const handleStatusToggle = useCallback(async (menuId, newStatus) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.post(
        `${API_BASE_URL}/api/restaurent/menu-status`,
        { menu_id: menuId, status: newStatus },
        { headers: { 'Authorization': `Bearer ${authToken}` } }
      );
      invalidateQueries();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  }, [invalidateQueries]);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setEditingItem(null);
    invalidateQueries();
  }, [invalidateQueries]);

  const memoizedFoodItems = useMemo(() => foodItems || [], [foodItems]);
  const filteredFoodItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return memoizedFoodItems;
    }
    return memoizedFoodItems.filter(item => item.cat_eng === selectedCategory);
  }, [memoizedFoodItems, selectedCategory]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;

  if (!Array.isArray(memoizedFoodItems)) {
    console.error('foodItems is not an array:', memoizedFoodItems);
    return <ErrorMessage message="Data is not in the expected format" />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {filteredFoodItems.map((item) => (
        item ? (
          <CardWithEyeIcon
            key={item.id}
            item={item}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            updateSpecialMutation={updateSpecialMutation}
            currencySymbol={currencySymbol}
            onStatusToggle={handleStatusToggle}
          />
        ) : null
      ))}
      <Todayspecial
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
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