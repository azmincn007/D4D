import React, { useState } from 'react'
import '../../styles/nav.css'
import { Tabs } from 'flowbite-react'
import { toggle } from '../../Themes/FlowbiteTab'

function Toggle() {

   
  return (
    <div className='toggle'>
<Tabs theme={toggle} aria-label="Pills" style="pills" className='toggle-class'>
    <Tabs.Item active title="Product">
    </Tabs.Item>
    <Tabs.Item title="Offer">
    </Tabs.Item>
   
  
  
  </Tabs>
    </div>
    
  )
}

export default Toggle
