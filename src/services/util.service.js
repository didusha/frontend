export function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

export function formatDateRange(startDateStr, endDateStr) {
  const start = new Date(startDateStr)
  const end = new Date(endDateStr)

  const options = { month: 'short', day: 'numeric' }

  // If the month is the same, only show month once
  if (start.getMonth() === end.getMonth()) {
    return `${start.toLocaleDateString('en-US', {
      month: 'short',
    })} ${start.getDate()}-${end.getDate()}`
  } else {
    return `${start.toLocaleDateString(
      'en-US',
      options
    )} - ${end.toLocaleDateString('en-US', options)}`
  }
}

export function getRandomFloat(min = 3, max = 5) {
  return Math.random() * (max - min) + min
}

export function getDayDiff(startDateStr, endDateStr) {
  const start = new Date(startDateStr)
  const end = new Date(endDateStr)

  // Difference in milliseconds
  const diffTime = end.getTime() - start.getTime()

  // Convert to days
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  return diffDays
}

export function formatDateCalendar(dateStr) {
  if (!dateStr || dateStr === 'null' || dateStr === 'undefined') return
    // return 'Add date'

  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return 
  // 'Add date'

  // dd/mm/yyyy format
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()

  return `${day}/${month}/${year}`
}

export function getRandomTimestampMillis(startYear = 2020, endYear = 2025) {
  const start = new Date(startYear, 0, 1).getTime()
  const end = new Date(endYear, 11, 31, 23, 59, 59).getTime()
  return Math.floor(Math.random() * (end - start) + start)
}

export function getAverageRating(reviews) {
  if (!reviews.length) return 0
  const total = reviews.reduce((sum, review) => sum + (+review.rate), 0)

    
  return (total / reviews.length).toFixed(1)
}


  export function dateFromTimestamp(date) {
    const reviewDate = new Date(date)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const monthName = months[reviewDate.getMonth()]
    const year = reviewDate.getFullYear()

    return { monthName, year }
  }

   export function dataBase(orders, datasets) {
      let data  
      if (datasets.name === 'labels') {
        data = datasets.data.reduce((acc, dataset) => {
          const labelPriceAmount = { name: dataset, amount: 0 }
          orders.forEach((order) => {
            if (order.stay.name === dataset) {
              labelPriceAmount.amount++
            }
          })
          acc.push(labelPriceAmount)
          return acc
        }, [])
      } else if (datasets.name === 'monthNames') {        
        data = datasets.data.reduce((acc, dataset, idx) => {
          const labelPriceAmount = { name: dataset, price: 0 }
          orders.forEach((order) => {
            const month = new Date(parseInt((order._id).substring(0, 8), 16)*1000).getMonth()
            const year = new Date(parseInt((order._id).substring(0, 8), 16)*1000).getFullYear()

            if (month === idx && order.status === 'Approved'&& year === new Date().getFullYear()) {
              labelPriceAmount.price += (+order.totalPrice)
            }     
          })
          labelPriceAmount.price = labelPriceAmount.price.toFixed(1)
          acc.push(labelPriceAmount)
          return acc
        }, [])
      }
      
      return data
    }


  export  function getDateFromObjectId(id) {
    const timestampHex = id.toString().substring(0, 8) 
    const timestamp = parseInt(timestampHex, 16) 
    const date = new Date(timestamp * 1000) 

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }



