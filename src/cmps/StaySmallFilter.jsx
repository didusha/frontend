import { useDispatch } from "react-redux";
import { OPEN_DATE_MODAL } from "../store/reducers/system.reducer";




export function StaySmallFilter({ openFocusComponent }) {
    const dispatch = useDispatch()

    return (
        <section className="small-filter" onClick={openFocusComponent}>
            <section className="anywhere">Anywhere</section>
            <section onClick={() => dispatch({ type: OPEN_DATE_MODAL })}>Anytime</section>
            <section>
                Add guests
            </section>
            <button className="btn-clear">Search</button>
        </section>
    )
}