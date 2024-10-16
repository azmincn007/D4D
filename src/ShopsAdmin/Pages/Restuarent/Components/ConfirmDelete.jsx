import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config/config';

function ConfirmDeleteModal({ isOpen, onClose, onDeleteSuccess, itemName, itemId, itemType }) {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      let endpoint;

      if (itemType === 'category') {
        formData.append('cat_id', itemId);
        endpoint = `${API_BASE_URL}/api/restaurent/category-delete`;
      } else if (itemType === 'menu') {
        formData.append('menu_id', itemId);
        endpoint = `${API_BASE_URL}/api/restaurent/menu-delete`;
      } else if (itemType === 'shopcard') {
        formData.append('product_id', itemId);
        endpoint = `${API_BASE_URL}/api/restaurent/product-delete`;
      } else if (itemType === 'flyer') {
        formData.append('flyer_id', itemId);
        endpoint = `${API_BASE_URL}/api/restaurent/flyer-delete`;
      }

      const response = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      onDeleteSuccess();
      onClose();
    } catch (error) {
      console.error(`Error deleting ${itemType}:`, error);
      if (error.response && error.response.status === 403 && itemType === 'category') {
        setErrorMessage('Can\'t delete when products are in that category.');
      } else {
        setErrorMessage(error.response?.data?.message || 'An error occurred while deleting the item.');
      }
      setIsErrorModalOpen(true);
      onClose(); // Close the confirm delete modal
    }
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the {itemType} "{itemName}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isErrorModalOpen} onClose={closeErrorModal}>
        <Modal.Header>Error</Modal.Header>
        <Modal.Body>
          <p>{errorMessage}</p>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default ConfirmDeleteModal;