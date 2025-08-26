
import { icons } from '../services/amenities.service.js'



export function StayAmenities({ labels }) {

  
  return (
    <section className='stay-amenities' id='amenities'>
      <h2>What this place offers</h2>
      <ul className='amenities-list'>
        {labels.map((label, idx) => {
          return (
            <li key={idx} className='icon flex'>
              <img src={icons[label]} alt="" />  
              {label}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
