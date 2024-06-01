import React from 'react'
import '../../styles/Footer.css'
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

function FooterFlyer() {
  return (
    <div className='footer'>
       <Footer className='footerfl py-5  text-xsm text-black font-inter font-[400] ' container>
      <FooterCopyright className='' href="#" by="2024 D4D Online.All rights reserved" />
      <FooterLinkGroup>
        <FooterLink  href="#">Powered By <span className=' text-[#696969]'>D4D Online</span></FooterLink>
        
      </FooterLinkGroup>
    </Footer>
    </div>
  )
}

export default FooterFlyer
