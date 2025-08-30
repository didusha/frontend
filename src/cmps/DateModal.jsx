import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CLOSE_DATE_MODAL, OPEN_GUESTS_MODAL } from "../store/reducers/system.reducer"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export function DateModal({ handleCheckInChange, handleCheckOutChange, setSelectedSection, isSmallModal }) {
  const isDateModalOpen = useSelector((storeState) => storeState.systemModule.isDateModalOpen);
  const dispatch = useDispatch()

  const [range, setRange] = useState({ from: null, to: null })

  useEffect(() => {
    handleCheckInChange(range?.from)
    if (range?.from !== null) {
      setSelectedSection("checkOut")
    }
  }, [range?.from]);

  useEffect(() => {
    handleCheckOutChange(range?.to)
  }, [range?.to]);

  return (
      <>
        {isDateModalOpen && (
          <>
            <div className={`modal-overlay ${isSmallModal ? "small-date-modal" : ""}`} onClick={() => {
              dispatch({ type: CLOSE_DATE_MODAL })
              setSelectedSection(null)
            }}></div>
            <div
              className={`modal-content ${isSmallModal ? "small-date-modal" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              {isSmallModal && <h1 className="when">When?</h1>}
              <div className="airbnb-calendar">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={2}
                  pagedNavigation
                  disabled={{ before: new Date() }}
                />
              </div>
            </div>
          </>
        )}
      </>
  )
}
