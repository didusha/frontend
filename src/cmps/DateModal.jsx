import { useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_DATE_MODAL } from '../store/reducers/system.reducer'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

Modal.setAppElement('#root')

export function DateModal({ setCheckInDate, setCheckOutDate }) {
    const isDateModalOpen = useSelector(storeState => storeState.systemModule.isDateModalOpen)
    const dispatch = useDispatch()

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
                isOpen={isDateModalOpen}
                onRequestClose={() => dispatch({type:CLOSE_DATE_MODAL})}
                contentLabel="Select Date"
                style={{
                    overlay: {
                        backgroundColor: 'transparent',
                    },
                    content: {
                        maxWidth: '850px',
                        margin: 'auto',
                        padding: '2.5em',
                        borderRadius: '12px',
                        height: '400px',
                        position: 'absolute',
                        bottom: '-10px',
                        borderRadius: '40px',
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
