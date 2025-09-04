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

  const doughnutOptions= {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Reservations per stay', 
      font: {
        size: 18,
        weight: 'bold',
      },
      color: '#333', 
      padding: {
        top: 10,
        bottom: 30,
      },
    },
    legend: {
      display:false,
      position: 'bottom',
    },
  },
}

  const data = {
    labels,
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


   const barOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Income per month',
      font: {
        size: 18,
        weight: 'bold'
      },
      color: '#333', 
    },
    legend: {
      display: false,
    }
  }
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

// REAL DATA:
  // const months = [
  //   ...new Set(
  //     orders.map((order) => {
  //       const monthIndex = new Date(parseInt((order._id).substring(0, 8), 16) * 1000).getMonth()
  //       const year = new Date(parseInt((order._id).substring(0, 8), 16) * 1000).getFullYear()
  //       if (monthIndex >= new Date().getMonth() -2 && year === new Date().getFullYear() && !undefined ){
  //          return monthNames[monthIndex]
  //          }       
  //       return null
  //     })
  //     .filter(Boolean)
  //   ),
  // ]


  // DEMO  DATA:
  const months = monthNames.filter((m, idx) => {   
     if (idx >= 6) return monthNames[idx]
  })



  // REAL DATA:
  // const totalPrices = dataBase(orders, { name: 'monthNames', data: monthNames })
  // const priceToShow = totalPrices.filter((p) => p.price > 0).map((p) => p.price) ;  


  // DEMO  DATA:
  const priceToShow = [7800, 8000, 10000]



  const data2 = {
    labels: months,
    datasets: [
      {
        label: '',
        data:priceToShow,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <section className="statistic">
      <div className="stat-card orders-status">
        <h3 className='bold'>Reservations status</h3>
        <div className="status-chart">
          <span>Approved</span> 
          <span className="active">{orders.filter(o => o.status === 'Approved').length}</span>
          <span>Rejected</span>  
          <span className="non-active">{orders.filter(o => o.status === 'Rejected').length}</span>
          <span>Pending</span> 
          <span>{orders.filter(o => o.status === 'Pending').length}</span>
          </div>
      </div>
      <div className="stat-card doughnut">
        <Doughnut data={data} options={doughnutOptions}/>
      </div>
      <div className="stat-card bar">
        <Bar options={barOptions} data={data2} />
      </div>
    </section>
  )
}
