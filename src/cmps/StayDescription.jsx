import { LongTxt } from './LongTxt.jsx'

export function StayDescription() {
  const host = {
    _id: 'u101',
    fullname: 'Davit Pok',
    imgUrl: 'https://robohash.org/0?set=set5',
  }
  const type = 'House'
  const loc = {
    country: 'Portugal',
    countryCode: 'PT',
    city: 'Lisbon',
    address: '17 Kombo st',
    lat: -8.61308,
    lng: 41.1413,
  }
  const summary = 'Fantastic duplex apartment...'

  const reviews = [
    {
      id: 'madeId',
      txt: 'Very helpful hosts. Cooked traditional...',
      rate: 4,
      by: {
        _id: 'u102',
        fullname: 'user2',
        imgUrl: '/img/img2.jpg',
      },
    },
  ]   

  return (
    <section className='stay-description'>
      <div className='stay-info'>
        <h2>
          {type} in {loc.city}, {loc.country}
        </h2>

        <div className='reviews'>
          {!reviews.length ? (
            <div>⭐ New</div>
          ) : (
            <div>
              ⭐4.77 ·
               <a href=''> {reviews.length} {reviews.length < 2 ? 'review':'reviews'}</a>
            </div>
          )}
        </div>
        
      </div>
      <div className='host flex align-center'>
        <div>
          <img src={host.imgUrl} alt='host profile' />
        </div>
        <div> Hosted by {host.fullname}</div>
      </div>

      <div className='check-in flex'>
        <article>
          <h3> Self check-in</h3>
          <p>Check yourself in with the lockbox.</p>
        </article>
        <article>
          <h3> City view</h3>
          <p>Soak up the view during your stay</p>
        </article>
        <article>
          <h3>EZ Team is a Superhost</h3>
          <p>highly rated Hosts.</p>
        </article>
      </div>

      <div className='summary'>
        <LongTxt txt={summary} />
      </div>
    </section>
  )
}
