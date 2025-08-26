import { useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_GUESTS_MODAL } from '../store/reducers/system.reducer'

Modal.setAppElement('#root')

export function GuestsModal() {
    const isGuestsModalOpen = useSelector(storeState => storeState.systemModule.isGuestsModalOpen)
    const dispatch = useDispatch()

    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    })

    const handleIncrement = (type) => {
        setGuests(prev => ({ ...prev, [type]: prev[type] + 1 }))
    }

    const handleDecrement = (type) => {
        setGuests(prev => ({ ...prev, [type]: prev[type] > 0 ? prev[type] - 1 : 0 }))
    }

    return (
        <div className="modal-guests">
            <Modal
                isOpen={isGuestsModalOpen}
                onRequestClose={() => dispatch({ type: CLOSE_GUESTS_MODAL })}
                contentLabel="Select Guests"
                style={{
                    overlay: {
                        backgroundColor: 'transparent',
                    },
                    content: {
                        maxWidth: '500px',
                        margin: 'auto',
                        padding: '2em',
                        borderRadius: '20px',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5em',
                        position: 'relative',
                    },
                }}
            >
                <h2>Select Guests</h2>
                {['adults', 'children', 'infants', 'pets'].map(type => (
                    <div key={type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textTransform: 'capitalize', fontWeight: '500' }}>{type}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button onClick={() => handleDecrement(type)} style={buttonStyle}>-</button>
                            <span>{guests[type]}</span>
                            <button onClick={() => handleIncrement(type)} style={buttonStyle}>+</button>
                        </div>
                    </div>
                ))}
            </Modal>
        </div>
    )
}

const buttonStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '18px',
}
