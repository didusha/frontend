import { useEffect, useState } from 'react'
import { formatDateRange, getDayDiff } from '../services/util.service'
import { useNavigate } from 'react-router'

export function SmallReservation({ stay, params }) {
  const navigate = useNavigate()
  const randStartDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  const randEndDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)

  const order = {
    checkIn: params.checkIn || randStartDate,
    checkOut: params.checkOut || randEndDate,
    guests: {
      adults: +params.adults || 1,
      children: +params.children || 0,
      infants: +params.infants || 0,
      pets: +params.pets || 0,
    },
  }

  const nights = getDayDiff(order.checkIn, order.checkOut) || getDayDiff(params.checkIn, params.checkOut) ||1
  const totalPrice = nights * stay.price + 5

  function onSendReserve() {
    const orderParams = new URLSearchParams({
      checkIn: order.checkIn || params.checkIn || randStartDate,
      checkOut: order.checkOut || params.checkOut || randEndDate,
      adults: order.guests.adults || params.adults || 1,
      children: order.guests.children || params.children || 0,
      infants: order.guests.infants || params.infants || 0,
      pets: order.guests.pets || params.pets || 0,
      totalPrice: totalPrice || 0,
      totalPrice: totalPrice,
    })
    navigate(`/stay/${stay._id}/order?${orderParams.toString()}`)
  }



  return (
    <section>
      <section className='small-reservation flex space-between'>
        <div>
          <p className='price underline bold'>$ {totalPrice}</p>
          <p className='nights'>
            for {nights} nights {formatDateRange(order.checkIn, order.checkOut)}
          </p>
        </div>
        <button className='reserve-btn' onClick={onSendReserve}>
          Reserve
        </button>
      </section>
    </section>
  )
}
