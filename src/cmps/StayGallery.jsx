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
      <div>
        <h1> Image Title</h1>
        <button>share</button>
        <button>save</button>
      </div>
      <div className='gallery'>
        {images.map((Image, idx) => {
          if (idx < 5)
            return (
              <article key={Image}>
                <img src={Image} alt='photo in gallery' />
              </article>
            )
        })}
      </div>
    </section>
  )
}
