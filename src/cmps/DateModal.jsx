import { useState } from 'react'
import Modal from 'react-modal'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

Modal.setAppElement('#root')

export function DateModal({ isOpen, onClose, setCheckInDate, setCheckOutDate }) {
    const [range, setRange] = useState({ from: null, to: null })
    // [
    // {
    //     startDate: new Date(),
    //     endDate: null,
    //     key: 'selection'
    // }
    // ])

    return (
        <div className="modal-calendar">
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Select Date"
                style={{
                    overlay: {
                        backgroundColor: 'transparent',
                    },
                    content: {
                        maxWidth: '750px',
                        margin: 'auto',
                        padding: '1em',
                        borderRadius: '12px',
                        height: '400px',
                    },
                }}
            >
                <div className="airbnb-calendar">
                    <DayPicker
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        numberOfMonths={2}
                        pagedNavigation
                    />
                </div>
            </Modal>
        </div>
    )
}
