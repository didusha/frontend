import { Link } from 'react-router-dom'
import { ImgCarousel } from './ImgCarousel.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


export function StayPreview({ stay }) {


    return <Link to={`/stay/${stay._id}`}>
        <article className="stay-preview">
            {/* <img className="stay-img" src={stay.imgUrls?.[0]} alt="" /> */}
            <ImgCarousel imgUrls={stay.imgUrls} stayName={stay.name} />
            {/* <Link to={`/stay/${stay._id}`}>{stay.name}</Link> */}

            <div className="preview-info">
                <div className="preview-name bold">{stay.name}</div>
                <span className="preview-data-info flex">
                    <span className="preview-rate-icon">
                        <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className="preview-rate נםךג">{stay.rating}</span>
                </span>
                <div className="preview-stay-with">Stay with {stay.host.fullname}</div>
                <div className="preview-dates"></div>
                <div className="preview-price">
                    <span>$</span><span className="bold">{stay.price}</span> night
                </div>
            </div>
        </article>
    </Link>
}