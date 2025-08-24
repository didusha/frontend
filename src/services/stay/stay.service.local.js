
import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, loadFromStorage } from '../util.service.js'
import { userService } from '../user'

const STORAGE_KEY = 'stay'


export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg
}
window.cs = stayService


async function query(filterBy = { txt: '', minPrice: 0 }) {
    var stays = await storageService.query(STORAGE_KEY)
    const { txt, minPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.name) || regex.test(stay.description))
    }
    if (minPrice) {
        stays = stays.filter(stay => stay.price >= minPrice)
    }
    if (sortField === 'name') {
        stays.sort((stay1, stay2) =>
            stay1[sortField].localeCompare(stay2[sortField]) * +sortDir)
    }
    if (sortField === 'price') {
        stays.sort((stay1, stay2) =>
            (stay1[sortField] - stay2[sortField]) * +sortDir)
    }

    stays = stays.map(({ _id, name, price, host }) => ({ _id, name, price, host }))
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            name: stay.name,
            type: stay.type,
            imgUrls: stay.imgUrls,
            summary: stay.summary,
            price: stay.price,
            capacity: stay.capacity,
            amenities: stay.amenities,
            host: stay.host,
            loc: stay.loc,
            msgs: stay.msgs,
        }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            name: stay.name,
            price: stay.price,
            type: stay.type,
            imgUrls: stay.imgUrls,
            summary: stay.summary,
            price: stay.price,
            capacity: stay.capacity,
            amenities: stay.amenities,
            loc: stay.loc,
            // Later, host is set by the backend
            host: userService.getLoggedinUser(),
            msgs: []
        }
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}


// function getRandomStay(_id = '',) {
//     const amenitiesList = ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics']

//     const amenities = amenitiesList[Math.floor(Math.random() * names.length)]

//     return {
//         _id,
//         name: makeLorem(3),
//         price: utilService.getRandomIntInclusive(20, 200),
//         amenities: amenities,
//         type: 'House',
//         summary: makeLorem(20),
//         imgUrl: ['https://robohash.org/0?set=set5', 'https://robohash.org/1?set=set5', 'https://robohash.org/2?set=set5', 'https://robohash.org/3?set=set5', 'https://robohash.org/4?set=set5'],
//         capacity: utilService.getRandomIntInclusive(1, 8),
//         loc: {
//             country: 'Portugal',
//             countryCode: 'PT',
//             city: 'Lisbon',
//             address: '17 Kombo st',
//             lat: -8.61308,
//             lng: 41.1413,
//         },
//         host: {
//             _id: 'PH2sA',
//             fullname: 'admin',
//             imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
//         },


//     }
// }