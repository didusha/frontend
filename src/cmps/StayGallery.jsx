import shareUrl from'../assets/images/share.svg'
import favoriteUrl from'../assets/images/favorite.svg'
import appsUrl from'../assets/images/apps.svg'

export function StayGallery() {
  const images = [
    'https://robohash.org/0?set=set5',
    'https://robohash.org/1?set=set5',
    'https://robohash.org/2?set=set5',
    'https://robohash.org/3?set=set5',
    'https://robohash.org/4?set=set5',
    'https://robohash.org/5?set=set5',
    'https://robohash.org/6?set=set5',
    'https://robohash.org/7?set=set5',
    'https://robohash.org/8?set=set5',
  ]

  return (
    <section className='stay-gallery'>
      <div className='photo-header'>
        <h1> Image Title</h1>
        <div className='btn-container flex'>        
        <button className='btn flex'> <img src={shareUrl} alt='share button'/>share</button>
        <button className='btn flex'> <img src={favoriteUrl} alt='share button'/>save</button>
        </div>
      </div>
      <div className='gallery'>
        {images.map((Image, idx) => {
          if (idx < 5)
            return (
            <img key={Image} src={Image} alt='photo in gallery'/>
            )
        })}
      <button className='gallery-btn flex align-center' > <img src={appsUrl} alt="" />show all photos</button>
      </div>
    </section>
  )
}
