import React from 'react'
import image from './assets/logo.png'
import './styles/Header.css'
import SocialMedia from './SocialMedia'

const Header = () => {

  return (
    <div className="header">
      <SocialMedia/>
      <img className="header-image" src={image} />
      <div className="split-info">
        <div className="split-entity">
          <div className="split-header">Growler fill</div>
          <div>Friday 2-5 pm</div>
          <div>Filling selected beers</div>
          <div>1 liter Growlette</div>
          <div>1 liter Growler</div>
        </div>
        <div className="split-entity">
          <div className="split-header">Taproom</div>
          <div>Open on request</div>
          <div>Mobile +47 916 37 365</div>
          <div>Mail <a href="mailto:martin@graffbrygghus.no">martin@graffbrygghus.no</a></div>
        </div>
      </div>
      <div className="contact-info">
        <div>Storgata 101</div>
        <div>Tromsø, Norway</div>
      </div>
    </div>
  )
}

export default Header;
