import { useDispatch } from "react-redux";
import { OPEN_DATE_MODAL } from "../store/reducers/system.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";




export function StaySmallFilter({ openFocusComponent }) {
    const dispatch = useDispatch()

    return (
        <section className="small-filter" onClick={openFocusComponent}>
            <section className="anywhere">Anywhere</section>
            <section onClick={() => dispatch({ type: OPEN_DATE_MODAL })}>Anytime</section>
            <section>
                Add guests
            </section>
            <button className="btn-clear">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
            </button>
        </section>
    )
}