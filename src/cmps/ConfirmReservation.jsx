import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { formatDateCalendar } from '../services/util.service.js'
import { stayService } from '../services/stay'
import daimond from '../assets/images/daimond.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { getDayDiff } from "../services/util.service"
import star from '../assets/images/star.svg'


export function ConfirmReservation() {

  const { stayId } = useParams()
  const [stay, setStay] = useState()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])


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
  if (!stay) return <div>Loading...</div>
  const nights = getDayDiff(stay.startDate, stay.endDate)
  const totalPrice = nights * stay.price + 5
  const totalGuest = +params.adults + +params.children + +params.infants
  return (
    <section className='confirm-reservation'>
      <section className="order-details">
        <Link to="#" onClick={() => navigate(-1)} className="btn-back"> <FontAwesomeIcon icon={faChevronLeft} /></Link>
        <h1 className="bold">Request to book</h1>
        <div className="rare-find flex">
          <div>
            <h3 className="bold">This is a rare find</h3>
            <p>{stay.name} is usually booked.</p>
          </div>
          <div>
            <img src={daimond} alt="Diamond" />
          </div>

        </div>

        <h3 className="trip-details bold">Your trip</h3>
        <div className="date-details flex space-between">
          <p className="bold">Dates</p>
          <p>{formatDateCalendar(params.checkIn)} - {formatDateCalendar(params.checkOut)}</p>
        </div>
        <div className="guests-details flex space-between">
          <p className="bold">Guests</p>
          <p>{totalGuest}</p>
        </div>

        <button className="btn-confirm">Confirm</button>
      </section>


      <section className="order-summary">
        <div className="stay-summary flex">
          <img src={stay.imgUrls[0]} alt="" />
          <div className="stay-desc flex column space-between">
            <div>
              <h4 className="">{stay.name}</h4>
              <p className="grey">{stay.type}</p>
            </div>
            <div className="rating flex">
              <img src={star} alt="Star" />
              <span className="avg-rating">4.88</span>
              <span className="reviews-count grey">{stay.reviews ? `· ${stay.reviews?.length} reviews` : ''} </span>
            </div>
          </div>
        </div>
        <hr />

        <div className="reservation-prices">
          <p className="flex space-between">
            <span className="nights-info underline">{nights} nights x $ {stay.price}</span>
            <span>$ {nights * stay.price}</span>
          </p>
          <p className="flex space-between">
            <span className="cleaning-fee underline">Cleaning fee</span>
            <span>$ 5</span>
          </p>
          <hr />
          <p className="flex space-between">
            <span>Total</span>
            <span>$ {totalPrice}</span>
          </p>

        </div>
      </section>
    </section>
  )
}

