import React, { useState } from 'react';
import { Modal, TextInput, Textarea } from 'flowbite-react';
import { modalthemeNational } from '../../Themes/Modaltheme';
import { IoCloseSharp } from 'react-icons/io5';
import { API_BASE_URL } from '../../config/config';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const FeedbackModal = ({ isOpen, onClose }) => {
  const navigate=useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const [mobileError, setMobileError] = useState('');

  const { mutate, isLoading, isError, isSuccess, reset } = useMutation({
    mutationFn: async () => {
      if (!validateMobileNumber(mobileNumber)) {
        throw new Error('Invalid mobile number');
      }
      const response = await axios.post(`${API_BASE_URL}/api/send-feedback`, {
        name,
        email,
        mobile: mobileNumber,
        msg: feedback
      });
      return response;
    },
    onSuccess: () => {
      setName('');
      setEmail('');
      setMobileNumber('');
      setFeedback('');
      setMobileError('');
      setTimeout(() => {
        reset();
        onClose();
      }, 3000);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutate();
    } catch (error) {
      // Handle any specific error here if needed
    }
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, ''); // Allow only digits and '+'
    setMobileNumber(value);
    setMobileError('');
  };

  const validateMobileNumber = (number) => {
    const regex = /^\+\d{1,3}\d{10}$/; // Matches +[country code][10 digit number]
    return regex.test(number);
  };

  if (isError) {
    return navigate('/error404');
  }

  return (
    <Modal show={isOpen} onClose={onClose} theme={modalthemeNational}>
      <Modal.Body>
        <div className="space-y-6 relative">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Submit your feedback</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <TextInput
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='inputuser'
              />
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='inputuser'
              />
              <div>
                <TextInput
                  id="mobileNumber"
                  type="tel"
                  placeholder="Mobile Number (e.g., +919633531411)"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  required
                  className='inputuser'
                />
                {mobileError && <p className="text-red-500 text-sm mt-1">{mobileError}</p>}
              </div>
              <Textarea
                id="feedback"
                placeholder="Your feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={4}
                className='bg-[#F1F1F1] focus:border-yellow hover:border-yellow'
              />
            </div>
            <div className='w-[100%] flex justify-center mt-4'>
              <button
                type="submit"
                className="bg-yellow text-black font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
          <div className='absolute top-2 right-3 bg-white rounded-full p-1 cursor-pointer' onClick={onClose}>
            <IoCloseSharp size={24} />
          </div>
        </div>
      </Modal.Body>
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-green-500 text-white p-2 rounded-md mb-4 absolute bottom-0 left-0 right-0"
          >
            Feedback submitted successfully!
          </motion.div>
        )}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-red-500 text-white p-2 rounded-md mb-4 absolute bottom-0 left-0 right-0"
          >
            Error submitting feedback. Please try again.
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default FeedbackModal;
