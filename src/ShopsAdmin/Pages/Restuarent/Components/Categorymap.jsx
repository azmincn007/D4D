import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { FaPencilAlt, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import Loading from '../../../../api/Loading';
import ConfirmDeleteModal from './ConfirmDelete';

function Categorymap({ onEditCategory }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const queryClient = useQueryClient();

  const fetchCategories = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get('https://hezqa.com/api/restaurent/all-categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data.categories;
  };

  const { data, isLoading, isError, error, refetch } = useQuery('categoriesRestuarent', fetchCategories, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div><Loading/></div>;
  }

  if (isError) {
    return <div>Error fetching categories: {error.message}</div>;
  }

  const toggleVisibility = async (id, currentStatus) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';

    try {
      await axios.post('https://hezqa.com/api/restaurent/category-status', 
        { 
          cat_id: id,
          status: newStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      refetch();
    } catch (error) {
      console.error('Error updating category status:', error);
    }
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const onDeleteSuccess = () => {
    refetch();
    closeDeleteModal();
  };

  return (
    <>
      <div className='flex flex-wrap py-2'>
        {data.map((obj) => {
          const isVisible = obj.status === 'Active';
          return (
            <div
              key={obj.id}
              className={`bg-white border-2 border-yellow-400 rounded-[20px] mb-4 mx-4 p-2 flex items-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-50'}`}
              style={{ borderColor: '#FFD700' }}
            >
              <span className='mr-3 text-black'>{obj.cat_eng}</span>
              <div className='flex'>
                <FaPencilAlt
                  className='text-blue-500 cursor-pointer mr-2'
                  onClick={() => onEditCategory(obj)}
                />
                <FaTrash
                   className='text-red-500 cursor-pointer mr-2'
                   onClick={() => openDeleteModal(obj)}
                />
                {isVisible ? (
                  <FaEye
                    className='text-green-500 cursor-pointer'
                    onClick={() => toggleVisibility(obj.id, obj.status)}
                  />
                ) : (
                  <FaEyeSlash
                    className='text-gray-500 cursor-pointer'
                    onClick={() => toggleVisibility(obj.id, obj.status)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDeleteSuccess={onDeleteSuccess}
        itemName={categoryToDelete?.cat_eng}
        itemId={categoryToDelete?.id}
        itemType="category"
      />
    </>
  );
}

export default Categorymap;