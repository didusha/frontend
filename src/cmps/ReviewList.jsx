import { icons } from '../services/amenities.service.js'
import { getAverageRating } from '../services/util.service.js'
import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews }) {
  const facilities = [
    'Cleanliness',
    'Accuracy',
    'Check-in',
    'Communication',
    'Location',
    'Value',
  ] 

  if (!reviews) return <div>No reviews (yet)</div>
  const avg = getAverageRating(reviews)

  return (
    <section className='review-list'>
      <div className='list-title bold'>
        <span> ★ {avg} · </span> {reviews.length}{' '}
        {reviews.length > 1 ? 'reviews' : 'review'}
      </div>

      <div className='review-rate'>
        {facilities.map((facility) => (
          <section key={facility} className={facility}>
            <div>
              <p>{facility}</p>
              <p> 4.5</p>
            </div>
            <img src={icons[facility]} alt='clean svg' />
          </section>
        ))}
      </div>

      <ul className='list'>
        {reviews.map((review, idx) => {
          if (idx < 6)
            return (
              <li key={idx}>
                <ReviewPreview review={review} />
              </li>
            )
        })}

        {reviews.length > 6 && (
          <button className='review-btn'>
            Show all {reviews.length} reviews
          </button>
        )}
      </ul>
    </section>
  )
}
