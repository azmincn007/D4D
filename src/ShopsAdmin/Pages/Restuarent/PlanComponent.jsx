import React, { useState } from 'react';
import { IoStar } from 'react-icons/io5';
import { Button, Modal } from 'flowbite-react';

function PlanComponent({ subscriptionData, userType }) {
  const [openModal, setOpenModal] = useState(false);
  const currentplan = subscriptionData?.data?.plan || null;

  // Default values in case currentplan is null
  const {
    name = 'No Active Plan',
    amount = 0,
    payment_date = 'N/A',
    duration_month = 0,
    product_num = 0,
    offers = 0
  } = currentplan || {};

  return (
    <>
      <div
        className="packagecard flex absolute top-12 right-16 cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <IoStar className="w-6 h-6 text-[#FFD814] mr-2" />
        <p className="text-[16px] font-semibold text-white">{name} Account</p>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <div className="flex items-center justify-between w-full">
            <div className="rounded-full px-3 py-1 text-sm font-medium bg-green-500 text-green-50">
              {name}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div>Plan Amount</div>
              <div className="font-medium">${amount}/mo</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Last Payment</div>
              <div className="font-medium">{payment_date}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Plan Duration</div>
              <div className="font-medium">{duration_month} months</div>
            </div>
            {userType !== "2" && (
              <>
                <div className="flex items-center justify-between">
                  <div>Max Products</div>
                  <div className="font-medium">{product_num}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Max Flyers</div>
                  <div className="font-medium">{offers}</div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PlanComponent;