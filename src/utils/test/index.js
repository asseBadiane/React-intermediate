import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider, SurveyProvider } from '../../utils/context'
 
function Wrapper({ children }) {
    return (
        <MemoryRouter>
            <ThemeProvider>
                <SurveyProvider> {children} </SurveyProvider>
            </ThemeProvider>
        </MemoryRouter>
    )
  
}
 
export function render(ui) {
    rtlRender(ui, { wrapper: Wrapper })
}