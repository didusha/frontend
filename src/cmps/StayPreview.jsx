import { Link } from 'react-router-dom'
import { ImgCarousel } from './ImgCarousel.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { formatDateRange } from '../services/util.service.js';


export function StayPreview({ stay, params }) {

    const paramsString = new URLSearchParams(params).toString()

    return <Link to={`/stay/${stay._id}?${paramsString}`}>
        <article className="stay-preview">
            <ImgCarousel imgUrls={stay.imgUrls} stayName={stay.name} />

            <div className="preview-info">
                <div className="preview-name ">{stay.name.charAt(0).toUpperCase() + stay.name.slice(1).toLowerCase()}</div>

                    <span className="preview-rate">
                        <span><FontAwesomeIcon icon={faStar} /></span>
                        {stay.rating} ({stay.reviews?.length})
                        </span>

                <div className="preview-stay-with grey">Stay with {stay.host.fullname} • Host for {9} years</div>
                {/* <div className=""></div> */}
                <div className="preview-dates grey">{formatDateRange(stay.startDate, stay.endDate)}</div>
                <div className="preview-price">
                    <span className="">$ {stay.price}</span><span className="grey"> night</span>
                </div>
            </div>
        </article>
    </Link>
}