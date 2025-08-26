import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { getDayDiff } from '../services/util.service.js'
import { useNavigate } from "react-router-dom"


export function StayReservation({ stay }) {

  const [arrow, setArrow] = useState(false)
  const navigate = useNavigate()


  function onResrve() {
    const params = new URLSearchParams({
      checkIn: stay.startDate,
      checkOut: stay.endDate,
      guests: stay.capacity,
    })

    navigate(`/stay/${stay._id}/order?${params.toString()}`)
  }

  if (!stay) return <div>Loading..</div>
  const nights = getDayDiff(stay.startDate, stay.endDate)
  const totalPrice = nights * stay.price + 5
  return (
    <section className='stay-reservation'>
      <div className="reservation-header">
        <span className="price">$ {stay.price} </span>
        <span className="per-night"> night</span>
      </div>

      <div className="reservation-form">
        <div className="check-in-date">
          <label>CHECK-IN</label>
          <p>{(stay.startDate) ? stay.startDate : 'Add date'}</p>
        </div>
        <div className="check-out-date">
          <label>CHECKOUT</label>
          <p>{(stay.endDate) ? stay.endDate : 'Add date'}</p>
        </div>
        <div className="check-out-date">
          <label>GUESTS</label>
          <p>{stay.capacity} {stay.capacity > 1 ? 'guests' : 'guest'}</p>
        </div>
        <span className="chevron-arrow" onClick={() => setArrow(!arrow)}>
          {(arrow) ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
        </span>
      </div>

      <button className="reserve-btn" onClick={onResrve}>Reserve</button>
      <p className="note">You won’t be charged yet</p>

      <div className="reservation-prices">
        <p className="flex space-between">
          <span className="nights-info">{nights} nights x $ {stay.price}</span>
          <span>$ {nights * stay.price}</span>
        </p>
        <p className="flex space-between">
          <span className="cleaning-fee">Cleaning fee</span>
          <span>$ 5</span>
        </p>
        <hr />
        <p className="flex space-between">
          <span>Total</span>
          <span>$ {totalPrice}</span>
        </p>

      </div>

    </section>
  )
}

