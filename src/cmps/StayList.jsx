import { useSearchParams } from 'react-router-dom'
import { userService } from '../services/user'
import { StayPreview } from './StayPreview'

export function StayList({ stays, onRemoveStay, onUpdateStay }) {

    function shouldShowActionBtns(stay) {
        const user = userService.getLoggedinUser()

        if (!user) return false
        if (user.isAdmin) return true
        return stay.host?._id === user._id
    }

    const [searchParams] = useSearchParams()
    const params = Object.fromEntries([...searchParams]) || {}

    return <section>
        <ul className="stay-list">
            {stays.map(stay =>
                <li key={stay._id}>
                    <StayPreview stay={stay} params={params}/>
                    {shouldShowActionBtns(stay) && <div className="actions">
                        <button className="stay-action" onClick={() => onUpdateStay(stay)}>Edit</button>
                        <button className="stay-action" onClick={() => onRemoveStay(stay._id)}>x</button>
                    </div>}
                </li>)

            }
        </ul>
    </section>
}