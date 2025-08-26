import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, loadFromStorage, getRandomTimestampMillis} from '../util.service.js'
import { userService } from '../user'

const STORAGE_KEY = 'stay'

export const stayService = {
  query,
  getById,
  save,
  remove,
  addStayMsg,
  getRandomStay,
}
window.cs = stayService

async function query(filterBy = { txt: '', capacity: 1 }) {
  var stays = await storageService.query(STORAGE_KEY)
  const { txt, capacity } = filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    stays = stays.filter((stay) => regex.test(stay.loc.city))
  }
  if (capacity && capacity > 1) {
    stays = stays.filter((stay) => stay.capacity >= capacity)
  }

  // stays = stays.map(({ _id, name, price, host }) => ({ _id, name, price, host }))
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
    // console.log("🚀 ~ save ~ stay:", stay)
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            name: stay.name.charAt(0).toUpperCase() + stay.name.slice(1).toLowerCase(),
            type: stay.type,
            imgUrls: stay.imgUrls,
            summary: stay.summary,
            price: stay.price,
            capacity: stay.capacity,
            amenities: stay.amenities,
            host: stay.host,
            loc: stay.loc,
            msgs: stay.msgs,
            startDate: stay.startDate,
            endDate: stay.endDate,
            reviews:stay.reviews
        }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            name: stay.name.charAt(0).toUpperCase() + stay.name.slice(1).toLowerCase(),
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
            msgs: [],
            startDate: stay.startDate,
            endDate: stay.endDate,
            reviews:stay.reviews
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
    txt,
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}

function getRandomStay(_id = '') {
  const amenitiesList = [
    'TV',
    'Wifi',
    'Kitchen',
    'Smoking allowed',
    'Pets allowed',
    'Cooking basics',
  ]

  // Pick 2-4 random amenities
  const amenities = []
  const numAmenities = Math.floor(Math.random() * 5) + 2 // 2 to 4
  for (let i = 0; i < numAmenities; i++) {
    const randomAmenity =
      amenitiesList[Math.floor(Math.random() * amenitiesList.length)]
    if (!amenities.includes(randomAmenity)) amenities.push(randomAmenity)
  }

  // Random price and capacity
  const price = Math.floor(Math.random() * (200 - 20 + 1)) + 20 // 20–200
  const capacity = Math.floor(Math.random() * 8) + 1 // 1–8

  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() + 7) // 1 week from today
  startDate.setHours(0, 0, 0, 0) // reset time

  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 3) // 3 days later
  endDate.setHours(0, 0, 0, 0)

  const startDateStr = startDate.toISOString().split('T')[0] // "YYYY-MM-DD"
  console.log('🚀 ~ getRandomStay ~ startDateStr:', startDateStr)
  const endDateStr = endDate.toISOString().split('T')[0]

  return {
    name: makeLorem(3),
    price,
    amenities,
    type: 'House',
    summary: makeLorem(20),
    imgUrls: [
      'https://robohash.org/0?set=set5',
      'https://robohash.org/1?set=set5',
      'https://robohash.org/2?set=set5',
      'https://robohash.org/3?set=set5',
      'https://robohash.org/4?set=set5',
    ],
    capacity,
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    host: {
      _id: 'PH2sA',
      fullname: 'admin',
      imgUrl:
        'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    },
    msgs: [],
    startDate: startDateStr,
    endDate: endDateStr,
    reviews:getFakeReviews(5)
  }
}
  
function getFakeReviews(count = 5) {
  const names = ['Alice', 'Bob', 'Charlie', 'Dana', 'Eli', 'Fiona', 'George']
  const texts = [
    'Amazing place, highly recommended!',
    'Very helpful hosts. Cooked traditional...',
    'Great view and peaceful stay.',
    'Would definitely come back again!',
    'Cozy and clean, loved the vibes.',
  ]

  const reviews = []

  for (let i = 0; i < count; i++) {
    const rate = Math.floor(Math.random() * 5) + 1
    const name = names[i % names.length]
    const imgUrl = `https://robohash.org/${i}?set=set5`
    const txt = makeLorem(30)//texts[i % texts.length]

    reviews.push({
      id: `r${i + 1}`,
      txt,
      rate,
      date:getRandomTimestampMillis(),
      by: {
        _id: makeId(),
        fullname: name,
        imgUrl,
      },
    })
  }

  return reviews
}