import { useState } from 'react'
import Modal from 'react-modal'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

Modal.setAppElement('#root')

export function DateModal({ isOpen, onClose }) {
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ])

    return (
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
                    height: '550px'
                },
            }}
        >
            <div className="airbnb-calendar">
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={2}
                    direction="horizontal"
                    rangeColors={['#000']}
                    showMonthAndYearPickers={false}
                    weekdayDisplayFormat="EEEEE"
                />
            </div>
        </Modal>
    )
}
