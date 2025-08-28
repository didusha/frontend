import { useDispatch } from "react-redux";
import { OPEN_DATE_MODAL, OPEN_GUESTS_MODAL, OPEN_WHERE_MODAL } from "../store/reducers/system.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import homes from "../assets/images/png/homes.png";

export function StaySmallFilter({ setSelectedSection, selectedSection }) {
    const dispatch = useDispatch()

    return (
        <section className="small-filter">
            <img className="homes-small-filter" src={homes} alt="home" />
            <section className="anywhere" onClick={() => {
                dispatch({ type: OPEN_WHERE_MODAL })
                setSelectedSection(selectedSection === "search" ? null : "search")
            }}>Anywhere</section>
            <section className="anytime-small-filter" onClick={() => {
                dispatch({ type: OPEN_DATE_MODAL })
                setSelectedSection(selectedSection === "checkIn" ? null : "checkIn")
            }}>Anytime</section>
            <section onClick={() => {
                dispatch({ type: OPEN_GUESTS_MODAL })
                setSelectedSection(selectedSection === "guests" ? null : "guests")
            }}>Add guests</section>
            <button className="btn-search-small">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
            </button>
        </section>
    )
}