import { Link } from 'react-router-dom'
import { ImgCarousel } from './ImgCarousel.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


export function StayPreview({ stay }) {

    function formatDateRange(startDateStr, endDateStr) {
        const start = new Date(startDateStr)
        const end = new Date(endDateStr)

        const options = { month: 'short', day: 'numeric' }

        // If the month is the same, only show month once
        if (start.getMonth() === end.getMonth()) {
            return `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()}-${end.getDate()}`
        } else {
            return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
        }
    }

    return <Link to={`/stay/${stay._id}`}>
        <article className="stay-preview">
            <ImgCarousel imgUrls={stay.imgUrls} stayName={stay.name} />

            <div className="preview-info">
                <div className="preview-name bold">{stay.name}</div>
                <span className="preview-data-info flex">
                    <span className="preview-rate-icon">
                        <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className="preview-rate bold">{stay.rating}</span>
                </span>
                <div className="preview-stay-with grey">Stay with {stay.host.fullname} - Host for {9} years</div>
                {/* <div className=""></div> */}
                <div className="preview-dates grey">{formatDateRange(stay.startDate, stay.endDate)}</div>
                <div className="preview-price">
                    <span className="bold">${stay.price}</span><span className="grey"> night</span>
                </div>
            </div>
        </article>
    </Link>
}