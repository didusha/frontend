import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

export function Charts({orders}) {

  const labels = [...new Set(orders.map((o) => o.stay.name))]
  function price(orders) {
    // console.log(orders);
    const labels = [...new Set(orders.map((o) => o.stay.name))]
    // console.log('lab', labels)

    const prices = labels.reduce((acc, label) => {
      const labelPriceAmount = { name: label, price: 0 }
      orders.forEach((order) => {
        if (order.stay.name === label) {
          labelPriceAmount.price += +order.totalPrice
        }
      })
      labelPriceAmount.price = labelPriceAmount.price.toFixed(1)
    //   console.log(labelPriceAmount)
      acc.push(labelPriceAmount)
      return acc
    }, [])

    return prices
  }
const prices = price(orders)
  ChartJS.register(ArcElement, Tooltip, Legend)

  const data = {
    labels: [...new Set(orders.map((o) => o.stay.name))],
    datasets: [
      {
        label: '',
        data: prices.map(price=>price.price), 
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

  return <Doughnut data={data} />
}
