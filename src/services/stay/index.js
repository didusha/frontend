const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeLorem } from '../util.service'

import { stayService as local } from './stay.service.local'
import { stayService as remote } from './stay.service.remote'

function getEmptyStay() {
  return {
    _id: '',
    name: '',
    type: '',
    imgUrls: [
      // 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-902946227708109581/original/5a6bd161-bd8e-4a64-a1d9-1a70655578e7.jpeg?im_w=1200',
      // 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/4cc97299-cc7f-4512-96f1-e4901800c349.jpg?im_w=720',
      // 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-902946227708109581/original/e895d31c-ec93-4da8-9537-53ba21ced52c.jpeg?im_w=720',
      // 'https://a0.muscache.com/im/pictures/miso/Hosting-902946227708109581/original/fed70a4f-0fe0-4016-a87f-f9adf682b684.jpeg?im_w=720',
      // 'https://a0.muscache.com/im/pictures/miso/Hosting-902946227708109581/original/6ef2fe81-f541-4c11-ada5-6c89fe8fb0aa.jpeg?im_w=720',
    ],
    summary: '',
    capacity: 0,
    price: 0,
    amenities: [],
    host: {},
    loc: {
      country: '',
      countryCode: '',
      city: '',
      address: '',
      lat: 0,
      lng: 0,
    },
    msgs: [],
    startDate: null,
    endDate: null,
    reviews: [],
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
    checkOut: null,
    hostId: null,
    type: null,
    dir: 1,
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const stayService = { getEmptyStay, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService
