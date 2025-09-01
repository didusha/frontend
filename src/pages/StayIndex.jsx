import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addStayMsg } from '../store/actions/stay.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { SET_FILTER_BY } from "../store/reducers/stay.reducer"
import { stayService } from '../services/stay/'
import { userService } from '../services/user'
import { StayList } from '../cmps/StayList'
import { Loader } from '../cmps/Loader'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch({ type: SET_FILTER_BY, filterBy: { hostId: null } })
    // }, [])

    useEffect(() => {
        loadStays()
    }, [filterBy])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.name = prompt('Name?', 'Some Name')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onAddRandStay() {
        const stay = stayService.getRandomStay()
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onUpdateStay(stay) {
        const price = +prompt('New price?', stay.price) || 0
        if (price === 0 || price === stay.price) return

        const stayToSave = { ...stay, price }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new price: ${savedStay.price}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    return (
        <section className="stay-index">
            {isLoading && <Loader />}
            {/* {userService.getLoggedinUser() && <button onClick={onAddStay}>Add a Stay</button>}
            {userService.getLoggedinUser() && <button onClick={onAddRandStay}>Add rand Stay</button>} */}
            {!isLoading &&
                <StayList
                    stays={stays}
                    onRemoveStay={onRemoveStay}
                    onUpdateStay={onUpdateStay} />
            }
        </section>
    )
}