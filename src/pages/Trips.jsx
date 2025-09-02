import { useEffect, useState } from 'react'
import { formatDateCalendar } from '../services/util.service'
import { orderService } from '../services/order/index'
import { useSelector } from 'react-redux'
import { SOCKET_EVENT_ORDER_CONFIRM, SOCKET_EVENT_ORDER_REJECT } from '../services/socket.service'

export function Trips() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const [orders, setOrders] = useState([])
  // console.log("🚀 ~ Trips ~ orders:", orders)
  const [sort, setSort] = useState({ key: null, direction: 1 })
  const [originalOrders, setOriginalOrders] = useState([])

  useEffect(() => {
    socketService.on(SOCKET_EVENT_ORDER_CONFIRM, (order) => {
      setOrders(prevOrders => prevOrders.map(prevOrder => prevOrder._id !== order._id ? prevOrder : order))
    })
    socketService.on(SOCKET_EVENT_ORDER_REJECT, (order) => {
      setOrders(prevOrders => prevOrders.map(prevOrder => prevOrder._id !== order._id ? prevOrder : order))
    })
  }, [])

  useEffect(() => {
    loadOrders()
  }, [sort])

  async function loadOrders() {
    const orders = await orderService.query({
      guestId: user._id,
      type: sort.key,
      dir: sort.direction,
    })
    setOrders(orders)
    setOriginalOrders(orders)
  }

  function onSetSorting(key) {
    setSort((prev) => ({ ...prev, key: key, direction: -prev.direction }))
  }

  function renderSortArrows(key) {
    const isActive = sort.key === key
    const upActive = isActive && sort.direction === 1
    const downActive = isActive && sort.direction === -1
    return (
      <span className='sort-arrows'>
        <span className={`arrow up ${upActive ? 'active' : ''}`}>▲</span>
        <span className={`arrow down ${downActive ? 'active' : ''}`}>▼</span>
      </span>
    )
  }

  if (!orders) return <div>No orders yet...</div>
  return (
    <>
      <h1 className='trips-title'>My Trips</h1>
      {!orders.length && <p>No trips booked yet.</p>}
      <h2 className='trips-length'>
        {orders.length} {orders.length === 1 ? 'Trip' : 'Trips'}
      </h2>

      <section className='trips'>
        <div className='trips-headers'>
          <span className='destination-header'>Destination</span>
          <span></span>
          <span className='host-header'>Host</span>
          <span
            className='check-in-header'
            onClick={() => onSetSorting('startDate')}
          >
            Check-in {renderSortArrows('startDate')}
          </span>
          <span
            className='check-out-header'
            onClick={() => onSetSorting('endDate')}
          >
            Check-out {renderSortArrows('endDate')}
          </span>
          <span
            className='guests-header'
            onClick={() => onSetSorting('capacity')}
          >
            Guests {renderSortArrows('capacity')}
          </span>
          <span
            className='price-header'
            onClick={() => onSetSorting('totalPrice')}
          >
            Price {renderSortArrows('totalPrice')}
          </span>
          <span
            className='status-header'
            onClick={() => onSetSorting('status')}
          >
            Status {renderSortArrows('status')}
          </span>
        </div>

        <ul className='trips-container'>
          {orders.map((order) => (
            <li key={order._id} className='trip'>
              <img
                className='trip-img'
                src={order.stay.imgUrls[0]}
                alt='stay-img'
              />
              <h3 className='trip-name'>{order.stay?.name}</h3>
              <div className='order-info'>
                <span className='small-headers'>Host: </span>
                <span className='trip-host'>{order.host?.fullname}</span>
              </div>
              <div className='order-info'>
                <span className='small-headers'>Check in: </span>
                <span className='trip-checkIn'>
                  {formatDateCalendar(order.startDate) || 'Not set'}
                </span>
              </div>
              <div className='order-info'>
                <span className='small-headers'>Check out: </span>
                <span className='trip-checkOut'>
                  {formatDateCalendar(order.endDate) || 'Not set'}
                </span>
              </div>
              <div className='order-info'>
                <span className='small-headers'>Capacity: </span>
                <span className='trip-guests'>{order.capacity} Guests</span>
              </div>
              <div className='order-info'>
                <span className='small-headers'>Price: </span>
                <span className='trip-price'>
                  $
                  {order.totalPrice.toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className='order-info'>
                <span className='small-headers'>Status: </span>
                <span
                  className={`trip-status ${
                    order.status === 'Approved'
                      ? 'approved'
                      : order.status === 'Rejected'
                      ? 'rejected'
                      : ''
                  }`}
                >
                  {order.status}{' '}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
