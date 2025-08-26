import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LongTxt } from './LongTxt'
import { getRandomIntInclusive } from '../services/util.service'

export function ReviewPreview({ review }) {
  const { by, txt, rate, date } = review

  function rating(rate) {
    const rating = [...Array(rate)].map(() => {
      return '★'
    })
    return rating
  }

  function dateFromTimestamp(date) {
    const reviewDate = new Date(date)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const monthName = months[reviewDate.getMonth()]
    const year = reviewDate.getFullYear()

    return { monthName, year }
  }

  const newDate = dateFromTimestamp(date)
  const years = getRandomIntInclusive(1, 10)

  return (
    <article className='review-preview'>
      <div className='profile flex'>
        <section>
          <img src={by.imgUrl} alt='user profile' />
        </section>
        <section>
          <p>{by.fullname}</p>
          <p className='time'>{years} years on Airbnb</p>
        </section>
      </div>

      <p className='rate'>
        <span>{rating(rate)}</span> · <span>{newDate.monthName}</span>{' '}
        <span>{newDate.year}</span>
      </p>
      <div className='review-txt'>
        <LongTxt txt={txt} length={100} />
      </div>
    </article>
  )
}
