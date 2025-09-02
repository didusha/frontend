import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
	remove,
	update,
	getLoggedinUser,
	saveLoggedinUser,
}

function getUsers() {
	return httpService.get(`user`)
}

async function getById(userId) {
	const user = await httpService.get(`user/${userId}`)
	return user
}

function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update(user) {
	const updatedUser = await httpService.put(`user/${user._id}`, user)

	if (updatedUser) {
		const loggedinUser = getLoggedinUser() 
		if (loggedinUser._id === updatedUser._id) saveLoggedinUser(updatedUser)
	}

	return updatedUser
}

async function login(userCred) {
	try {
		const user = await httpService.post('auth/login', userCred)
		if (user) return saveLoggedinUser(user)
	} catch (err) {
		throw err
	}


}

async function signup(userCred) {
	try {
		if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
		const user = await httpService.post('auth/signup', userCred)
		return saveLoggedinUser(user)
	} catch (err) {
		throw err
	}
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	user = {
		_id: user._id,
		fullname: user.fullname,
		imgUrl: user.imgUrl,
		isHost: user.isHost,
		wishlist: user.wishlist
	}
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}
