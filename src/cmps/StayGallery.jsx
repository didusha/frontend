export function StayGallery() {
  const images = [
    'https://robohash.org/robot1?set=set1',
    'https://robohash.org/robot2?set=set1',
    'https://robohash.org/robot3?set=set1',
    'https://robohash.org/robot4?set=set1',
    'https://robohash.org/robot5?set=set1',
    'https://robohash.org/robot6?set=set1',
    'https://robohash.org/robot7?set=set1',
    'https://robohash.org/robot8?set=set1',
    'https://robohash.org/robot9?set=set1',
    'https://robohash.org/robot10?set=set1',
  ]

  return (
    <section className='stay-gallery'>
      <div>
        <h1> Image Title</h1>
        <button>share</button>
        <button>save</button>
      </div>
      <div className='gallery'>
        {images.map((Image) => {
          <article>
            <img src={Image} alt='photo in gallery' />
          </article>
        })}
      </div>
    </section>
  )
}
