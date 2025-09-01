import { useEffect, useState } from 'react';
import { icons } from '../services/amenities.service.js'
import { useNavigate } from 'react-router';
import { ImgCarousel } from './ImgCarousel.jsx';

export function StayGallery({ images, name }) {
  const navigate =useNavigate()

  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia("(max-width: 750px)").matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 750px)")

    const handleChange = (e) => setIsSmallScreen(e.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return (
    <section className='stay-gallery' id='photos'>
      <div className='photo-header '>
        {!isSmallScreen ? <h1>{name}</h1> : <img  className="arrow" src={icons.arrow}onClick={()=>navigate('/')} /> }
        <div className='btn-container flex'>
          <button className='btn bold flex'>
            <img src={icons.share} alt='share button' />
            {!isSmallScreen && 'Share'}
          </button>
          <button className='btn bold flex'>
            <img src={icons.favorite} alt='share button' />
           {!isSmallScreen && 'Save'}
          </button>
        </div>
      </div>
      <div className='gallery'>
        {isSmallScreen && <ImgCarousel imgUrls={images}/>}

        {!isSmallScreen && images.map((Image, idx) => {
            if (idx < 5)
              return <img key={Image} src={Image} alt='photo in gallery' />
            return null
        })}
        <button className='gallery-btn flex align-center'>
          <img  src={icons.apps} alt='' className="show-btn" />
          show all photos
        </button>
      </div>
    </section>
  )
}
