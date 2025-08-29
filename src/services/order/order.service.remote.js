import { httpService } from '../http.service'

export const orderService = {
	add,
	query,
	remove,
}

function query(filterBy) {
	console.log("🚀 ~ query ~ filterBy:", filterBy)
	var queryStr = !filterBy ? '' : `?hostId=${filterBy.hostId}&sort=anaAref`
	console.log("🚀 ~ query ~ queryStr:", queryStr)
	return httpService.get(`order${queryStr}`)
	// return httpService.get(`order`)
}

async function remove(orderId) {
	await httpService.delete(`order/${orderId}`)
}

async function add(stay, order) {
	const user = userService.getLoggedinUser()
	// console.log("🚀 ~ add ~ stay:", stay)
	const orderToAdd = {
		host:{
			_id: stay.host._id,
			fullname: stay.host.fullname,
			pictureUrl: stay.host.pictureUrl,
		},
		guest: {
			_id: user._id,
			fullname: user.fullname,
		},
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
			imgUrls: stay.imgUrls
		},
		msgs: stay.msgs,
		status: 'pending',
	}
	return await httpService.post(`order`, { order: orderToAdd })
}