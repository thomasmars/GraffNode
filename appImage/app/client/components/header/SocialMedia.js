import React from 'react'
import './styles/SocialMedia.css'

const SocialMedia = () => {
  const goToLink = (link) => {
    window.location.href = link;
  }

  return (
    <div className="social-media">
      <div
        onClick={goToLink.bind(this, 'https://www.instagram.com/graffbrygghus/')}
        className="instagram-link"
      ></div>
      <div
        onClick={goToLink.bind(this, 'https://www.facebook.com/graffgrowler')}
        className="facebook-link"
      ></div>
    </div>
  )
}

export default SocialMedia
