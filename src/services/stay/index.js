const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeLorem } from '../util.service'

import { stayService as local } from './stay.service.local'
import { stayService as remote } from './stay.service.remote'

function getEmptyStay() {
    return {
        _id: '',
        name: makeLorem(3),
        type: '',
        imgUrls: ['https://robohash.org/0?set=set5', 'https://robohash.org/1?set=set5', 'https://robohash.org/2?set=set5', 'https://robohash.org/3?set=set5', 'https://robohash.org/4?set=set5'],
        summary: '',
        capacity: getRandomIntInclusive(0, 8),
        price: getRandomIntInclusive(80, 240),
        amenities: [],
        host: {},
        loc: {
            country: '',
            countryCode: '',
            city: '',
            address: '',
            lat: 0,
            lng: 0
        },
        msgs: [],
        // likedByUsers: [],
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        capacity: {
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0,
        },
        checkIn: null,
        checkOut: null
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const stayService = { getEmptyStay, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService
