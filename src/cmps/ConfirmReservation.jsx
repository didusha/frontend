import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { formatDateCalendar, getDayDiff } from '../services/util.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay'
import { orderService } from '../services/order'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { icons } from "../services/amenities.service.js"
import { Login } from "../pages/LoginSignup.jsx"
import { useSelector } from "react-redux"
import { socketService } from "../services/socket.service.js"

export function ConfirmReservation() {

  const { stayId } = useParams()
  const [stay, setStay] = useState()
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.user)


  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  useEffect(() => {
    if (isOrderComplete) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOrderComplete])

  async function loadStay(stayId) {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
    } catch (err) {
      console.log('Cannot load stay', err)
      showErrorMsg('Cannot load stay')
    }
  }

  async function onConfirmReservation() {
    try {
      const totalGuest = +params.adults + +params.children + +params.infants
      const orderData = {
        checkIn: params.checkIn,
        checkOut: params.checkOut,
        adults: +params.adults || 1,
        children: +params.children || 0,
        infants: +params.infants || 0,
        pets: +params.pets || 0,
        totalPrice: +params.totalPrice || 0,
        capacity: totalGuest,
      }
      await orderService.add(stay, orderData)
      setIsOrderComplete(true)
    } catch (error) {
      console.log('Cannot confirm order', error)
    }
  }

  if (!stay) return <div>Loading...</div>
  const nights = getDayDiff(params.checkIn, params.checkOut)
  const totalPrice = nights * stay.price
  const totalGuest = +params.adults + +params.children + +params.infants

  return (
    <section className="confirm-details-container">
      <div className="confirm-details-header">
        <Link to="#" onClick={() => navigate(-1)} className="btn-back">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h1 className="bold">
          {(isOrderComplete) ?
            <> <span>Reservation success!</span> <img className="svg-green-check" src={icons.greenCheck} alt="Success" /> </> :
            'Request to book'
          }
        </h1>
      </div>

      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 100 }).map((_, idx) => (
            <div
              key={idx}
              className="confetti"
              style={{
                left: `${Math.random() * window.innerWidth}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                width: `${5 + Math.random() * 10}px`,
                height: `${5 + Math.random() * 10}px`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      )}

      <section className='confirm-reservation'>

        <section className="order-details">

          <div className="rare-find flex">
            <div>
              <h3 className="bold">This is a rare find</h3>
              <p>{stay.name} is usually booked.</p>
            </div>
            <div>
              <img src={icons.daimond} alt="Diamond" />
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

          <div className="order-confirm">
            {isOrderComplete && <h3 className="bold text-center"> We look forward to hosting you!</h3>}

            {(isOrderComplete) ? <>
              <button className="btn-confirm" onClick={() => navigate('/trips')}>Review Trips</button>
              <h3 className="flex align-center bold justify-center">
                <span>Reservation success!</span>
                <img className="svg-image" src={icons.greenCheck} alt="Success" />
              </h3>
            </> : (user) ? (
              <button className="btn-confirm" onClick={onConfirmReservation}>Confirm</button>
            ) : (
              <div className="login">
                <h2>Please login to book</h2>
                < Login />
              </div>
            )}
          </div>
        </section>

        <section className="order-summary">
          <div className="stay-summary flex">
            <img src={stay.imgUrls[0]} alt="" />
            <div className="stay-desc flex column space-between">
              <h4>{stay.name}</h4>
              <p className="grey">{stay.type}</p>
              <div className="rating flex">
                <img src={icons.star} alt="Star" />
                <span className="avg-rating">4.88</span>
                <span className="reviews-count grey">{stay.reviews ? `· ${stay.reviews?.length} reviews` : ''}</span>
              </div>
            </div>
          </div>
          <hr />

          <div className="reservation-prices">
            <p className="flex space-between">
              <span className="nights-info underline">{nights} nights x ${stay.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              <span>${totalPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
            </p>
            <p className="flex space-between">
              <span className="cleaning-fee underline">Cleaning fee</span>
              <span>$5</span>
            </p>
            <hr />
            <p className="flex space-between">
              <span>Total</span>
              <span>${(totalPrice + 5).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
            </p>
          </div>
        </section>
      </section>
    </section>
  )
}
