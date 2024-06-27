import React, { useState } from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneNumberInput = () => {
  const [phone, setPhone] = useState('')
  const [valid, setValid] = useState(false)

  const handleChange = (value, country, e, formattedValue) => {
    setPhone(value)
    setValid(isValidPhoneNumber(formattedValue))
  }

  return (
    <div>
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={handleChange}
        inputProps={{
          required: true,
        }}
        isValid={(value, country) => {
          if (value.length > 0) {
            return isValidPhoneNumber(value)
          }
          return true
        }}
      />
      <p>{valid ? 'Phone number is valid' : 'Phone number is invalid'}</p>
    </div>
  )
}

export default PhoneNumberInput