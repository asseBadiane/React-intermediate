// La biblothèque "prop-types" nous permet de sécuriser nos props 
import PropTypes from 'prop-types'
import { Component } from 'react'
// import { Component, useState } from 'react'
import styled from 'styled-components'
import DefaultPicture from '../../assets/profile.png'
// import { useTheme } from '../../utils/hooks'
import colors from '../../utils/style/colors'

const CardLabel = styled.span`
    color: #5843e4;
    font-size: 22px;
    font-weight: bold;
`
const CardImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`
const CardTitle = styled.div`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  height: 25px;
  display: flex;
  align-items: center;
`
const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: ${colors.backgroundLight};
    border-radius: 30px;
    width: 350px;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`
// function Card({label, title, picture}) {
//     const { theme } = useTheme()
//     const [isFavorite, setIsFavorite] = useState(false)
//     const star = isFavorite ? '⭐️' : '' 
    
//     return (
//         <CardWrapper theme={theme} onClick={() => setIsFavorite(!isFavorite)}>
//             <CardLabel theme={theme}>{label}</CardLabel>
//             <CardImage src={picture} alt="freelance" />
//             <CardTitle theme={theme}>
//                 {star} {title} {star}
//             </CardTitle>
//         </CardWrapper>
//     )
    
// }

// Fonction Card en mode class
class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFavorite: false
        }
    }

    setFavorite = () => {
        this.setState({ isFavorite: !this.state.isFavorite })
    } 

    render() {
        const { theme, label, picture, title } = this.props
        const { isFavorite } = this.state
        const star = isFavorite ? '⭐️' : '' 

        return (
            <CardWrapper theme={theme} onClick={this.isFavorite}>
                <CardLabel theme={theme}>{label}</CardLabel>
                <CardImage src={picture} alt="freelance" />
                <CardTitle theme={theme}>
                  {star} {title} {star}
                </CardTitle>
            </CardWrapper>
        )
    }
}


// Exiger un prop avec isRequired
Card.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
  }
// Utiliser defaulProps pour Eviter les erreurs 
Card.defaultProps = {
    label: '',
    title: '',
    picture: DefaultPicture,
    theme: 'light',
  }

export default Card