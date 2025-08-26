import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBowlFood,
  faDog,
  faSmoking,
  faTv,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons'
import { faWifi } from '@fortawesome/free-solid-svg-icons'
import Kitchen from '../assets/images/Kitchen.svg'

export function StayAmenities({ labels }) {
  const labelToIcon = [
    { label: 'TV', icon: faTv },
    { label: 'Wifi', icon: faWifi },
    { label: 'Kitchen', icon: Kitchen },
    { label: 'Smoking allowed', icon: faSmoking },
    { label: 'Pets allowed', icon: faDog },
    { label: 'Cooking basics', icon: faBowlFood },
  ]
  const relevantFeatures = labelToIcon.filter((l) => labels.includes(l.label))

  return (
    <section className='stay-amenities' id='amenities'>
      <h2>What this place offers</h2>
      <ul className='amenities-list'>
        {relevantFeatures.map((feature, idx) => (
          <li key={idx} className='icon flex'>
           {<FontAwesomeIcon
              icon={feature.icon}
                style={{ width: '24px' , height:'24px'}}
            /> ||
             <img src={feature.icon} alt='' style={{ width: 20 }} />}
            {feature.label}
          </li>
        ))}
      </ul>
    </section>
  )
}
