import { Link } from 'react-router-dom'
import { ImgCarousel } from './ImgCarousel.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


export function StayPreview({ stay }) {


    return <article className="stay-preview">
        {/* <img className="stay-img" src={stay.imgUrls?.[0]} alt="" /> */}
        <ImgCarousel imgUrls={stay.imgUrls} stayName={stay.name} />
        <Link to={`/stay/${stay._id}`}>{stay.name}</Link>

        <div class="preview-info">
            <div class="preview-name bold">{stay.name}</div>
            <span class="preview-data-info flex">
                <span class="preview-rate-icon">
                    <FontAwesomeIcon icon={faStar} />
                </span>
                <span class="preview-rate">{stay.rating}</span>
            </span>
            <div class="preview-stay-with">Stay with {stay.host.fullname}</div>
            <div class="preview-dates"></div>
            <div class="preview-price">
                <span>$</span><span class="bold">{stay.price}</span> night
            </div>
        </div>


    </article>
}