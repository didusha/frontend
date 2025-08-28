import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import minus from '../assets/images/svg/minus-btn.svg'
import plus from '../assets/images/svg/plus-btn.svg'

Modal.setAppElement('#root')

export function DetailsGuestsModal({ isGuestsModalOpen, setIsGuestsModalOpen, setOrder }) {
    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    })

    useEffect(() => {
        if (guests) {
            setOrder(prev => ({ ...prev, guests: guests }))
        }
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
                <>
                    <div className="details-guests-modal-overlay" onClick={() => setIsGuestsModalOpen(false)}></div>
                    <div
                        className="details-guests-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {['adults', 'children', 'infants', 'pets'].map(type => (
                            <div key={type} className="details-guest-row" >
                                <div>
                                    <div className="details-type-guests">
                                        {type}
                                    </div>
                                    <div className="details-desc-guests">
                                        {descriptions[type]}
                                    </div>
                                </div>
                                <div className="btns-guests">
                                    <button className="btn-count" onClick={() => handleDecrement(type)}>
                                        <img className="svg-image" src={minus} alt="minus" />
                                    </button>
                                    <span>{guests[type]}</span>
                                    <button className="btn-count" onClick={() => handleIncrement(type)}>
                                        <img className="svg-image" src={plus} alt="plus" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}
