import { useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay'
import { useState } from 'react'
import { StayGallery } from '../cmps/StayGallery.jsx'
import { StayDescription } from '../cmps/StayDescription.jsx'
import { StayReservation } from '../cmps/StayReservation.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { StayAmenities } from '../cmps/StayAmenities.jsx'
import { useRef } from "react"
import { getDayDiff } from '../services/util.service.js'

export function StayDetails() {
  const { stayId } = useParams()
  const photoRef = useRef(null) 
  const reserveRef = useRef(null) 
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])
  const [stay, setStay] = useState()
  const navigate = useNavigate()
  const [showHeader, setShowHeader] = useState(false)
  const [showReserve, setShowReserve] = useState(false)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  useEffect(() => {
    const handleScroll = () => {
      if (!photoRef.current) return
      const rect = photoRef.current.getBoundingClientRect()
      const reservation = reserveRef.current.getBoundingClientRect()
      if (reserveRef.current){
      }
      if (rect.bottom <= 0) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }

      if (reservation.bottom <= 100){
        setShowReserve(true)
      }else {
        setShowReserve(false)
      }
    }


    window.addEventListener("scroll", handleScroll)
    return () => {
 
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])


  async function loadStay(stayId) {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
    } catch (err) {
      console.log('Cannot load stay', err)
      showErrorMsg('Cannot load stay')
    }
  }


  function onSendReserve(){
      const orderParams = new URLSearchParams({
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      adults: params.adults,
      children: params.children,
      infants: params.infants,
      pets: params.pets,
      totalPrice: getDayDiff(checkIn, checkOut) * stay.price + 5,
      
    })
    navigate(`/stay/${stay._id}/order?${orderParams.toString()}`)
  }

  if (!stay) return <div>loading...</div>

  const {checkIn, checkOut} = params


  return (
    <section className='stay-details details-layout '>
     {showHeader && <nav className='nav details-layout '>
      <div className='details-nav flex'>
        <section className='nav-list flex'>
          <a href='#photos'>Photos</a>
          <a href='#amenities'>Amenities</a>
          <a href='#reviews'>Reviews</a>
          {/* <a href="#location">Location</a> */}
        </section>
      {showReserve&&<section className='reservation flex' > 
          <div>
           {checkIn && checkOut && <p className='price underline bold'>$ {getDayDiff(checkIn, checkOut)* stay.price+5}</p>}
            <p className='nights'>{checkIn && checkOut ? `for` +` `+ getDayDiff(checkIn, checkOut) +` `+ `nights` : `Add dates for price`}</p>
            {stay.reviews && <p className='review'>★ {stay.rating} · <span>{stay.reviews.length} {stay.reviews > 1 ?'reviews':'review'}</span></p>}
          </div>
          {checkIn && checkOut ? <button className='reserve-btn' onClick={onSendReserve}>Reserve</button>
          : <button className='check-btn' onClick={()=>location.href='#reservation'}>Check availability</button>}
          </section>}
        </div>
      </nav>}
      <div className='photos' id='photos' ref={photoRef} >
        <StayGallery images={stay.imgUrls} name={stay.name} />
      </div>
      <div className='main-details' ref={reserveRef} >
        <StayDescription stay={stay} />
        <StayReservation stay={stay} />
        <StayAmenities labels={stay.amenities} />
      </div>
      <div id='reviews'>
        <ReviewList reviews={stay.reviews} />
      </div>
    </section>
  )
}
