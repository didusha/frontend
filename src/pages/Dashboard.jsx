import { useEffect, useState } from 'react'
import { orderService } from '../services/order/order.service.local'

export function Dashboard() {
  const [orders, setOrders] = useState()
  
  
  useEffect(() => {
      loadOrders()
    }, [])
    
    async function loadOrders() {
        const orders = await orderService.query()
        setOrders(orders)
        
    }
    
    
    if (!orders) return <div>loading</div>
    console.log(orders);
  return (
    <section>
        <h2>{orders.length} Reservations</h2>
    <table>
        <tr>
            <th>Guest</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Booked</th>
            <th>Total Payout </th>
            <th>Status</th>
        </tr>
        {orders.map(order=>{
            
        <tr key={order._id}>
            <td>{order.guest}</td>
            <td>{order.startDate}</td>
            <td>19</td>
            <td>Male</td>
        </tr>
        })}
        <tr>
            <td>Megha</td>
            <td>19</td>
            <td>Female</td>
        </tr>
        <tr>
            <td>Subham</td>
            <td>25</td>
            <td>Male</td>
        </tr>
    </table>
    </section>
  )
}
