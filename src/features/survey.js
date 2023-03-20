// import { createAction, createReducer} from '@reduxjs/toolkit'
// import produce from 'immer'/
import { createSlice } from '@reduxjs/toolkit'
import { selectSurvey } from '../utils/selectors'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

// Ancien Mehode
// const FETCHING = 'survey/fetching'
// const RESOLVED = 'survey/resolved'
// const REJECTED = 'survey/rejected'
// const surveyFetching = () => ({ type: FETCHING })
// const surveyResolved = (data) => ({ type: RESOLVED, payload: data })
// const surveyRejected = (error) => ({ type: REJECTED, payload: error })

const { actions, reducer} = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    fetching: (draft, action) => {
      if (draft.status === 'void') {
        draft.status = 'pending'
        return
      }
      if (draft.status === 'rejected') {
        draft.error = null
        draft.status = 'pending'
        return
      }
      if (draft.status === 'resolved') {
        draft.status = 'updating'
        return
      }
      return
    },
    resolved: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
          draft.data = action.payload
          draft.status = 'resolved'
          return
        }
      return
    },
    rejected: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload
        draft.data = null
        draft.status = 'rejected'
        return
      }
      return
    }
  }
})
export default reducer

// const surveyFetching = createAction('survey/fetching')
// const surveyResolved = createAction('survey/resolved')
// const surveyRejected = createAction('survey/rejected')

export async function fetchOrUpdateSurvey(dispatch, getState) {
  const status = selectSurvey(getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  dispatch(actions.fetching())
  try {
    const response = await fetch('http://localhost:8000/survey')
    const data = await response.json()
    dispatch(actions.resolved(data))
  } catch (error) {
    dispatch(actions.rejected(error))
  }
}
// export default createReducer(initialState, (builder) => {
//     builder
//     .addCase(surveyFetching, (draft, action) => {
//       if (draft.status === 'void') {
//         draft.status = 'pending'
//         return
//       }
//       if (draft.status === 'rejected') {
//         draft.error = null
//         draft.status = 'pending'
//         return
//       }
//       if (draft.status === 'resolved') {
//         draft.status = 'updating'
//         return
//       }
//       return
//     })
//     .addCase(surveyResolved, (draft, action) => {
//       if (draft.status === 'pending' || draft.status === 'updating') {
//           draft.data = action.payload
//           draft.status = 'resolved'
//           return
//         }
//       return
//     })
//     .addCase(surveyRejected, (draft, action) => {
//       if (draft.status === 'pending' || draft.status === 'updating') {
//         draft.error = action.payload
//         draft.data = null
//         draft.status = 'rejected'
//         return
//       }
//       return
//     })
// })

// export default function surveyReducer(state = initialState, action) {
//   return produce(state, (draft) => {
//     switch (action.type) {
//       case FETCHING: {
//         if (draft.status === 'void') {
//           draft.status = 'pending'
//           return
//         }
//         if (draft.status === 'rejected') {
//           draft.error = null
//           draft.status = 'pending'
//           return
//         }
//         if (draft.status === 'resolved') {
//           draft.status = 'updating'
//           return
//         }
//         return
//       }
//       case RESOLVED: {
//         if (draft.status === 'pending' || draft.status === 'updating') {
//           draft.data = action.payload
//           draft.status = 'resolved'
//           return
//         }
//         return
//       }
//       case REJECTED: {
//         if (draft.status === 'pending' || draft.status === 'updating') {
//           draft.error = action.payload
//           draft.data = null
//           draft.status = 'rejected'
//           return
//         }
//         return
//       }
//       default:
//         return
//     }
//   })
// }