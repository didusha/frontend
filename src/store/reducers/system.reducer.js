export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const OPEN_DATE_MODAL = 'OPEN_DATE_MODAL'
export const CLOSE_DATE_MODAL = 'CLOSE_DATE_MODAL'

const initialState = {
  isLoading: false,
  isDateModalOpen: false,
}

export function systemReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case OPEN_DATE_MODAL:
      return { ...state, isDateModalOpen: true }
    case CLOSE_DATE_MODAL:
      return { ...state, isDateModalOpen: false }
    default: return state
  }
}
