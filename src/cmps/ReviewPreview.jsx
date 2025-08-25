import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LongTxt } from './LongTxt'

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

  return (
    <article className='review-preview'>
      <div className='profile flex'>
        <img src={by.imgUrl} alt='user profile' />
        <p>{by.fullname}</p>
      </div>

      <p className='rate'>
        <span>{rating(rate)}</span> · <span>{newDate.monthName}</span> <span>{newDate.year}</span>
      </p>
      <div className='review-txt'>
        <LongTxt txt={txt} length={150} />
      </div>
    </article>
  )
}
