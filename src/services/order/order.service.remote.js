import { httpService } from '../http.service'

export const orderService = {
	add,
	query,
	remove,
}

function query(filterBy) {
	var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
	return httpService.get(`order${queryStr}`)
}

async function remove(orderId) {
	await httpService.delete(`order/${orderId}`)
}

async function add({ stay, order }) {
	const orderToAdd = {
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
		  imgUrls:stay.imgUrls
		},
		msgs: stay.msgs,
		status: 'pending',
		createdAt: order.createdAt,
	  }
	return await httpService.post(`order`, {orderToAdd })
}