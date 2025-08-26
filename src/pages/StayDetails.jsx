import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay'
import { useState } from 'react'
import { StayGallery } from '../cmps/StayGallery.jsx'
import { StayDescription } from '../cmps/StayDescription.jsx'
import { StayReservation } from '../cmps/StayReservation.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { StayAmenities } from '../cmps/StayAmenities.jsx'

export function StayDetails() {
  const { stayId } = useParams()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])
  const [stay, setStay] = useState()

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  async function loadStay(stayId) {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
    } catch (err) {
      console.log('Cannot load stay', err)
      showErrorMsg('Cannot load stay')
    }
  }
  
console.log(stay);

  if (!stay) return <div>loading...</div>
  return (
    <section className='stay-details details-layout '>
      <nav className='nav details-layout non-active'>
        <section className='nav-list flex'>
          <a href='#photos'>Photos</a>
          <a href='#amenities'>Amenities</a>
          <a href='#reviews'>Reviews</a>
          <a href="#location">Location</a>
        </section>
      </nav>
      <Link to='/'> ← </Link>
      <div className='photos' id='photos'>
        <StayGallery images={stay.imgUrls} name={stay.name} />
      </div>
      <div className='main-details'>
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
