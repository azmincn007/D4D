import React from 'react'
import { useNavigate } from 'react-router-dom';

function navigate() {

const navigate = useNavigate();

useEffect(() => {
    navigate('/');
}, [])
  return (
    <div>
      navigate('/404error')
    </div>
  )
}

export default navigate
