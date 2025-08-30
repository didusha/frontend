import { Link } from 'react-router-dom'
import { ImgCarousel } from './ImgCarousel.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { formatDateRange, getRandomIntInclusive } from '../services/util.service.js';

  const randStartDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  const randEndDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)

export function StayPreview({ stay, params }) {

    const paramsString = new URLSearchParams(params).toString()

    return <Link to={`/stay/${stay._id}?${paramsString}`}>
        <article className="stay-preview">
            <ImgCarousel imgUrls={stay.imgUrls} stayName={stay.name} stayId={stay._id} />

            <div className="preview-info">
                <div className="preview-name">{stay.name.charAt(0).toUpperCase() + stay.name.slice(1).toLowerCase()}</div>
                {stay.reviews && <span className="preview-rate">
                    <span><FontAwesomeIcon icon={faStar} /></span>
                    {stay.rating} ({stay.reviews?.length})
                </span>}

                <div className="preview-stay-with grey">Stay with {stay.host.fullname} • Host for {getRandomIntInclusive(1, 10)} years</div>
                <div className="preview-dates grey">{formatDateRange(randStartDate, randEndDate)}</div>
                <div className="preview-price">
                    <span className="underline">${stay.price}</span><span className="grey"> night</span>
                </div>
            </div>
        </article>
    </Link>
}