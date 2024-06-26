import { Modal, TextInput } from 'flowbite-react';
import React from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Favouratemodal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/'); // replace '/landing-page' with your actual landing page path
  };

  return (
    <div>
      <Modal show={isOpen} onClose={onClose} className='modalfav'>
        <Modal.Body>
          <div className='font-inter'>
            <div className='flex justify-center flex-col items-center my-4'>
              <h2 className='text-[22px] text-[#6D6D6D] font-semibold mb-4'>Suggestions</h2>
              <div className="search-fav flex items-center w-full max-w-md rounded-md border mb-2 border-black dark:border-gray-700">
                <TextInput
                  type="search"
                  placeholder=" 🔍  Whats in Your Mind.."
                  className="flex-1 rounded-l-md border-0 dark:bg-gray-800 dark:text-gray-200"
                />
                <button
                  type="submit"
                  className="rounded-r-md px-4 py-2 font-medium bg-yellow focus:outline-none text-[12px] text-black h-[44px]"
                >
                  Search
                </button>
              </div>
            </div>
            <div className='w-[100%] h-[1px] bg-black mb-2'></div>
            <div className='w-[80%] mx-auto flex mb-40'>
              <div className='fav'><div><p>item1</p></div><div><IoMdClose/></div></div>
              <div className='fav'><div><p>item2</p></div><div><IoMdClose/></div></div>
              <div className='fav'><div><p>item3</p></div><div><IoMdClose/></div></div>
              <div className='fav'><div><p>item4</p></div><div><IoMdClose/></div></div>
            </div>
            <div className='flex justify-center mb-12'>
              <button className='bg-[#FFD814] py-4 px-8 rounded-[6px]' onClick={handleContinue}>
                <p className='font-semibold text-sm'>Continue Dashboard</p>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Favouratemodal;
