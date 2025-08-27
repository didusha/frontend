import { getAverageRating } from '../services/util.service.js'
import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews }) {

  
  if (!reviews) return <div>No reviews (yet)</div>

  const avg = getAverageRating(reviews)

  return (
    <section className='review-list'>
      <div className='list-title bold'>
        <span> ★ {avg} · </span> {reviews.length}{' '}
        {reviews.length > 1 ? 'reviews' : 'review'}
      </div>

      <ul className='list'>
        {reviews.map((review, idx) => {
          if (idx < 6)
            return (
              <li key={review._id}>
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
