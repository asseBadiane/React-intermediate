import styled from 'styled-components'
// import { ThemeContext } from '../../utils/context'
// import { useTheme } from '../../utils/hooks'
import colors from '../../utils/style/colors'
import * as themeActions from '../../features/theme'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from '../../utils/selectors'
 
const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
`
 
const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.secondary};
`
 
function Footer() {
    // const { toggleTheme, theme } = useTheme()
    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()
    return (
        <FooterContainer>
            <NightModeButton onClick={() => dispatch(themeActions.toggle())}>
                Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
            </NightModeButton>
        </FooterContainer>
    )
}
 
export default Footer