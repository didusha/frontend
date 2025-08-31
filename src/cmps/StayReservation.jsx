import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { getDayDiff } from '../services/util.service.js'
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { formatDateCalendar } from '../services/util.service.js'
import { DetailsDateModal } from './DetailsDateModal.jsx'
import { DetailsGuestsModal } from './DetailsGuestsModal.jsx'

export function StayReservation({ stay ,isDateModalOpen ,onSetIsDateModalOpen}) {

  const [arrow, setArrow] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)


  if (!stay) return <div>Loading..</div>
  // const totalGuest = (+order.guests.adults + +order.guests.children + +order.guests.infants) || (+params.adults + +params.children + +params.infants)
  const randStartDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  const randEndDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)

  const [order, setOrder] = useState({
    checkIn: params.checkIn || randStartDate,
    checkOut: params.checkOut || randEndDate,
    guests: {
      adults: +params.adults || 1,
      children: +params.children || 0,
      infants: +params.infants || 0,
      pets: +params.pets || 0,
    }
  })
  const nights = getDayDiff(order.checkIn, order.checkOut) || getDayDiff(params.checkIn, params.checkOut) || 1
  const totalPrice = nights * stay.price + 5

  function onResrve() {
    const orderParams = new URLSearchParams({
      checkIn: order.checkIn || params.checkIn || randStartDate,
      checkOut: order.checkOut || params.checkOut || randEndDate,
      adults: order.guests.adults || params.adults || 1,
      children: order.guests.children || params.children || 0,
      infants: order.guests.infants || params.infants || 0,
      pets: order.guests.pets || params.pets || 0,
      totalPrice: totalPrice || 0,
    })
    navigate(`/stay/${stay._id}/order?${orderParams.toString()}`)
  }

  function onGuestModal() {
    setArrow(!arrow)
    setIsGuestsModalOpen(true)
  }

  function onDateModal() {
    onSetIsDateModalOpen(true)
  }

  function getGuestsLabel(guests) {
    const { adults, children, infants, pets } = guests
    let parts = []

    if (adults > 0) parts.push(`${adults} ${adults === 1 ? 'adult' : 'adults'}`)
    if (children > 0) parts.push(`${children} ${children === 1 ? 'child' : 'children'}`)
    if (infants > 0) parts.push(`${infants} ${infants === 1 ? 'infant' : 'infants'}`)
    if (pets > 0) parts.push(`${pets} ${pets === 1 ? 'pet' : 'pets'}`)
    if (parts.length === 0) return '1 Guest'
    return parts.join(', ')
  }

  const guestsToShow = order.guests

  return (
    <section className='stay-reservation' id='reservation'>
      <div className="reservation-header">
        <span className="price underline"> {(order.checkIn && order.checkOut) || (params.checkIn && params.checkOut)
          ? `$${totalPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          : `$${stay.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
        }</span>
        <span className="per-night"> for {
          ((order.checkIn && order.checkOut) || (params.checkIn && params.checkOut))
            ? `${nights} ${nights > 1 ? 'nights' : 'night'}`
            : '1 night'
        }</span>
      </div>

      <div className="reservation-form">
        <div className="check-in-date" onClick={onDateModal}>

          <label>CHECK-IN</label>
          <p> {order.checkIn
            ? formatDateCalendar(order.checkIn)
            : params.checkIn
              ? formatDateCalendar(params.checkIn)
              : formatDateCalendar(randStartDate)}</p>
        </div>
        <div className="check-out-date" onClick={onDateModal}>
          <label>CHECKOUT</label>
          <p> {order.checkOut
            ? formatDateCalendar(order.checkOut)
            : params.checkOut
              ? formatDateCalendar(params.checkOut)
              : formatDateCalendar(randEndDate)}</p>
        </div>
        <div className="guests-amount" onClick={onGuestModal}>
          <label>GUESTS</label>
          <p>{getGuestsLabel(guestsToShow)}</p>
        </div>
        <span className="chevron-arrow">
          {(arrow) ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
        </span>
      </div>
      <DetailsDateModal
        isDateModalOpen={isDateModalOpen}
        onSetIsDateModalOpen={onSetIsDateModalOpen}
        setOrder={setOrder}
      />
      <DetailsGuestsModal
        setIsGuestsModalOpen={setIsGuestsModalOpen}
        isGuestsModalOpen={isGuestsModalOpen}
        setOrder={setOrder}
        order={order}
      />

      
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

