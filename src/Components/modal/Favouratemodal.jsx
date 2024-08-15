import { Modal, Spinner } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { IoIosClose } from 'react-icons/io';
import useLanguageText from '../Uselanguagetext';
import { API_BASE_URL } from "../../config/config";
import LoginSuccess from '../../Pages/Authentication/FramerMotions.jsx/LoginSuccess';

function FavoriteModal({ isOpen, onClose, onSubmit }) {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [tagsUpdated, setTagsUpdated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('usertoken');
    setUserToken(token);
  }, []);

  useEffect(() => {
    console.log("FavoriteModal isOpen:", isOpen);
  }, [isOpen]);

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

    if (!userToken) {
      throw new Error('User token not found');
    }

    const response = await fetch(`${API_BASE_URL}/api/user/restaurent-tags`, {
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
    return responseData;
  };

  const mutation = useMutation(updateUserTags, {
    onSuccess: (data) => {
      setTagsUpdated(true);
      setTimeout(() => {
        setTagsUpdated(false);
        onClose(); // Close the modal
      }, 2000);
    },
    onError: (error) => {
      console.error('Error updating tags:', error);
      if (error.response && error.response.status !== 400) {
        navigate('/error404');
      }
    },
  });

  const handleTagClick = (tagId) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter(id => id !== tagId)
        : [...prevSelectedTags, tagId];
      
      return newSelectedTags;
    });
  };

  const handleContinue = () => {
    mutation.mutate(selectedTags);
  };

  const handleClose = () => {
    onClose();
  };

  if (error) {
    console.error('Error fetching tags:', error);
    return <div>Error fetching tags</div>;
  }

  const tags = tagsData?.data?.tags || [];

  return (
    <>
      {isOpen && (
        <Modal show={true} onClose={onClose} className='modalfav'>
          <Modal.Body>
            <section className="w-full py-12 md:py-24 lg:py-32 relative">
              {tagsUpdated && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80">
                  <LoginSuccess successMessage="Tags Updated Successfully!" />
                </div>
              )}
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
                      disabled={mutation.isLoading}
                    >
                      {mutation.isLoading ? (
                        <>
                          <Spinner size="sm" light={true} />
                          <span className="ml-2">Updating...</span>
                        </>
                      ) : (
                        <p className='font-semibold text-sm'>Continue Dashboard</p>
                      )}
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
      )}
    </>
  );
}

export default FavoriteModal;