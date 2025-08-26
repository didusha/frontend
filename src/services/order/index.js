const { DEV, VITE_LOCAL } = import.meta.env

import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

export const orderService = (VITE_LOCAL === 'true')? local : remote

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.orderService = orderService
