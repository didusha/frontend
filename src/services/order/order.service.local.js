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

async function add({ txt, aboutUserId }) {
	const aboutUser = await userService.getById(aboutUserId)
	const orderToAdd = {
		txt,
		byUser: userService.getLoggedinUser(),
		aboutUser: {
			_id: aboutUser._id,
			fullname: aboutUser.fullname,
			imgUrl: aboutUser.imgUrl,
		},
	}

	orderToAdd.byUser.score += 10
	await userService.update(orderToAdd.byUser)

	const addedOrder = await storageService.post('order', orderToAdd)
	return addedOrder
}