import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
  CategoryScale,
  Title,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { dataBase } from '../services/util.service.js'

export function Charts({ orders }) {
  const labels = [...new Set(orders.map((o) => o.stay.name))]

  const counts = dataBase(orders, { name: 'labels', data: labels })

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    Title,
    BarElement
  )

  const data = {
    labels: [...new Set(orders.map((order) => order.stay.name))],
    datasets: [
      {
        label: '',
        data: counts.map((count) => count.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const totalPrices = dataBase(orders, { name: 'monthNames', data: monthNames })

  const months = [
    ...new Set(
      orders.map((order) => {
        const monthIndex = new Date(parseInt((order._id).substring(0, 8), 16)*1000).getMonth()
        return monthNames[monthIndex]
      })
    ),
  ]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  const data2 = {
    labels: months,
    datasets: [
      {
        label: 'Total price fer month',
        data: totalPrices.filter((p) => p.price > 0).map((p) => p.price),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <section className='statistic '>
      <div className="orders-status">
        <p>Approved<span className="active">{orders.filter((o) => o.status === 'Approved').length}</span></p>
        <p>Reject<span className="non-active">{orders.filter((o) => o.status === 'Rejected').length}</span></p>
        <p>Pending<span className="">{orders.filter((o) => o.status === 'Pending').length}</span></p>
      </div>
      <div className='doughnut'>
        <Doughnut data={data} />
      </div>
      <div className='bar'>
        <Bar options={options} data={data2}/>
      </div>
    </section>
  )
}
