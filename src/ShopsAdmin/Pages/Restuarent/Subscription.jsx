import React from 'react'
import SubsCard from '../../Components/SubsCard'
import Basicimage from '../../Assets/basicframe.png'
import Standaradframe from '../../Assets/standardframe.png'
import Professionalframe from '../../Assets/professionalframe.png'

function Subscription() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className='text-[32px] font-bold py-2'>Subscription Mode</div>
      <div className='subscriptionplans bg-white py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 rounded-md'>
        <SubsCard
          title="Basic"
          price="$22/1month"
          color="basic"
          image={Basicimage}
          offers={4}
          pushnotification={2}
          webnotification={1}
          logopostion="15+"
        />
        <SubsCard
          title="Standard"
          price="$56/3month"
          color="Standard"
          image={Standaradframe}
          offers={8}
          pushnotification={5}
          webnotification={5}
          logopostion="7+"
        />
        <SubsCard
          title="Professional"
          price="$56/3month"
          color="Professional"
          image={Professionalframe}
          offers={8}
          pushnotification={5}
          webnotification={5}
          logopostion="7+"
          splashAds={1}
        />
      </div>
    </div>
  )
}

export default Subscription