import {
  makeId,
  makeLorem,
  loadFromStorage,
  getRandomTimestampMillis,
} from '../util.service.js'
import { storageService } from '../async-storage.service'
import { userService } from '../user'

export const orderService = {
  add,
  query,
  remove,
  save,
}

function query(filterBy) {
  return storageService.query('order')
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
    status: 'pending',
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

_create

async function _create() {
  const order = loadFromStorage('order') || [
    {
      _id: 'o1225',
      hostId: { _id: 'u102', fullname: 'bob', imgUrl: '...' },
      guest: {
        _id: 'u101',
        fullname: 'User 1',
      },
      totalPrice: 160,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 1,
        kids: 2,
      },
      stay: {
        // mini-stay
        _id: 'h102',
        name: 'House Of Uncle My',
        price: 80.0,
      },
      msgs: [], // host - guest chat
      status: 'pending', // approved / rejected
    },
  ]
  const addedOrder = await storageService.post('order', order)
}
