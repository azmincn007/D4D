import React, { useState, useEffect } from 'react'
import { Modal, Button, Badge } from 'flowbite-react'
import useLanguageText from '../Uselanguagetext'
import { modalthemeNational } from '../../Themes/Modaltheme'
import { API_BASE_URL } from '../../config/config'

export default function SingleDishModalDetails({ menu, onClose,currencySymbol }) {
  const [openModal, setOpenModal] = useState(true)

  useEffect(() => {
    setOpenModal(true)
  }, [menu])

  const handleClose = () => {
    setOpenModal(false)
    onClose()
  }

  const getBadgeColor = (type) => {
    return type.toLowerCase() === 'non-veg' ? 'red' : 'green'
  }

  const createLanguageObject = (field) => ({
    country_eng: menu[`${field}_eng`],
    country_ar: menu[`${field}_ar`],
    country_mal: menu[`${field}_mal`],
    country_hin: menu[`${field}_hin`]
  })

  return (
    <div>
      <Modal show={openModal} onClose={handleClose} theme={modalthemeNational}>
        <Modal.Header>
          <h3 className="text-xl font-semibold">
            {useLanguageText(createLanguageObject('menu'))}
          </h3>
          <p className="text-gray-500">
            {useLanguageText(createLanguageObject('shopname'))}
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={`${API_BASE_URL}${menu.image}`} 
                alt={useLanguageText(createLanguageObject('menu'))} 
                className="rounded-lg w-full h-56 object-cover" 
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-500">
                {useLanguageText(createLanguageObject('cat'))}
              </p>
              <div className="flex items-center gap-2">
                <p className="font-medium line-through text-red-500">{currencySymbol}{menu.normal_price}</p>
                <p className="font-medium text-green-500">{currencySymbol}{menu.offer_price}</p>
                <Badge color={getBadgeColor(menu.type)}>
                  {menu.type}
                </Badge>
              </div>
              <p>{useLanguageText(createLanguageObject('desc'))}</p>
              <Button className="auth-button  bg-yellow"  onClick={handleClose}>
                Add to Favourite
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}