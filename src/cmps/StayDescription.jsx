import { LongTxt } from './LongTxt.jsx'
import doorUrl from '../assets/images/door.svg'
import locationUrl from '../assets/images/location.svg'
import chatUrl from '../assets/images/chat.svg'

export function StayDescription({ stay }) {
  const { host, type, loc, summary, reviews } = stay
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
              <a href=''>{reviews.length} {reviews.length < 2 ? 'review' : 'reviews'}</a>
            </div>
          )}
        </div>
      </div>

      <div className='host flex align-center'>
        <div className='profile'>
          <img src={host.imgUrl} alt='host profile' />
        </div>
        <div> Hosted by {host.fullname}</div>
      </div>

      <div className='check-in flex'>
        <article className='flex'>
          <span>
            <img src={doorUrl} alt='door icon' style={{ width: 24 }} />
          </span>

          <div>
            <h3>Great check-in experience</h3>
            <p>Check yourself in with the lockbox.</p>
          </div>
        </article>

        <article className='flex'>
          <span>
            <img src={locationUrl} alt='location icon' />
          </span>

          <div>
            <h3>Great location</h3>
            <p>90% of recent guests gave the location a 5-star rating.</p>
          </div>
        </article>

        <article className='flex'>
          <span>
            <img src={chatUrl} alt='location icon' />
          </span>

          <div>
            <h3>Great communication</h3>
            <p>
              100% of recent guests rated Patrícia Sousa Casimiro 5-star in
              communicatio{' '}
            </p>
          </div>
        </article>
      </div>

      <div className='summary'>
        <LongTxt txt={summary} />
      </div>
    </section>
  )
}
