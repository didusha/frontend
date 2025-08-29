import { useState, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export function DetailsDateModal({ setIsDateModalOpen, isDateModalOpen, setOrder }) {
    const [range, setRange] = useState({ from: null, to: null })
    useEffect(() => {
        if (range?.from) {
            setOrder(prev => ({ ...prev, checkIn: range.from }))
        }
    }, [range?.from])

    useEffect(() => {
        if (range?.to) {
            setOrder(prev => ({ ...prev, checkOut: range.to }))
        }
    }, [range?.to])

    return (
        <>
            {isDateModalOpen && (
                <>
                    <div className="details-date-modal-overlay" onClick={(e) => {
                        e.stopPropagation()
                        setIsDateModalOpen(false)
                    }}></div>
                    <div className="details-date-modal-content" onClick={(e) => e.stopPropagation()}>
                        <DayPicker
                            mode="range"
                            selected={range}
                            onSelect={setRange}
                            numberOfMonths={2}
                            pagedNavigation
                            disabled={{ before: new Date() }}
                        />
                    </div>
                </>
            )}
        </>
    )
}
