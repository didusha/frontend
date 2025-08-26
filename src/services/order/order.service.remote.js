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

async function add({ txt, aboutUserId }) {
	return await httpService.post(`order`, { txt, aboutUserId })
}