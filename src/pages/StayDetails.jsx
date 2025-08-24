import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay'
import { useState } from 'react'

export function StayDetails() {
  const { stayId } = useParams()
  const [stay, setStay] = useState()


  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

    async function loadStay(stayId) {
      try {
        const stay = await stayService.getById(stayId)
        setStay(stay)
      } catch (err) {
        console.log('Cannot load stay', err)
        showErrorMsg ('Cannot load stay')
      }
    }
  

  return (
    <section className='stay-details'>
      <Link to='/stay'>Back to list</Link>
      <h1>Stay Details</h1>
      {stay && (
        <div>
          <h3>{stay.name}</h3>
          <h4>{stay.price} KMH</h4>
          <pre> {JSON.stringify(stay, null, 2)} </pre>
        </div>
      )}
      <button
        onClick={() => {
          onAddStayMsg(stay._id)
        }}
      >
        Add stay msg
      </button>
    </section>
  )
}
