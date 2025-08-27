import { OPEN_DATE_MODAL, OPEN_GUESTS_MODAL } from '../store/reducers/system.reducer'
import { GuestsModal } from './GuestsModal'
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { getDayDiff } from '../services/util.service.js'
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { DateModal } from './DateModal.jsx'
import { formatDateCalendar } from '../services/util.service.js'

export function StayReservation({ stay }) {

  const [arrow, setArrow] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])

  if (!stay) return <div>Loading..</div>
  const nights = getDayDiff(params.checkIn, params.checkOut)
  const totalPrice = nights * stay.price + 5
  const totalGuest = +params.adults + +params.children + +params.infants
  const randStartDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  const randEndDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)

  function onResrve() {
    const orderParams = new URLSearchParams({
      checkIn: params.checkIn || randStartDate,
      checkOut: params.checkOut || randEndDate,
      adults: params.adults || 1,
      children: params.children || 0,
      infants: params.infants || 0,
      pets: params.pets || 0,
      totalPrice: totalPrice || 0,
    })
    navigate(`/stay/${stay._id}/order?${orderParams.toString()}`)
  }

  function onGuestModal() {
    setArrow(!arrow)
    dispatch({ type: OPEN_GUESTS_MODAL })
  }

  function onDateModal() {
    dispatch({ type: OPEN_DATE_MODAL })
  }

  return (
    <section className='stay-reservation'>
      <div className="reservation-header">
        <span className="price underline">{(params.checkIn && params.checkOut) ? `$${totalPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : `$${stay.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}</span>
        <span className="per-night"> for {(params.checkIn && params.checkOut && nights > 1) ? `${nights} nights` : `1 night`}</span>
      </div>

      <div className="reservation-form">
        <div className="check-in-date" onClick={onDateModal}>
          <label>CHECK-IN</label>
          <p>{(params.checkIn === undefined) ? formatDateCalendar(randStartDate) : formatDateCalendar(params.checkIn)}</p>
          {/* <DateModal /> */}
        </div>
        <div className="check-out-date" onClick={onDateModal}>
          <label>CHECKOUT</label>
          <p>{(params.checkOut === undefined) ? formatDateCalendar(randEndDate) : formatDateCalendar(params.checkOut)}</p>
        </div>
        <div className="guests-amount">
          <label>GUESTS</label>
          <p>{(totalGuest) ? totalGuest : 1} {totalGuest > 1 ? 'guests' : 'guest'}</p>
        </div>
        <span className="chevron-arrow" onClick={onGuestModal}>
          {(arrow) ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
        </span>
        {/* <GuestsModal /> */}
      </div>

      <button className="reserve-btn" onClick={onResrve}>Reserve</button>
      <p className="note">You won’t be charged yet</p>
      {/* Dont delete!! */}
      {/* {params.checkIn && params.checkOut && <>

        <div className="reservation-prices">
          <p className="flex space-between">
            <span className="nights-info">{nights} nights x ${stay.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
            <span>${nights * stay.price}</span>
          </p>
          <p className="flex space-between">
            <span className="cleaning-fee">Cleaning fee</span>
            <span>$5</span>
          </p>
          <hr />
          <p className="flex space-between">
            <span>Total</span>
            <span>${totalPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
          </p>
        </div>
      </>} */}
    </section>
  )
}

