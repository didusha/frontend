import {icons } from '../services/amenities.service.js'

export function StayAmenities({ labels }) {
  return (
    <section className="stay-amenities" id="amenities">
      <h2>What this place offers</h2>
      <ul className="amenities-list">
        {labels.map((label, idx) => {
          if (!icons[label]) return ""
          if (idx < 11)
          return (
            <li key={idx} className="icon flex">
              <img src={icons[label]} alt="" />
              <p className="label"> {label}</p>
            </li>
          )
        })}
        {labels.length > 10 && (
            <button className="labels-btn">
              Show all {labels.length} amenities
            </button>
          )
        }
      </ul>
    </section>
  )
}
