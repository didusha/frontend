import { useEffect, useState } from 'react'
import { orderService } from '../services/order/index'
import { formatDateCalendar, getDateFromObjectId } from '../services/util.service'
import { Charts } from '../cmps/Charts'
import { useSelector } from 'react-redux'

export function Dashboard() {
  const [orders, setOrders] = useState()
  const user = useSelector((storeState) => storeState.userModule.user)


  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    const orders = await orderService.query({ hostId: user._id })
    setOrders(orders)
  }

  async function onSetStatus(order, status) {
    order.status = status
    const savedOrder = await orderService.save(order)
    setOrders((prevOrders) => [...prevOrders])
  }

  if (!orders || !orders.length) return <div>No orders yet</div>

  return (
    <section className='dashboard'>
      <div className='charts'>
        <div className="orders-status">
          <p>
            Approved{' '}
            <span>{orders.filter((o) => o.status === 'Approved').length}</span>
          </p>
          <p>
            Reject{' '}
            <span>{orders.filter((o) => o.status === 'Rejected').length}</span>
          </p>
          <p>
            Pending{' '}
            <span>{orders.filter((o) => o.status === 'pending').length}</span>{' '}
          </p>
        </div>
        <div>
          <Charts orders={orders} />
        </div>
      </div>

      <h2>{orders.length} Reservations</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Booked</th>
            <th>Stay</th>
            <th>Total Price</th>
            <th className='status'>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const checkIn = formatDateCalendar(order.startDate)
            const checkOut = formatDateCalendar(order.endDate)
            const createAt = getDateFromObjectId(order._id) 
            return (
              <tr key={order._id} className='first-tr'>
                <td>
                  <div className='guest'>
                    <img src={order.guest.imgUrl} alt='user profile' />
                    {order.guest.fullname}
                  </div>
                </td>
                <td>{checkIn}</td>
                <td>{checkOut}</td>
                <td>{createAt}</td>
                <td className='stay'>{order.stay.name}</td>
                <td className='price'>
                  ${' '}
                  {order.totalPrice.toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td
                  className={
                    order.status === 'Approved'
                      ? 'active'
                      : order.status === 'pending'
                      ? 'pending'
                      : 'non-active'
                  }
                >
                  {order.status}
                </td>
                <td className='btn-container'>
                  <button
                    className='btn approve'
                    onClick={() => onSetStatus(order, 'Approved')}
                  >
                    Approve
                  </button>
                  <button
                    className='btn reject'
                    onClick={() => onSetStatus(order, 'Rejected')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
