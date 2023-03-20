import { createAction, createReducer } from "@reduxjs/toolkit"
import { selectResults } from "../utils/selectors"


const initialState = {
    status: 'void',
    data: null,
    error: null,
    params: null,
}

const resultsFetching = createAction('results/fetching', (params) => ({
    payload: { params }
}))
const resultsResolved = createAction('results/fetching', (params, data) => ({
    payload: { params, data }
}))
const resultsRejected = createAction('results/fetching', (params, error) => ({
    payload: { params, error }
}))

export function fetchOrUpdateResults(params) {
    // On retourne un thunk
    return async (dispatch, getState) => {
        const results = selectResults(getState())
        if (results.status === 'void' || results.status !== params) {
            dispatch(resultsFetching(params))
            try {
                const response = await fetch(`http://localhost:8000/results?${params}`)
                const data = await response.json()
                dispatch(resultsResolved(params, data))
            } catch (error) {
                dispatch(resultsRejected(params, error))
            }
        }
    }
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(resultsFetching, (draft, action) => {
      const params = action.payload.params
      if (draft.status === 'void') {
        draft.status = 'pending'
        draft.params = params
        return
      }
      draft.status = 'updating'
      draft.params = params
    })
    .addCase(resultsResolved, (draft, action) => {
      if (draft.params !== action.payload.params) {
        return
      }
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload.data
        draft.status = 'resolved'
        return
      }
      return
    })
    .addCase(resultsRejected, (draft, action) => {
      if (draft.params !== action.payload.params) {
        return
      }
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload.error
        draft.data = null
        draft.status = 'rejected'
        return
      }
    })
)