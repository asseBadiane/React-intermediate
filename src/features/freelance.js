// import { createAction, createReducer } from '@reduxjs/toolkit'

// import produce from 'immer'
import { createSlice } from '@reduxjs/toolkit'
import { selectFreelance } from '../utils/selectors'


// le state initial de cette feature est un objet vide
const initialState = {
  // chaque propriété de cet objet correspond à l'Id d'un freelance
  // 3: { status: 'void' }
}

// const FETCHING = 'freelance/fetching'
// const RESOLVED = 'freelance/resolved'
// const REJECTED = 'freelance/rejected'

// les actions contiennent l'Id du freelance en payload
// Ancien method
// const freelanceFetching = (freelanceId) => ({
//   type: FETCHING,
//   payload: { freelanceId },
// })
// const freelanceResolved = (freelanceId, data) => ({
//   type: RESOLVED,
//   payload: { freelanceId, data },
// })
// const freelanceRejected = (freelanceId, error) => ({
//   type: REJECTED,
//   payload: { freelanceId, error },
// })

// La Methode avec createSlice
const { actions, reducer} = createSlice({
  name: 'freelance',
  initialState,
  reducers: {
    fetching: {
      prepare: (freelanceId) => ({
            payload : { freelanceId } }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.freelanceId)
        if (draft[action.payload.freelanceId].status === 'void') {
          draft[action.payload.freelanceId].status = 'pending'
          return
        }
        if (draft[action.payload.freelanceId].status === 'rejected') {
          draft[action.payload.freelanceId].error = null
          draft[action.payload.freelanceId].status = 'pending'
          return
        }
        if (draft[action.payload.freelanceId].status === 'resolved') {
          draft[action.payload.freelanceId].status = 'updating'
          return
        }
      }
    },

    resolved: {
      prepare: (freelanceId, data) => ({
        payload : { freelanceId, data } }),
        reducer: (draft, action) => {
          setVoidIfUndefined(draft, action.payload.freelanceId)
          if (
            draft[action.payload.freelanceId].status === 'pending' ||
            draft[action.payload.freelanceId].status === 'updating'
          ) {
            draft[action.payload.freelanceId].data = action.payload.data
            draft[action.payload.freelanceId].status = 'resolved'
            return
          }
          return
      }

    },
    rejected: {
      prepare: (freelanceId, error) => ({
          payload: { freelanceId, error } }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.freelanceId)
        if (
          draft[action.payload.freelanceId].status === 'pending' ||
          draft[action.payload.freelanceId].status === 'updating'
        ) {
          draft[action.payload.freelanceId].error = action.payload.error
          draft[action.payload.freelanceId].data = null
          draft[action.payload.freelanceId].status = 'rejected'
          return
        }
        return
      }
    }
  }
})


// on export le reducer comme default export
export default reducer


// const freelanceFetching = createAction('freelance/fetching', (freelanceId) => {
//   return {
//     payload : { freelanceId }
//   }
// })
// const freelanceResolved = createAction('freelance/resolved', (freelanceId, data) => {
//   return {
//     payload : { freelanceId, data }
//   }
// })
// const freelanceRejected = ('freelance/rejected', (freelanceId, error) => {
//   return {
//     payload: { freelanceId, error }
//   }
// } )

export async function fetchOrUpdateFreelance(freelanceId) {
  return async (dispatch, getState) => {
    const selectFreelanceById = selectFreelance(freelanceId)
    const status = selectFreelanceById(getState()).status
    if (status === 'pending' || status === 'updating') {
      return
    }
    dispatch(actions.fetching(freelanceId))
    try {
      const response = await fetch(
        `http://localhost:8000/freelance?id=${freelanceId}`
      )
      const data = await response.json()
      dispatch(actions.resolved(freelanceId, data))
    } catch (error) {
      dispatch(actions.rejected(freelanceId, error))
    }
  }
  
}

function setVoidIfUndefined(draft, freelanceId) {
  if (draft[freelanceId] === undefined) {
    draft[freelanceId] = { status: 'void' }
  }
}


// export default createReducer(initialState, (builder) =>
//   builder
//     .addCase(freelanceFetching, (draft, action) => {
//       setVoidIfUndefined(draft, action.payload.freelanceId)
//       if (draft[action.payload.freelanceId].status === 'void') {
//         draft[action.payload.freelanceId].status = 'pending'
//         return
//       }
//       if (draft[action.payload.freelanceId].status === 'rejected') {
//         draft[action.payload.freelanceId].error = null
//         draft[action.payload.freelanceId].status = 'pending'
//         return
//       }
//       if (draft[action.payload.freelanceId].status === 'resolved') {
//         draft[action.payload.freelanceId].status = 'updating'
//         return
//       }
//     })
//     .addCase(freelanceResolved, (draft, action) => {
//       setVoidIfUndefined(draft, action.payload.freelanceId)
//       if (
//         draft[action.payload.freelanceId].status === 'pending' ||
//         draft[action.payload.freelanceId].status === 'updating'
//       ) {
//         draft[action.payload.freelanceId].data = action.payload.data
//         draft[action.payload.freelanceId].status = 'resolved'
//         return
//       }
//       return
//     })
//     .addCase(freelanceRejected, (draft, action) => {
//       setVoidIfUndefined(draft, action.payload.freelanceId)
//       if (
//         draft[action.payload.freelanceId].status === 'pending' ||
//         draft[action.payload.freelanceId].status === 'updating'
//       ) {
//         draft[action.payload.freelanceId].error = action.payload.error
//         draft[action.payload.freelanceId].data = null
//         draft[action.payload.freelanceId].status = 'rejected'
//         return
//       }
//       return
//     })
// )

// export default function freelanceReducer(state = initialState, action) {
//   const { type, payload } = action
//   return produce(state, (draft) => {
//     // si l'action est une des action de freelance
//     if (type === freelanceResolved.toString() || type === FETCHING || type === REJECTED) {
//       // on vérifie que le state contient la propriété correspondante à l'Id du freelance
//       if (draft[payload.freelanceId] === undefined) {
//         // si elle n'existe pas, on l'initialise avec void
//         draft[payload.freelanceId] = { status: 'void' }
//       }
//     }
//     switch (type) {
//       case FETCHING: {
//         if (draft[payload.freelanceId].status === 'void') {
//           draft[payload.freelanceId].status = 'pending'
//           return
//         }
//         if (draft[payload.freelanceId].status === 'rejected') {
//           draft[payload.freelanceId].error = null
//           draft[payload.freelanceId].status = 'pending'
//           return
//         }
//         if (draft[payload.freelanceId].status === 'resolved') {
//           draft[payload.freelanceId].status = 'updating'
//           return
//         }
//         return
//       }
//       case freelanceResolved.toString(): {
//         if (
//           draft[payload.freelanceId].status === 'pending' ||
//           draft[payload.freelanceId].status === 'updating'
//         ) {
//           draft[payload.freelanceId].data = payload.data
//           draft[payload.freelanceId].status = 'resolved'
//           return
//         }
//         return
//       }
//       case REJECTED: {
//         if (
//           draft[payload.freelanceId].status === 'pending' ||
//           draft[payload.freelanceId].status === 'updating'
//         ) {
//           draft[payload.freelanceId].error = payload.error
//           draft[payload.freelanceId].data = null
//           draft[payload.freelanceId].status = 'rejected'
//           return
//         }
//         return
//       }
//       default:
//         return
//     }
//   })
// }