import { stayService } from '../../services/stay'
import { store } from '../store'
import { ADD_STAY, REMOVE_STAY, SET_STAYS, UPDATE_STAY, ADD_STAY_MSG, SET_FILTER_BY, ADD_STAYS } from '../reducers/stay.reducer'
import { LOADING_START, LOADING_DONE } from '../reducers/system.reducer'

export async function loadStays(sortBy={}) {

const filterBy = store.getState().stayModule.filterBy 
      if (filterBy.guests) {
        const { adults = 1, children = 0, infants = 0 } = filterBy.guests
        filterBy = {
            ...filterBy,
            capacity: adults + children + infants
        }
        }
    try {        
        if (filterBy.page === 1)store.dispatch({type: LOADING_START})
        const stays = await stayService.query(filterBy, sortBy)
          if (filterBy.page > 1) {
                store.dispatch(getCmdAddStays(stays))
            }else{
            store.dispatch(getCmdSetStays(stays))
        }
        store.dispatch({type: LOADING_DONE})
    } catch (err) {
        console.log('Cannot load stays', err)
        throw err
    }
}


export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch(getCmdRemoveStay(stayId))
    } catch (err) {
        console.log('Cannot remove stay', err)
        throw err
    }
}

export async function addStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        store.dispatch(getCmdAddStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot add stay', err)
        throw err
    }
}

export async function updateStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        store.dispatch(getCmdUpdateStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot save stay', err)
        throw err
    }
}

export async function addStayMsg(stayId, txt) {
    try {
        const msg = await stayService.addStayMsg(stayId, txt)
        store.dispatch(getCmdAddStayMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add stay msg', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    return {
        type: 'SET_FILTER_BY',
        filterBy
    }
}

// Command Creators:
function getCmdSetStays(stays) {
    return {
        type: SET_STAYS,
        stays
    }
}
function getCmdAddStays(stays) {
    return {
        type: ADD_STAYS,
        stays
    }
}
function getCmdSetStay(stay) {
    return {
        type: SET_STAY,
        stay
    }
}
function getCmdRemoveStay(stayId) {
    return {
        type: REMOVE_STAY,
        stayId
    }
}
function getCmdAddStay(stay) {
    return {
        type: ADD_STAY,
        stay
    }
}
function getCmdUpdateStay(stay) {
    return {
        type: UPDATE_STAY,
        stay
    }
}
function getCmdAddStayMsg(msg) {
    return {
        type: ADD_STAY_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadStays()
    await addStay(stayService.getEmptyStay())
    await updateStay({
        _id: 'm1oC7',
        name: 'Stay-Good',
    })
    await removeStay('m1oC7')
    // TODO unit test addStayMsg
}
