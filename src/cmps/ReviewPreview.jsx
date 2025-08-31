
import { LongTxt } from './LongTxt'
import { dateFromTimestamp, getRandomIntInclusive } from '../services/util.service'

export function ReviewPreview({ review }) {
  const { by, txt, rate, at } = review  

  function rating(rate) {
    const rating = [...Array(rate)].map(() => {
      return '★'
    })
    return rating
  }


  const newDate = dateFromTimestamp(at)  
  const years = getRandomIntInclusive(1, 10)

  return (
    <article className='review-preview flex'>
      <div className='profile flex'>
        <section>
          <img src={by.imgUrl} alt='user profile' />
        </section>
        <section>
          <p>{by.fullname}</p>
          <p className='time'>{years} years on Airbnb</p>
        </section>
      </div>
<div>
      <p className='rate'>
        <span>{rating(rate)}</span> · <span>{newDate.monthName}</span>{' '}
        <span>{newDate.year}</span>
      </p>
      <div className='review-txt'>
        <LongTxt txt={txt} length={100} />
      </div>
      </div>
    </article>
  )
}
