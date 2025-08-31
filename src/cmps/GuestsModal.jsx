import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_GUESTS_MODAL } from '../store/reducers/system.reducer'
import minus from '../assets/images/svg/minus-btn.svg'
import plus from '../assets/images/svg/plus-btn.svg'

Modal.setAppElement('#root')

export function GuestsModal({ localFilter, handleGuestChange, setSelectedSection, isSmallModal }) {
    const isGuestsModalOpen = useSelector(storeState => storeState.systemModule.isGuestsModalOpen)
    const dispatch = useDispatch()
    const [guests, setGuests] = useState({
        adults: localFilter.capacity.adults || 0,
        children: localFilter.capacity.children || 0,
        infants: localFilter.capacity.infants || 0,
        pets: localFilter.capacity.pets || 0,
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
                <>
                    <div className={`guests-modal-overlay ${isSmallModal ? "small-guests-modal" : ""}`} onClick={() => {
                        dispatch({ type: CLOSE_GUESTS_MODAL })
                        setSelectedSection(null)
                    }}></div>
                    <div
                        className={`guests-modal-content ${isSmallModal ? "small-guests-modal" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isSmallModal && <h1 className="who">Who?</h1>}
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
                                    <button
                                        type="button"
                                        className="btn-count"
                                        onClick={() => handleDecrement(type)}
                                        disabled={guests[type] === 0}
                                    >
                                        <img className="svg-image" src={minus} alt="minus" />
                                    </button>
                                    <span>{guests[type]}</span>
                                    <button className="btn-count" onClick={() => handleIncrement(type)} type="button">
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