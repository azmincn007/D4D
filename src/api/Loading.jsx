import React from 'react'
import { GridLoader } from 'react-spinners'

function Loading() {
  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center'>
 <GridLoader size={30} />
    </div>
  )
}

export default Loading
