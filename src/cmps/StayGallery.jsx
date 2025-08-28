import { icons } from '../services/amenities.service'

export function StayGallery({images, name}) {

  return (
    <section className='stay-gallery' id='photos'>
      <div className='photo-header'>
        <h1>{name}</h1>
        <div className='btn-container flex'>        
        <button className='btn bold flex'> <img src={icons.share} alt='share button'/>Share</button>
        <button className='btn bold flex'> <img src={icons.favorite} alt='share button'/>Save</button>
        </div>
      </div>
      <div className='gallery'>
        {images.map((Image, idx) => {
          if (idx < 5)
            return (     
            <img key={Image} src={Image} alt='photo in gallery'/>
        )
        })}
      <button className='gallery-btn flex align-center' > <img src={icons.apps} alt="" />show all photos</button>
      </div>
    </section>
  )
}
