import { useEffect, useState } from 'react'
import { orderService } from '../services/order/index'
import { formatDateCalendar, getDateFromObjectId } from '../services/util.service.js'
import { Charts } from '../cmps/Charts'
import { useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service.js'

export function Dashboard() {
  const [orders, setOrders] = useState()
  const [sort, setSort] = useState({type:'', dir: 1})
  const user = useSelector((storeState) => storeState.userModule.user)



  useEffect(() => {
    loadOrders()
  }, [sort])

  async function loadOrders() {
    try {
      const orders = await orderService.query({ hostId: user._id ,type:sort.type,dir:sort.dir}) 
      setOrders(orders)   
    } catch (err) {
      console.log(err);
       showErrorMsg('Cannot load orders')
      
    }
  }

  async function onSetStatus(order, status) {
    order.status = status
    const savedOrder = await orderService.save(order)
    setOrders((prevOrders) => [...prevOrders])
  }

  function onSetSorting(type){
  setSort(prev=>({...prev, type:type, dir: -prev.dir}))
  }

  function renderSortArrow(field) {
    const isActive = sort.type === field
    const upActive = isActive && sort.dir === 1
    const downActive = isActive && sort.dir=== -1
    return (
      <span className="sort-arrows">
        <span className={`arrow up ${upActive ? 'action' : ''}`}>▲</span>
        <span className={`arrow down ${downActive ? 'action' : ''}`}>▼</span>
      </span>
    )
}

  if (!orders || !orders.length) return <div>No orders yet</div>

  return (
    <section className='dashboard'>
      <div className='charts'>
        <div className="orders-status">
          <p>
            Approved
            <span>{orders.filter((o) => o.status === 'Approved').length}</span>
          </p>
          <p>
            Reject
            <span>{orders.filter((o) => o.status === 'Rejected').length}</span>
          </p>
          <p>
            Pending
            <span>{orders.filter((o) => o.status === 'Pending').length}</span>{' '}
          </p>
        </div>
        <div>
          <Charts orders={orders} />
        </div>
      </div>

      <h2>{orders.length} Reservations</h2>
      <table className='table'>
        <thead>
          <tr className="table-title">
            <th >Guest</th>     
            <th onClick={()=> onSetSorting('startDate')}>Check-in {renderSortArrow('startDate')}</th>
            <th onClick={()=> onSetSorting('endDate')} >Check-out {renderSortArrow('endDate')}</th>
            <th onClick={()=> onSetSorting('createdAt')}>Booked {renderSortArrow('createdAt')}</th>
            <th onClick={()=> onSetSorting('name')}>Stay {renderSortArrow('name')}</th>
            <th onClick={()=> onSetSorting('totalPrice')} >Total Price{renderSortArrow('totalPrice')}</th>
            <th className='status'onClick={()=> onSetSorting('status')}>Status{renderSortArrow('status')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const checkIn = formatDateCalendar(order.startDate)
            const checkOut = formatDateCalendar(order.endDate)
            const createdAt = getDateFromObjectId(order._id) // change after adding createdAt property 
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
                <td>{createdAt}</td>
                <td className='stay'>{order.stay.name}</td>
                <td className='price'>
                  ${' '}
                  {order.totalPrice.toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td
                  className={ order.status === 'Approved'? 'active': order.status === 'Pending'? 'pending': 'non-active'}>
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
