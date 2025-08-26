import { OPEN_DATE_MODAL, OPEN_GUESTS_MODAL } from '../store/reducers/system.reducer'
import { GuestsModal } from './GuestsModal'
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { getDayDiff } from '../services/util.service.js'
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { DateModal } from './DateModal.jsx'


export function StayReservation({ stay }) {

  const [arrow, setArrow] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])
  console.log("🚀 ~ StayReservation ~ params:", params)


  function onResrve() {
    const params = new URLSearchParams({
      checkIn: stay.startDate,
      checkOut: stay.endDate,
      guests: stay.capacity,
    })

    navigate(`/stay/${stay._id}/params?${params.toString()}`)
  }

  function onGuestModal() {
    setArrow(!arrow)
    dispatch({ type: OPEN_GUESTS_MODAL })
  }

  function onDateModal() {
    dispatch({ type: OPEN_DATE_MODAL })
  }

  if (!stay) return <div>Loading..</div>
  const nights = getDayDiff(stay.startDate, stay.endDate)
  const totalPrice = nights * stay.price + 5
  const totalGuest = +params.adults + +params.children + +params.infants
  // console.log("🚀 ~ StayReservation ~ totalGuest:", totalGuest)
  return (
    <section className='stay-reservation'>
      <div className="reservation-header">
        <span className="price">$ {stay.price} </span>
        <span className="per-night"> night</span>
      </div>

      <div className="reservation-form">
        <div className="check-in-date" onClick={onDateModal}>
          <label>CHECK-IN</label>
          <p>{(params.checkIn === "null") ? "Add date" : params.checkIn}</p>
          <DateModal />
        </div>
        <div className="check-out-date" onClick={onDateModal}>
          <label>CHECKOUT</label>
          <p>{(params.checkIn === "null") ? 'Add date' : params.checkOut}</p>
        </div>
        <div className="guests-amount">
          <label>GUESTS</label>
          <p>{totalGuest} {totalGuest > 1 ? 'guests' : 'guest'}</p>
        </div>
        <span className="chevron-arrow" onClick={onGuestModal}>
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

      <GuestsModal />
    </section>
  )
}

