// On utilise des variables pour les noms des actions

import { createSlice } from "@reduxjs/toolkit"

// Ancien méthode
// pour éviter les fautes de frappe
// const TOGGLE_THEME = 'theme/toggle'
// const SET_THEME = 'theme/set'
// actions creators 
// export const toggleTheme = () => ({ type: TOGGLE_THEME })
// export const setTheme = (theme = 'light') => ({
//     type: SET_THEME,
//     payload: theme,
// })
// Le reducer
// on utilise une valeur par défaut pour donner le state initia
// export default function reducer(state= 'light', action) {
//     if (action.type === toggleTheme.toString()) {
//         return state === 'light' ? 'dark' : 'light'
//     }
//     if (action.type === setTheme.toString()) {
//         return action.payload
//     }
//     return state
// }

// Le Methode avec createAction()
// export const toggleTheme = createAction('theme/toggle')
// export const setTheme = createAction('theme/set')

// export default createReducer('light', (builder) => {
//     builder
//     .addCase(toggleTheme, (state) => {
//         return  state === 'light' ? 'dark' : 'light'
//     })
//     .addCase(setTheme, (state, action) => {
//         return action.payload
//     })

// })

//La methode Avec createSlice
const { actions, reducer } = createSlice({
    // le nom du slice
    name: 'theme',
    // le state initial
    intialState: 'light',
    // reducers permet de définir les actions et le reducer
    reducers: {
         // l'action toggle ('theme/toggle')
        toggle: (state) => {
            return  state === 'light' ? 'dark' : 'light'
        },
          // l'action set ('theme/set')
        set:   (state, action) => {
            return action.payload
        }

        }
    
})

// on export chaque action individuellement
export const { set, toggle } = actions
// on export le reducer comme default export
export default reducer
