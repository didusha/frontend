import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews }) {


  if (!reviews) return <div>No reviews (yet)</div>

  return (
    <section className='review-list'>
        <div className='list-title bold'>
         <span> ★ 4.77 </span>  {reviews.length} {reviews.length > 1 ? 'reviews' : 'review'}
        </div>

      <ul className='list'>
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewPreview review={review} />
          </li>
        ))}
      </ul>
    </section>
  )
}
