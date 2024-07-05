import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Card, Button } from 'flowbite-react';
import { MdEdit } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiDeleteBin6Fill } from "react-icons/ri";
import ConfirmDeleteModal from './ConfirmDelete';

const BASE_URL = 'https://hezqa.com';

const fetchFlyers = async () => {
  const authToken = localStorage.getItem('authToken');
  const { data } = await axios.get(`${BASE_URL}/api/restaurent/all-flyers`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  return data.data.flyers;
};

function Flyercard({ onEditFlyer }) {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFlyer, setSelectedFlyer] = useState(null);

  const { data: flyers, isLoading, isError, error } = useQuery({
    queryKey: ['flyers'],
    queryFn: fetchFlyers,
  });

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
        {flyers.map((flyer, index) => (
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

  const fullImageUrl = flyer.image ? `${BASE_URL}${flyer.image}` : "/placeholder.svg";

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-lg cardmenu" style={{ opacity: isActive ? 1 : 0.5 }}>
      <div className="relative">
        <img
          src={fullImageUrl}
          alt={flyer.title}
          className="h-56 w-full rounded-t-lg object-cover"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2">
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
          <span className="text-sm font-medium text-muted-foreground">{flyer.cat_eng}</span>
          <span className="text-sm font-medium text-muted-foreground border-2 border-yellow rounded-xl p-[.3rem] px-2">{flyer.subcat_eng}</span>
        </div>
        <h3 className="mb-2 text-lg font-bold">{flyer.title}</h3>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-sm font-medium">Expires <br /> {flyer.valid_to}</span>
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
};

export default Flyercard;