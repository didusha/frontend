import {
  makeId,
  makeLorem,
  loadFromStorage,
  getRandomTimestampMillis,
} from '../util.service.js'
import { storageService } from '../async-storage.service'
import { userService } from '../user'
import { sortBy } from 'lodash'

export const orderService = {
  add,
  query,
  remove,
  save,
}

async function query(filterBy) {
  console.log(filterBy)
  try {
    let orders = await storageService.query('order')    
    if (filterBy.sort.type === 'startDate') {
      orders = orders.sort((o1, o2) => {
        const d1 = new Date(o1.startDate).getTime()
        const d2 = new Date(o2.startDate).getTime()
        return (d1 - d2) * filterBy.sort.dir
      })
    }
    if (filterBy.sort.type === 'endDate') {
      orders = orders.sort((o1, o2) => {
        const d1 = new Date(o1.endDate).getTime()
        const d2 = new Date(o2.endDate).getTime()
        return (d1 - d2) * filterBy.sort.dir
      })
    }
    if (filterBy.sort.type === 'createdAt') {
      orders = orders.sort((o1, o2) => {
        const d1 = new Date(o1.createdAt).getTime()
        const d2 = new Date(o2.createdAt).getTime()
        return (d1 - d2) * filterBy.sort.dir
      })
    }
    if (filterBy.sort.type === 'capacity') {
      orders = orders.sort(
        (o1, o2) => (o1.capacity - o2.capacity) * filterBy.sort.dir
      )
    }
    if (filterBy.sort.type === 'totalPrice') {
      orders = orders.sort(
        (o1, o2) => (o1.totalPrice - o2.totalPrice) * filterBy.sort.dir
      )
    }
    if (filterBy.sort.type === 'status') {
      orders = orders.sort(
        (o1, o2) => o1.status.localeCompare(o2.status) * filterBy.sort.dir
      )
    }
    if (filterBy.sort.type === 'stay') {
      orders = orders.sort(
        (o1, o2) => o1.stay.name.localeCompare(o2.stay.name) * filterBy.sort.dir
      )
    }
    // console.log( orders);

    return orders
  } catch (error) {}
}

async function remove(orderId) {
  await storageService.remove('order', orderId)
}

async function add(stay, order) {
  const orderToAdd = {
    _id: makeId(),
    host: stay.host,
    guest: userService.getLoggedinUser(),
    totalPrice: order.totalPrice,
    startDate: new Date(order.checkIn),
    endDate: new Date(order.checkOut),
    guests: {
      adults: order.adults,
      children: order.children,
      infants: order.infants,
      pets: order.pets,
    },
    stay: {
      _id: stay._id,
      name: stay.name,
      price: stay.price,
      imgUrls: stay.imgUrls,
    },
    createAt: new Date(),
    msgs: stay.msgs,
    status: 'Pending',
  }
  const addedOrder = await storageService.post('order', orderToAdd)
  return addedOrder
}

async function save(order) {
  try {
    const savedOrder = await storageService.put('order', order)
    return savedOrder
  } catch (err) {
    throw err
  }
}
