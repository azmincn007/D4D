import React from 'react'
import SubsCard from '../../Components/SubsCard'
import Basicimage from '../../Assets/basicframe.png'
import Standaradframe from '../../Assets/standardframe.png'
import Professionalframe from '../../Assets/professionalframe.png'

function Subscription() {
  return (
    <div>
     <div>Subscription Mode</div>

     <div className='subscriptionplans bg-white py-12 px-12 flex justify-between rounded-md'>
        <div className='mr-4'>
        <SubsCard
        title="Basic"
        price="$22 
        /1month"
        color="basic"
        image={Basicimage}
      />
        </div>

<div className='mr-4'>
<SubsCard
        title="Standard"
        price="$56/3month"
        color="Standard"
        image={Standaradframe}

      /> 
</div>


<SubsCard
        title="Professional"
        price="$56/3month"
        color="Professional"
        image={Professionalframe}

      />
         </div>
    </div>
  )
}

export default Subscription
