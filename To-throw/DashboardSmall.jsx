import { useEffect, useState } from 'react'
import { orderService } from '../services/order/index'
import { formatDateCalendar, getDateFromObjectId } from '../services/util.service.js'
import { Charts } from '../cmps/Charts.jsx'
import { useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service.js'

export function DashboardSmall() {
  const [orders, setOrders] = useState()
  const [sort, setSort] = useState({ type: '', dir: 1 })
  const user = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    loadOrders()
  }, [sort])

  async function loadOrders() {
    try {
      const orders = await orderService.query({ hostId: user._id, type: sort.type, dir: sort.dir })
      setOrders(orders)
    } catch (err) {
      console.log(err);
      showErrorMsg('Cannot load orders')
    }
  }

  async function onSetStatus(order, status) {
    try {
      order.status = status
      await orderService.save(order)
      setOrders((prevOrders) => [...prevOrders])
    }
    catch (err) {
      console.log(err)
    }
  }

  function onSetSorting(type) {
    setSort(prev => ({ ...prev, type: type, dir: -prev.dir }))
  }

  function renderSortArrows(field) {
    const isActive = sort.type === field
    const upActive = isActive && sort.dir === 1
    const downActive = isActive && sort.dir === -1
    return (
      <span className="sort-arrows">
        <span className={`arrow up ${upActive ? 'action' : ''}`}>▲</span>
        <span className={`arrow down ${downActive ? 'action' : ''}`}>▼</span>
      </span>
    )
  }

  if (!orders || !orders.length) return <div>No orders yet</div>

  return (
    <>
      <h1 className="small-dashboard-title">My Reservations</h1>
      <div className='charts'>
        <div>
          <Charts orders={orders} />
        </div>
      </div>
      {!!orders.length && (
        <h2 className="small-dashboard-length">
          {orders.length} {orders.length === 1 ? "Reservation" : "Reservations"}
        </h2>
      )}

      <section className="small-dashboard">
        <div className="small-dashboard-headers">
          <span className="guest-header">Guest</span>
          <span className="check-in-header" onClick={() => onSetSorting('startDate')}>
            Check-in {renderSortArrows('startDate')}
          </span>
          <span className="check-out-header" onClick={() => onSetSorting('endDate')}>
            Check-out {renderSortArrows('endDate')}
          </span>
          <span className="booked-header" onClick={() => onSetSorting('createdAt')}>
            Booked {renderSortArrows('createdAt')}
          </span>
          <span className="stay-header" onClick={() => onSetSorting('name')}>
            Stay {renderSortArrows('name')}
          </span>
          <span className="price-header" onClick={() => onSetSorting('totalPrice')}>
            Price {renderSortArrows('totalPrice')}
          </span>
          <span className="status-header" onClick={() => onSetSorting('status')}>
            Status {renderSortArrows('status')}
          </span>
          <span className="actions-header">Actions</span>
        </div>

        <ul className="small-dashboard-container">
          {orders.map((order) => {
            const checkIn = formatDateCalendar(order.startDate)
            const checkOut = formatDateCalendar(order.endDate)
            const createdAt = getDateFromObjectId(order._id)
            // const isActioned = (order.status !== "Pending") ? true : false

            return (
              <li key={order._id} className="small-dashboard-item">
                <div className="small-dashboard-guest">
                  <img src={order.guest.imgUrl} alt="guest profile" />
                  <span>{order.guest.fullname}</span>
                </div>

                <span className="small-dashboard-checkIn">{checkIn}</span>
                <span className="small-dashboard-checkOut">{checkOut}</span>
                <span className="small-dashboard-booked">{createdAt}</span>
                <span className="small-dashboard-stay">{order.stay?.name}</span>
                <span className="small-dashboard-price">
                  ${order.totalPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
                <span
                  className={`small-dashboard-status ${order.status === "Approved"
                    ? "active"
                    : order.status === "Pending"
                      ? "pending"
                      : "non-active"
                    }`}
                >{order.status}
                </span>


                <div className="small-dashboard-actions">
                  <button className="btn approve" onClick={() => onSetStatus(order, "Approved")}
                  // disabled={isActioned}
                  >Approve
                  </button>
                  <button className="btn reject" onClick={() => onSetStatus(order, "Rejected")}
                  // disabled={isActioned}
                  >Reject
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
