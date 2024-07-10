import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IoIosClose } from 'react-icons/io';
import useLanguageText from '../Uselanguagetext';

function FavoriteModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState(null);

  const fetchTags = async () => {
    const response = await fetch('https://hezqa.com/api/tags');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('API Response:', data);
    return data.data.tags;
  };

  const { data: tags, isLoading, error } = useQuery('tags', fetchTags);

  const handleContinue = () => {
    navigate('/');
  };

  const handleTagClick = (tagName) => {
    setActiveTag(tagName);
  };

  const handleClose = () => {
    onClose();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching tags:', error);
    return <div>Error fetching tags</div>;
  }

  return (
    <div>
      <Modal show={isOpen} onClose={onClose} className='modalfav'>
        <Modal.Body>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center">Suggestions</h2>
                
                <div className='w-[full] h-[1px] bg-black mb-2 '></div>
                <div className=" w-[95%] mx-auto grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
                  {tags && tags.map((tag) => {
                    const tagName = useLanguageText({
                      country_eng: tag.tag_eng,
                      country_ar: tag.tag_ar,
                      country_mal: tag.tag_mal,
                      country_hin: tag.tag_hin
                    });
                    return (
                      <button
                        key={tag.id}
                        onClick={() => handleTagClick(tag.name)}
                        className={`rounded-md px-4 py-2 transition-colors ${
                          activeTag === tag.name
                            ? "bg-yellow text-black hover:bg-yellow"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                        }`}
                      >
                        {tagName}
                      </button>
                    );
                  })}
                </div>
                <div className='flex justify-center mt-8'>
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