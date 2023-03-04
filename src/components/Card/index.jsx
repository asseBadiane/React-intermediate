// La biblothèque "prop-types" nous permet de sécuriser nos props 
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultPicture from '../../assets/profile.png'
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
function Card({label, title, picture}) {
    return (
        <CardWrapper style={{display: 'flex', flexDirection: 'column', padding: 15}}>
            <CardLabel>{label}</CardLabel>
            <CardImage src={picture} alt="freelance" height={80} width={80} />
            <CardLabel>{title}</CardLabel>
        </CardWrapper>
    )
    
}
// Exiger un prop avec isRequired
Card.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }
// Utiliser defaulProps pour Eviter les erreurs 
Card.defaultProps = {
    label: '',
    title: '',
    picture: DefaultPicture,
  }

export default Card