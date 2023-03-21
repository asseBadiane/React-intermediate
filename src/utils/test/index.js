import { configureStore } from '@reduxjs/toolkit'
import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
// import { ThemeProvider, SurveyProvider } from '../../utils/context'
 
import freelanceReducer from '../../features/freelance'
import freelancesReducer from '../../features/freelances'
import surveyReducer from '../../features/survey'
import themeReducer from '../../features/theme'
import resultsReducer from '../../features/results'
import answersReducer from '../../features/answers'
import { Provider } from 'react-redux'


export function render(ui, options) {

    const store = configureStore({
        reducer : {
            theme: themeReducer,
            freelances: freelancesReducer,
            survey: surveyReducer,
            freelence: freelanceReducer,
            results: resultsReducer,
            answers: answersReducer,
        },
    })

    function Wrapper({ children }) {
        return (
            <MemoryRouter {...options}>
                {/* <ThemeProvider> */}
                    <Provider store={store}> {children} </Provider>
                {/* </ThemeProvider> */}
            </MemoryRouter>
        )
      
    }
    rtlRender(ui, { wrapper: Wrapper })
}

// function Wrapper({ children }) {
//     return (
//         <MemoryRouter>
//             <ThemeProvider>
//                 <SurveyProvider> {children} </SurveyProvider>
//             </ThemeProvider>
//         </MemoryRouter>
//     )
  
// }
 
// export function render(ui) {
//     rtlRender(ui, { wrapper: Wrapper })
// }