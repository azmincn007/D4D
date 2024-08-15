import React, { useState, useEffect } from 'react'
import { Modal, Button, Badge } from 'flowbite-react'
import useLanguageText from '../Uselanguagetext'
import { modalthemeNational } from '../../Themes/Modaltheme'
import { API_BASE_URL } from '../../config/config'

export default function SingleDishModalDetails({ menu, onClose, currencySymbol, isFromRestoCard = false }) {
  const [openModal, setOpenModal] = useState(true)

  console.log(menu);
  
  useEffect(() => {
    setOpenModal(true)
  }, [menu])

  const handleClose = () => {
    setOpenModal(false)
    onClose()
  }

  const getBadgeColor = (type) => {
    return type?.toLowerCase() === 'non-veg' ? 'red' : 'green'
  }

  const createLanguageObject = (field) => ({
    country_eng: menu[`${field}_eng`] || menu[field],
    country_ar: menu[`${field}_ar`] || menu[field],
    country_mal: menu[`${field}_mal`] || menu[field],
    country_hin: menu[`${field}_hin`] || menu[field]
  })

  const getImageUrl = () => {
    if (isFromRestoCard) {
      return menu.image;
    } else {
      return `${API_BASE_URL}${menu.image}`;
    }
  }

  return (
    <div>
      <Modal show={openModal} onClose={handleClose} theme={modalthemeNational}>
        <Modal.Header>
          <h3 className="text-xl font-semibold">
            {isFromRestoCard ? menu.menu_eng : useLanguageText(createLanguageObject('menu'))}
          </h3>
          <p className="text-gray-500">
            {useLanguageText(createLanguageObject('shopname'))}
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={getImageUrl()}
                alt={isFromRestoCard ? menu.eng : useLanguageText(createLanguageObject('menu'))}
                className="rounded-lg w-full h-56 object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-500">
                {isFromRestoCard ? menu.category : useLanguageText(createLanguageObject('cat'))}
              </p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-green-500 text-[30px]">{currencySymbol}{menu.offer_price}</p>
                <p className="font-medium line-through text-red-500">{currencySymbol}{menu.normal_price}</p>
                <Badge color={getBadgeColor(menu.type)}>
                  {menu.type}
                </Badge>
              </div>
              <p>{useLanguageText(createLanguageObject('desc'))}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}