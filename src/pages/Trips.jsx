import { useEffect, useState } from "react"
import { formatDateCalendar } from "../services/util.service"
import { orderService } from "../services/order/index"
import { useSelector } from "react-redux"

export function Trips() {
  const user = useSelector(storeState => storeState.userModule.user)
  const [orders, setOrders] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
  const [originalOrders, setOriginalOrders] = useState([])
  
  useEffect(() => {
    loadOrders()
  }, [])
  console.log("🚀 ~ Trips ~ orders:", orders)
  
  async function loadOrders() {
    const orders = await orderService.query({ guestId: user._id })
    setOrders(orders)
    setOriginalOrders(orders)
  }

  function handleSort(key) {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null
    }
    setSortConfig({ key, direction })

    if (direction === null) {
      setOrders(originalOrders)
      return
    }

    const sorted = [...orders].sort((a, b) => {
      let aVal, bVal
      if (key === 'checkIn') {
        aVal = new Date(a.startDate).getTime()
        bVal = new Date(b.startDate).getTime()
      } else if (key === 'checkOut') {
        aVal = new Date(a.endDate).getTime()
        bVal = new Date(b.endDate).getTime()
      } else if (key === 'guests') {
        aVal = (a.guests?.adults || 0) + (a.guests?.children || 0) + (a.guests?.infants || 0)
        bVal = (b.guests?.adults || 0) + (b.guests?.children || 0) + (b.guests?.infants || 0)
      } else if (key === 'price') {
        aVal = a.totalPrice || a.order?.price
        bVal = b.totalPrice || b.order?.price
      } else if (key === 'status') {
        aVal = a.status
        bVal = b.status
      }
      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })
    setOrders(sorted)
  }

  function renderSortArrows(key) {
    const isActive = sortConfig.key === key
    const upActive = isActive && sortConfig.direction === 'asc'
    const downActive = isActive && sortConfig.direction === 'desc'
    return (
      <span className="sort-arrows">
        <span className={`arrow up ${upActive ? 'active' : ''}`}>▲</span>
        <span className={`arrow down ${downActive ? 'active' : ''}`}>▼</span>
      </span>
    )
  }

  return (
    <>
      <h1 className="trips-title">My Trips</h1>
      {!orders.length && <p>No trips booked yet.</p>}
      <h2 className="trips-length">{orders.length} {orders.length === 1 ? 'Trip' : 'Trips'}</h2>
      <section className="trips">

        <div className="trips-headers">
          <span className="destination-header">Destination</span>
          <span></span>
          <span className="host-header">Host</span>
          <span className="check-in-header" onClick={() => handleSort('checkIn')}>
            Check-in {renderSortArrows('checkIn')}
          </span>
          <span className="check-out-header" onClick={() => handleSort('checkOut')}>
            Check-out {renderSortArrows('checkOut')}
          </span>
          <span className="guests-header" onClick={() => handleSort('guests')}>
            Guests {renderSortArrows('guests')}
          </span>
          <span className="price-header" onClick={() => handleSort('price')}>
            Price {renderSortArrows('price')}
          </span>
          <span className="status-header" onClick={() => handleSort('status')}>
            Status {renderSortArrows('status')}
          </span>
        </div>

        <ul className="trips-container">
          {orders.map(order => (
            <li key={order._id} className="trip">
              <img className="trip-img" src={order.stay.imgUrls[0]} alt="stay-img" />
              <h3 className="trip-name">{order.stay?.name}</h3>
              <span className="trip-host">{order.host?.fullname}</span>
              <span className="trip-checkIn">{formatDateCalendar(order.startDate) || "Not set"}</span>
              <span className="trip-checkOut">{formatDateCalendar(order.endDate) || "Not set"}</span>
              <span className="trip-guests">{(order.guests?.adults || 0) + (order.guests?.children || 0) + (order.guests?.infants || 0)} Guests</span>
              <span className="trip-price">${(order.totalPrice || order.stay?.price).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              <span className="trip-status">{order.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
