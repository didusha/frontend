import { makeId, makeLorem, loadFromStorage, getRandomTimestampMillis } from '../util.service.js'
import { storageService } from '../async-storage.service'
import { userService } from '../user'

export const orderService = {
	add,
	query,
	remove,
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
		},
		msgs: stay.msgs,
		status: 'pending',
	}
	const addedOrder = await storageService.post('order', orderToAdd)
	return addedOrder
}