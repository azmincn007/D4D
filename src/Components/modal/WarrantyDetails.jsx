import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Modal, Card, Label, TextInput, Textarea, FileInput, Button, Badge } from 'flowbite-react';
import { HiEye, HiTrash } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';
import { IoIosClose } from 'react-icons/io';
import { API_BASE_URL } from '../../config/config';
import Loading from '../../api/Loading';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Errorpage404 from '../../api/Errorpage404';

const fetchWarrantyCards = async () => {
  const userToken = localStorage.getItem('usertoken');
  const response = await axios.get(`${API_BASE_URL}/api/user/warranty-cards`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data.data;
};

const WarrantyCardsModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const { data, isLoading, isError  } = useQuery('warrantyCards', fetchWarrantyCards);

  const uploadMutation = useMutation((formData) => {
    const userToken = localStorage.getItem('usertoken');
    return axios.post(`${API_BASE_URL}/api/user/add-warranty-card`, formData, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('warrantyCards');
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
      reset();
    },
  });

  const deleteMutation = useMutation((warranty_card_id) => {
    const userToken = localStorage.getItem('usertoken');
    return axios.post(`${API_BASE_URL}/api/user/remove-warranty-card`, 
      { warranty_card_id },
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      }
    );
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('warrantyCards');
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 3000);
    },
  });

  const onSubmit = async (data) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('details', data.details);
    formData.append('warranty_card', data.warranty_card[0]);
    
    await uploadMutation.mutateAsync(formData);
    setIsUploading(false);
  };

  const handleDelete = async (id) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirmation) {
      await deleteMutation.mutateAsync(deleteConfirmation);
      setDeleteConfirmation(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const handleProfileModalClose = () => {
    onClose();
  };

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

 

  if (isError || uploadMutation.isError || deleteMutation.isError) {
    return navigate('/404error');
  }

  if (isLoading || uploadMutation.isLoading || deleteMutation.isLoading) {
    return (
      <Modal show={isOpen} onClose={onClose} size="xl">
        <Modal.Body className="h-64">
          <Loading />
        </Modal.Body>
      </Modal>
    );
  }
  



  return (
    <Modal show={isOpen} onClose={onClose} size="xl">
      <Modal.Body>
        <h5 className="text-2xl font-bold tracking-tight text-[#696969] dark:text-white">
          Warranty Cards
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Upload and manage your warranty cards.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput 
              id="title" 
              className='inputuser' 
              placeholder="Enter a title" 
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="details" value="Description" />
            </div>
            <Textarea
              id="details"
              placeholder="Your Feedback"
              rows={4}
              className='bg-[#F1F1F1] focus:border-yellow hover:border-yellow'
              {...register("details", { required: "Description is required" })}
            />
            {errors.details && <p className="text-red-500">{errors.details.message}</p>}
          </div>
          <div id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="warranty_card" value="Warranty Card" />
            </div>
            <FileInput 
              id="warranty_card" 
              {...register("warranty_card", { required: "Warranty card image is required" })}
            />
            {errors.warranty_card && <p className="text-red-500">{errors.warranty_card.message}</p>}
          </div>
          <Button type="submit" className='auth-button bg-yellow' disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>
        <AnimatePresence>
          {uploadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-green-500 text-white p-2 rounded-md mb-4"
            >
              Warranty card uploaded successfully!
            </motion.div>
          )}
          {deleteSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-red-500 text-white p-2 rounded-md mb-4"
            >
              Warranty card deleted successfully!
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Uploaded Cards</h3>
          </div>
          <div className="space-y-4">
            <AnimatePresence>
              {data && data.warranty_cards && data.warranty_cards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{card.title}</h4>
                      <Button size="xs" color="gray" onClick={() => handleViewImage(`${API_BASE_URL}${card.warranty_card}`)}>
                        <HiEye className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {card.details}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Uploaded: {new Date(card.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button color="failure" size="xs" onClick={() => handleDelete(card.id)}>
                    <HiTrash className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="absolute top-0 right-3 mt-3 mr-3">
          <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
            <IoIosClose className="text-base cursor-pointer" onClick={handleProfileModalClose} />
          </div>
        </div>
      </Modal.Body>
      
      {/* Image Viewer Modal */}
      <Modal show={selectedImage !== null} onClose={handleCloseImage} size="md">
        <Modal.Header>
          <h3 className="text-xl font-semibold">Warranty Card Image</h3>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Warranty Card" className="w-full h-auto" />
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteConfirmation !== null} onClose={cancelDelete} size="sm">
        <Modal.Header>
          <h3 className="text-xl font-semibold">Confirm Deletion</h3>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this warranty card?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={confirmDelete}>Delete</Button>
          <Button color="gray" onClick={cancelDelete}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
};

export default WarrantyCardsModal;