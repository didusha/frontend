import { storageService } from '../async-storage.service.js'
import {
  makeId,
  makeLorem,
  loadFromStorage,
  getRandomTimestampMillis,
  saveToStorage,
} from '../util.service.js'
import { userService } from '../user'

const STORAGE_KEY = 'stay'
createStays()

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
      name:
        stay.name.charAt(0).toUpperCase() + stay.name.slice(1).toLowerCase(),
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
      reviews: stay.reviews,
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
      loc: {
        city: stay.loc.city,
        address: stay.loc.address,
        country: stay.loc.country,
      },
      // Later, host is set by the backend
      host: userService.getLoggedinUser(),
      msgs: [],
      startDate: stay.startDate,
      endDate: stay.endDate,
      reviews: stay.reviews,
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
  const amenities = []
  const numAmenities = Math.floor(Math.random() * 5) + 2 // 2 to 4
  for (let i = 0; i < numAmenities; i++) {
    const randomAmenity =
      amenitiesList[Math.floor(Math.random() * amenitiesList.length)]
    if (!amenities.includes(randomAmenity)) amenities.push(randomAmenity)
  }

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
    summary: makeLorem(200),
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
    reviews: getFakeReviews(5),
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
    const txt = makeLorem(30) //texts[i % texts.length]

    reviews.push({
      id: `r${i + 1}`,
      txt,
      rate,
      date: getRandomTimestampMillis(),
      by: {
        _id: makeId(),
        fullname: name,
        imgUrl,
      },
    })
  }

  return reviews
}

function createStays() {
  const stays = loadFromStorage(STORAGE_KEY) ||
   [
    {
      _id: '6738ca4cae769d402b653c7c',
      name: 'Penthouse Sands of Kahana Sandy Swimmable Beach',
      type: 'Beach',
      imgUrls: [
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-902946227708109581/original/5a6bd161-bd8e-4a64-a1d9-1a70655578e7.jpeg?im_w=1200',
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/4cc97299-cc7f-4512-96f1-e4901800c349.jpg?im_w=720',
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-902946227708109581/original/e895d31c-ec93-4da8-9537-53ba21ced52c.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-902946227708109581/original/fed70a4f-0fe0-4016-a87f-f9adf682b684.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-902946227708109581/original/6ef2fe81-f541-4c11-ada5-6c89fe8fb0aa.jpeg?im_w=720',
      ],
      price: 800,
      summary:
        "Price includes nightly rate & 14.42% tax.  Our fully remodeled 9th floor Penthouse unit offers the most amazing views.  The entire front of the condo is windows offering you a fantastic view of beautiful Pacific Ocean, Molokai & Lana'i.  Perfect location for watching beautiful sunsets, see our resident sea turtles & an excellent place for spotting whales during the whale migration season. This spacious two level 3 bedroom and 3 full bath Penthouse unit has over 2,050 sq ft of living space w/ AC.",
      capacity: 9,
      amenities: [
        'TV',
        'Cable TV',
        'Internet',
        'Wifi',
        'Air conditioning',
        'Pool',
        'Kitchen',
        'Free parking on premises',
        'Gym',
        'Elevator',
        'Hot tub',
        'Family/kid friendly',
        'Washer',
        'Dryer',
        'Smoke detector',
        'Carbon monoxide detector',
        'First aid kit',
        'Safety card',
        'Fire extinguisher',
        'Essentials',
        'Shampoo',
        'Lock on bedroom door',
        '24-hour check-in',
        'Hangers',
        'Hair dryer',
        'Iron',
        'Laptop friendly workspace',
        'Self check-in',
        'Building staff',
        'Private entrance',
        'Bathtub',
        'Baby bath',
        'High chair',
        'Children’s books and toys',
        'Crib',
        'Pack ’n Play/travel crib',
        'Children’s dinnerware',
        'Hot water',
        'Bed linens',
        'Extra pillows and blankets',
        'Microwave',
        'Coffee maker',
        'Refrigerator',
        'Dishwasher',
        'Dishes and silverware',
        'Cooking basics',
        'Oven',
        'Stove',
        'BBQ grill',
        'Patio or balcony',
        'Beach essentials',
        'Step-free access',
        'Disabled parking spot',
        'Step-free access',
        'Step-free access',
        'Step-free access',
        'Beachfront',
        'Pool with pool hoist',
      ],
      bathrooms: 3,
      bedrooms: 3,
      roomType: 'Entire home/apt',
      host: {
        _id: '673f1b4450b320833d20eaa2',
        fullname: 'Sophia Brown',
        location: 'Tokyo, Japan',
        about: 'Love to travel and meet interesting people!',
        responseTime: 'within 2 hours',
        isSuperhost: false,
        imgUrl:
          // 'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
          'https://img.freepik.com/free-photo/portrait-young-woman-white-shirt_1303-24912.jpg?uid=R108235284&ga=GA1.1.1545684031.1710792691',
      },
      loc: {
        country: 'Costa Rica',
        countryCode: 'CR',
        city: 'Lagunas',
        address: 'Lagunas, Puntarenas Province, Costa Rica',
        lat: 9.2672,
        lng: -83.8614,
      },
      startDate: '2025-09-03T22:00:00.000Z',
      endDate: '2025-09-11T22:00:00.000Z',
      reviews: [
        {
          date: '2017-04-28T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'This place was beyond my expectations. There were no hidden surprises. Knew exactly what to expect, and Cynthia was always there to answer any quesions. The view is spectacular. Beautiful location. I highly recommend this place.',
          _id: '6738cd7776b53ebe35368b26',
          rate: 5,
        },
        {
          date: '2017-07-29T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'Very nice location with good beach. Penthouse is nice sized and comfortable. Amenities are good. Location is very good with close proximity to Lahaina and Kapalua.',
          _id: '6738cd7776b53ebe35369b37',
          rate: 3,
        },
        {
          date: '2017-11-03T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: "If you want a one-stop, stress-free vacation, in a beautiful location with all the amenities you need....this is it!  We lucked out with perfect weather too.  Cynthia provides basic amenities, pool towels, bookie boards, snorkeling gear, and the comfort of being in a cozy home.  It was really easy to run up to the Condo for my 9-month old nap times or a quick snack, without being too separated from the family.  The onsite pools, restaurant and of course restaurant/bar became our home bases for the week.  Miso Phat Sushi (across the street) and Maui Brewing were awesome near-by/within walking distance restaurants.  My family and I can't stop bragging about our trip and what a wonderful family/group set-up this Condo is!  We recommend renting a car due to the distance from the airport, but the Condo/Resort has onsite parking.",
          _id: '6738cd7776b53ebe35369b28',
          rate: 5,
        },
        {
          date: '2018-01-30T05:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'Such a beautiful location in Paradise! The amazing balconies provided us with gathering spots for our morning coffee to watch the whales and gorgeous sunsets each evening. During our week long stay, we decided to visit Costco, the local fish market and the farmers market and ate 4 dinners in the condo.  The kitchen has everything you need, and the barbques downstairs were perfect for grilling.  Cynthia left us plenty of information for dining in the vicinity, so we had 3 nice dinners out. The guide she sent us before our visit was very informative and helped us to plan our outings while in Maui. Cynthia also checked in with us during our visit, making sure we had everything we needed. We are already planning a return visit to #391 at the Sands of Kahana in the near future!',
          _id: '6738cd7776b53ebe35369b29',
          rate: 3,
        },
        {
          date: '2018-03-24T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: "We had such a great time at Cynthia's condo.  Everything was sparkling clean. The check in and check out were seamless.  We loved that the condo came with some beach gear for our use (snorkels, boogie boards, water shoes...).  The views from the balconies are outstanding.  There is a nice and swimmable beach right downstairs, as well as a volleyball court and a casual restaurant. Great location with easy access to beach rentals, groceries, and anything else you might need during your stay.  Cynthia was very quick to respond to any questions we had. Loved the place! Would definitely stay again.",
          _id: '6738cd7776b53ebe35369b77',
          rate: 2,
        },
        {
          date: '2018-04-14T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: "This place was incredible. From the views to the thoughtfulness in everything in the condo. While climbing nine flights of stairs during an unexpected elevator renovation (that ends in May!) does not sound fun, it was actually not bad at all for the adults in our party, as well as the 3 sub-8 year old children, and allowed us to think we were earning all the delicious calories we ate and drank.\n\nI cannot rave enough about the amenities that are incredibly family friendly, including a full sized high chair, travel crib, toddler (and big kid) friendly toys for both indoors and at the beach. Cynthia is very quick to respond to communication and is clear as to what she can provide as a host, as well as her expectation of guests. She was as incredible as her Kahana home was and we'd highly recommend this place for anyone, including those with small children.",
          _id: '6738cd7776b53ebe35369b80',
          rate: 1,
        },
        {
          date: '2018-05-19T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'This place is amazing. We will be back!',
          _id: '6738cd7776b53ebe35369b20',
          rate: 2,
        },
      ],
      likedByUsers: [],
      availableDates: [
        {
          start: '2025-02-28T22:00:00.000Z',
          end: '2030-12-31T00:00:00.000Z',
        },
      ],
      rating: 4.9,
      isGuestFavorite: false,
    },
    {
      _id: '6738ca4cae769d402b653c7e',
      name: 'Grand apartment Sagrada Familia',
      type: 'Beach',
      imgUrls: [
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-704198223014647302/original/63e35b93-370e-4f41-b70a-69c1a27ff4b2.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-704198223014647302/original/1408cf55-9143-4f1c-98cc-488f9f6e22e9.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-704198223014647302/original/7a002051-bcae-4d37-876f-c6319b984ab8.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-704198223014647302/original/e28f06b6-88b3-4b11-8d37-a284d018cff6.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-704198223014647302/original/b4a1eba6-5485-4cbf-9176-85d91a2c6097.jpeg?im_w=1200',
      ],
      price: 169,
      summary:
        '4 rooms apartment in the heart of the right “Eixample” broadening. Perfect location in the notorious area of Sagrada Familia that will ensure and unforgettable stay in Barcelona. HUTB-003275',
      capacity: 8,
      amenities: [
        'TV',
        'Internet',
        'Wifi',
        'Air conditioning',
        'Kitchen',
        'Paid parking off premises',
        'Smoking allowed',
        'Buzzer/wireless intercom',
        'Family/kid friendly',
        'Washer',
        'Dryer',
        'Essentials',
        'Shampoo',
        'Hangers',
        'Hair dryer',
        'Iron',
        'Laptop friendly workspace',
        'Hot water',
        'Host greets you',
      ],
      bathrooms: 2,
      bedrooms: 4,
      startDate: '2025-09-03T22:00:00.000Z',
      endDate: '2025-09-11T22:00:00.000Z',
      roomType: 'Entire home/apt',
      host: {
        _id: '673f1b4250b320833d20ea99',
        fullname: 'Lily Taylor',
        location: 'Berlin, Germany',
        about: 'Enjoys hiking and outdoor adventures.',
        responseTime: 'within a day',
        isSuperhost: false,
        imgUrl:
          'https://img.freepik.com/free-photo/portrait-young-woman-white-shirt_1303-24912.jpg?uid=R108235284&ga=GA1.1.1545684031.1710792691',
      },
      loc: {
        country: 'Greece',
        countryCode: 'GR',
        city: 'Gialos',
        address: 'Gialos, Symi, Dodecanese',
        lat: 36.6161,
        lng: 27.8427,
      },
      reviews: [
        {
          date: '2017-04-28T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'This place was beyond my expectations. There were no hidden surprises. Knew exactly what to expect, and Cynthia was always there to answer any quesions. The view is spectacular. Beautiful location. I highly recommend this place.',
          _id: '6738cd7776b53ebe85369b26',
          rate: 2,
        },
        {
          date: '2017-07-29T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'Very nice location with good beach. Penthouse is nice sized and comfortable. Amenities are good. Location is very good with close proximity to Lahaina and Kapalua.',
          _id: '6738cd7776b53ebe35367b26',
          rate: 3,
        },
        {
          date: '2017-11-03T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: "If you want a one-stop, stress-free vacation, in a beautiful location with all the amenities you need....this is it!  We lucked out with perfect weather too.  Cynthia provides basic amenities, pool towels, bookie boards, snorkeling gear, and the comfort of being in a cozy home.  It was really easy to run up to the Condo for my 9-month old nap times or a quick snack, without being too separated from the family.  The onsite pools, restaurant and of course restaurant/bar became our home bases for the week.  Miso Phat Sushi (across the street) and Maui Brewing were awesome near-by/within walking distance restaurants.  My family and I can't stop bragging about our trip and what a wonderful family/group set-up this Condo is!  We recommend renting a car due to the distance from the airport, but the Condo/Resort has onsite parking.",
          _id: '6738cd7776b53efe35369b26',
          rate: 4,
        },
        {
          date: '2018-01-30T05:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'Such a beautiful location in Paradise! The amazing balconies provided us with gathering spots for our morning coffee to watch the whales and gorgeous sunsets each evening. During our week long stay, we decided to visit Costco, the local fish market and the farmers market and ate 4 dinners in the condo.  The kitchen has everything you need, and the barbques downstairs were perfect for grilling.  Cynthia left us plenty of information for dining in the vicinity, so we had 3 nice dinners out. The guide she sent us before our visit was very informative and helped us to plan our outings while in Maui. Cynthia also checked in with us during our visit, making sure we had everything we needed. We are already planning a return visit to #391 at the Sands of Kahana in the near future!',
          _id: '6738cd7776b53eke35369b26',
          rate: 5,
        },
        {
          date: '2018-03-24T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: "We had such a great time at Cynthia's condo.  Everything was sparkling clean. The check in and check out were seamless.  We loved that the condo came with some beach gear for our use (snorkels, boogie boards, water shoes...).  The views from the balconies are outstanding.  There is a nice and swimmable beach right downstairs, as well as a volleyball court and a casual restaurant. Great location with easy access to beach rentals, groceries, and anything else you might need during your stay.  Cynthia was very quick to respond to any questions we had. Loved the place! Would definitely stay again.",
          _id: '6738cd7776b53eme35369b26',
          rate: 1,
        },
        {
          date: '2018-04-14T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: "This place was incredible. From the views to the thoughtfulness in everything in the condo. While climbing nine flights of stairs during an unexpected elevator renovation (that ends in May!) does not sound fun, it was actually not bad at all for the adults in our party, as well as the 3 sub-8 year old children, and allowed us to think we were earning all the delicious calories we ate and drank.\n\nI cannot rave enough about the amenities that are incredibly family friendly, including a full sized high chair, travel crib, toddler (and big kid) friendly toys for both indoors and at the beach. Cynthia is very quick to respond to communication and is clear as to what she can provide as a host, as well as her expectation of guests. She was as incredible as her Kahana home was and we'd highly recommend this place for anyone, including those with small children.",
          _id: '6738cd7776b53ele35369b26',
          rate: 3,
        },
        {
          date: '2018-05-19T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'This place is amazing. We will be back!',
          _id: '6738cd7776b53ebk5369b26',
          rate: 5,
        },
      ],
      likedByUsers: [],
      availableDates: [
        {
          start: '2025-02-28T22:00:00.000Z',
          end: '2030-12-31T00:00:00.000Z',
        },
      ],

      rating: '4.6',
      isGuestFavorite: true,
    },
    {
      _id: '6738ca4cae769d402b653c7f',
      name: 'Spacious and quiet duplex apartment in Poble Sec',
      type: 'Beach',
      imgUrls: [
        'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzU4NjgwMDI%3D/original/cf864160-4a98-4a78-9714-a061e00b297c.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzU4NjgwMDI%3D/original/371ac3c8-cbb1-4240-8e02-8c80732fb6a1.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzU4NjgwMDI%3D/original/84b524ab-5f7f-436e-877a-679e41b0caad.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzU4NjgwMDI%3D/original/791d84c3-49af-4b80-a0a0-59d8853c4715.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzU4NjgwMDI%3D/original/31cc0af2-bac2-4858-9387-f0b9c16b052e.jpeg?im_w=1200',
      ],
      price: 130,
      summary:
        'Spacious apartment in a peculiar building in the central neighbourhood of Poble Sec, with patio and terrace, ideal for families with children or groups. Walking distance from center, Montjuïc, Plaza España, Fira Montjuïc/Gran Vía, Sant Antoni, Raval.',
      capacity: 7,
      amenities: [
        'TV',
        'Cable TV',
        'Internet',
        'Wifi',
        'Air conditioning',
        'Kitchen',
        'Paid parking off premises',
        'Buzzer/wireless intercom',
        'Heating',
        'Family/kid friendly',
        'Washer',
        'Smoke detector',
        'Carbon monoxide detector',
        'First aid kit',
        'Safety card',
        'Fire extinguisher',
        'Essentials',
        'Shampoo',
        '24-hour check-in',
        'Hangers',
        'Hair dryer',
        'Iron',
        'Laptop friendly workspace',
        'Outlet covers',
        'Bathtub',
        'High chair',
        'Stair gates',
        'Children’s books and toys',
        'Crib',
        'Pack ’n Play/travel crib',
        'Room-darkening shades',
        'Children’s dinnerware',
        'Hot water',
        'Bed linens',
        'Extra pillows and blankets',
        'Ethernet connection',
        'Microwave',
        'Coffee maker',
        'Refrigerator',
        'Dishwasher',
        'Dishes and silverware',
        'Cooking basics',
        'Oven',
        'Stove',
        'Patio or balcony',
        'Luggage dropoff allowed',
        'Long term stays allowed',
        'Wide doorway',
        'Well-lit path to entrance',
        'Wide entryway',
        'Host greets you',
      ],
      bathrooms: 2,
      bedrooms: 3,
      startDate: '2025-09-03T22:00:00.000Z',
      endDate: '2025-09-11T22:00:00.000Z',
      roomType: 'Entire home/apt',
      host: {
        _id: '673f1b4250b320833d20ea99',
        fullname: 'Lily Taylor',
        location: 'Berlin, Germany',
        about: 'Enjoys hiking and outdoor adventures.',
        responseTime: 'within a day',
        isSuperhost: false,
        imgUrl:
          'https://img.freepik.com/free-photo/portrait-young-woman-white-shirt_1303-24912.jpg?uid=R108235284&ga=GA1.1.1545684031.1710792691',
      },
      loc: {
        country: 'Greece',
        countryCode: 'GR',
        city: 'Santorini',
        address: 'Santorini, Cyclades, Greece',
        lat: 36.3932,
        lng: 25.4615,
      },
      reviews: [
        {
          date: '2017-04-28T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'This place was beyond my expectations. There were no hidden surprises. Knew exactly what to expect, and Cynthia was always there to answer any quesions. The view is spectacular. Beautiful location. I highly recommend this place.',
          _id: '6738cd7776b83ebe35369b26',
          rate: 5,
        },
        {
          date: '2017-07-29T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'Very nice location with good beach. Penthouse is nice sized and comfortable. Amenities are good. Location is very good with close proximity to Lahaina and Kapalua.',
          _id: '6738cd7726b53ebe35369b26',
          rate: 2,
        },
        {
          date: '2017-11-03T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: "If you want a one-stop, stress-free vacation, in a beautiful location with all the amenities you need....this is it!  We lucked out with perfect weather too.  Cynthia provides basic amenities, pool towels, bookie boards, snorkeling gear, and the comfort of being in a cozy home.  It was really easy to run up to the Condo for my 9-month old nap times or a quick snack, without being too separated from the family.  The onsite pools, restaurant and of course restaurant/bar became our home bases for the week.  Miso Phat Sushi (across the street) and Maui Brewing were awesome near-by/within walking distance restaurants.  My family and I can't stop bragging about our trip and what a wonderful family/group set-up this Condo is!  We recommend renting a car due to the distance from the airport, but the Condo/Resort has onsite parking.",
          _id: '6738cd7176b53ebe35369b26',
          rate: 2,
        },
        {
          date: '2018-01-30T05:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'Such a beautiful location in Paradise! The amazing balconies provided us with gathering spots for our morning coffee to watch the whales and gorgeous sunsets each evening. During our week long stay, we decided to visit Costco, the local fish market and the farmers market and ate 4 dinners in the condo.  The kitchen has everything you need, and the barbques downstairs were perfect for grilling.  Cynthia left us plenty of information for dining in the vicinity, so we had 3 nice dinners out. The guide she sent us before our visit was very informative and helped us to plan our outings while in Maui. Cynthia also checked in with us during our visit, making sure we had everything we needed. We are already planning a return visit to #391 at the Sands of Kahana in the near future!',
          _id: '6738cd7773b53ebe35369b26',
          rate: 4,
        },
        {
          date: '2018-03-24T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: "We had such a great time at Cynthia's condo.  Everything was sparkling clean. The check in and check out were seamless.  We loved that the condo came with some beach gear for our use (snorkels, boogie boards, water shoes...).  The views from the balconies are outstanding.  There is a nice and swimmable beach right downstairs, as well as a volleyball court and a casual restaurant. Great location with easy access to beach rentals, groceries, and anything else you might need during your stay.  Cynthia was very quick to respond to any questions we had. Loved the place! Would definitely stay again.",
          _id: '6738kd7776b53ebe35369b26',
          rate: 2,
        },
        {
          date: '2018-04-14T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: "This place was incredible. From the views to the thoughtfulness in everything in the condo. While climbing nine flights of stairs during an unexpected elevator renovation (that ends in May!) does not sound fun, it was actually not bad at all for the adults in our party, as well as the 3 sub-8 year old children, and allowed us to think we were earning all the delicious calories we ate and drank.\n\nI cannot rave enough about the amenities that are incredibly family friendly, including a full sized high chair, travel crib, toddler (and big kid) friendly toys for both indoors and at the beach. Cynthia is very quick to respond to communication and is clear as to what she can provide as a host, as well as her expectation of guests. She was as incredible as her Kahana home was and we'd highly recommend this place for anyone, including those with small children.",
          _id: '6733cd7776b53ebe35369b26',
          rate: 2,
        },
        {
          date: '2018-05-19T04:00:00.000Z',
          by: {
            fullname: 'Sophia',
            imgUrl:
              'https://img.freepik.com/free-photo/portrait-young-woman-blue-denim-jacket-listening-music-earphone-through-mobile-phone_23-2148148191.jpg?t=st=1732053341~exp=1732056941~hmac=905d994e317d752feea2e5f658bda82a6a3df861cf786a476cca0a127cb2835b&w=740',
            _id: '673f1b4450b320833d20eaa2',
          },
          txt: 'This place is amazing. We will be back!',
          _id: '6238cd7776b53ebe35369b26',
          rate: 3,
        },
      ],
      likedByUsers: [],

      availableDates: [
        {
          start: '2025-02-28T22:00:00.000Z',
          end: '2030-12-31T00:00:00.000Z',
        },
      ],

      rating: '4.7',
      isGuestFavorite: true,
    },
  ]
  saveToStorage(STORAGE_KEY, stays)
}
