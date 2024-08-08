import { Modal } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { IoIosClose } from 'react-icons/io';
import useLanguageText from '../Uselanguagetext';
import { API_BASE_URL } from "../../config/config";


function FavoriteModal({ isOpen, onClose, onSubmit }) {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    // Retrieve the user token when the component mounts
    const token = localStorage.getItem('usertoken');
    setUserToken(token);
  }, []);

  const fetchTags = async () => {
    const response = await fetch(`${API_BASE_URL}/api/tags`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data: tagsData, isLoading, error } = useQuery('tags', fetchTags);

  const updateUserTags = async (tagIds) => {
    const payload = { tags: tagIds.join(',') };
    console.log('Sending data to API:', payload);

    if (!userToken) {
      throw new Error('User token not found');
    }

    const response = await fetch(`${API_BASE_URL}//api/user/restaurent-tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to update user tags');
    }

    const responseData = await response.json();
    console.log('API response:', responseData);
    return responseData;
  };

  const mutation = useMutation(updateUserTags, {
    onSuccess: (data) => {
      console.log('Tags updated successfully:', data);
    },
    onError: (error) => {
      console.error('Error updating tags:', error);
      // Handle error (e.g., show error message to user)
    },
  });

  const handleTagClick = (tagId) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter(id => id !== tagId)
        : [...prevSelectedTags, tagId];
      
      console.log('Selected tags:', newSelectedTags);
      mutation.mutate(newSelectedTags);
      return newSelectedTags;
    });
  };

  const handleContinue = () => {
    onSubmit(); // Call the onSubmit prop
    navigate('/'); // Navigate to the home page
  };

  const handleClose = () => {
    onClose();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching tags:', error);
    return <div>Error fetching tags</div>;
  }

  const tags = tagsData?.data?.tags || [];

  return (
    <div>
      <Modal show={isOpen} onClose={onClose} className='modalfav'>
        <Modal.Body>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center">Suggestions</h2>
                
                <div className='w-[full] h-[1px] bg-black mb-2 '></div>
                <div className="w-[95%] mx-auto grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
                  {tags.map((tag) => {
                    const tagName = useLanguageText({
                      country_eng: tag.tag_eng,
                      country_ar: tag.tag_ar,
                      country_mal: tag.tag_mal,
                      country_hin: tag.tag_hin
                    });
                    return (
                      <button
                        key={tag.id}
                        onClick={() => handleTagClick(tag.id)}
                        className={`rounded-md px-4 py-2 transition-colors ${
                          selectedTags.includes(tag.id)
                            ? "bg-yellow text-black hover:bg-yellow"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                        }`}
                      >
                        {tagName}
                      </button>
                    );
                  })}
                </div>
                <div className='flex justify-center '>
                  <button
                    className='bg-[#FFD814] py-4 px-8 rounded-[6px]'
                    onClick={handleContinue}
                  >
                    <p className='font-semibold text-sm'>Continue Dashboard</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 mt-3 mr-3">
              <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
                <IoIosClose className="text-base cursor-pointer" onClick={handleClose} />
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FavoriteModal;