import { useState, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export function DetailsDateModal({setIsDateModalOpen, isDateModalOpen}) {
    const [range, setRange] = useState({ from: null, to: null })
    //   useEffect(() => {
    //     handleCheckInChange(range?.from)
    //   }, [range?.from]);

    //   useEffect(() => {
    //     handleCheckOutChange(range?.to)
    //   }, [range?.to]);

    return (
        <>
            {isDateModalOpen && (
                <>
                    <div className="details-date-modal-overlay" onClick={() => setIsDateModalOpen(false)}></div>
                    <div
                        className="details-date-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="airbnb-details-calendar">
                            <DayPicker
                                mode="range"
                                selected={range}
                                onSelect={setRange}
                                numberOfMonths={2}
                                pagedNavigation
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
