import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay'
import { useState } from 'react'
import { StayGallery } from '../cmps/StayGallery.jsx'
import { StayDescription } from '../cmps/StayDescription.jsx'
import { StayReservation } from '../cmps/StayReservation.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'

export function StayDetails() {
  const { stayId } = useParams()
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

  return (
    <section className='stay-details details-layout'>
      <Link to='/'> ← </Link>
      <div className='photos'>
        <StayGallery />
      </div>
      <div className='main-details'>
        <StayDescription />
        <StayReservation stay={stay}/>
      </div>

     < ReviewList reviews={stay.reviews}/>
    </section>
  )
}
