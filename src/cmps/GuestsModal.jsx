import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_GUESTS_MODAL } from '../store/reducers/system.reducer'

Modal.setAppElement('#root')

export function GuestsModal({ handleGuestChange }) {
    const isGuestsModalOpen = useSelector(storeState => storeState.systemModule.isGuestsModalOpen)
    const dispatch = useDispatch()

    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    })

    useEffect(() => {
        handleGuestChange(guests)
    }, [guests])

    const handleIncrement = (type) => {
        setGuests(prev => ({ ...prev, [type]: prev[type] + 1 }))
    }

    const handleDecrement = (type) => {
        setGuests(prev => ({ ...prev, [type]: prev[type] > 0 ? prev[type] - 1 : 0 }))
    }

    const descriptions = {
        adults: 'Ages 13 or above',
        children: 'Ages 2-12',
        infants: 'Under 2',
        pets: 'Bringing a service animal'
    }

    return (
        <>
            {isGuestsModalOpen && (
                <div className="guests-modal-overlay" onClick={() => dispatch({ type: CLOSE_GUESTS_MODAL })}>
                    <div
                        className="guests-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {['adults', 'children', 'infants', 'pets'].map(type => (
                            <div key={type} className="guest-row" >
                                <div>
                                    <div className="type-guests">
                                        {type}
                                    </div>
                                    <div className="desc-guests">
                                        {descriptions[type]}
                                    </div>
                                </div>
                                <div className="btns-guests">
                                    <button className="btn-count" onClick={() => handleDecrement(type)}>-</button>
                                    <span>{guests[type]}</span>
                                    <button className="btn-count" onClick={() => handleIncrement(type)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
