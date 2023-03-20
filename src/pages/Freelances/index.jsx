// import { useEffect, useState } from 'react'
import styled from 'styled-components'
// import DefaultPicture from '../../assets/profile.png'
import Card from '../../components/Card'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
// import { useFetch, useTheme } from '../../utils/hooks'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchOrUpdateFreelances } from '../../features/freelances'
import { selectFreelances, selectTheme } from '../../utils/selectors'



const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`
const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 30px;
`
const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

// const freelanceProfiles = [
//     {
//         name: 'Jane Doe',
//         jobTitle: 'Devops',
//         picture: DefaultPicture,
//     },
//     {
//         name: 'John Doe',
//         jobTitle: 'Developpeur frontend',
//         picture: DefaultPicture,
//     },
//     {
//         name: 'Jeanne Biche',
//         jobTitle: 'Développeuse Fullstack',
//         picture: DefaultPicture,
//     },
// ]

function Freelances() {

    // const [ isDataLoading, setDataLoading ] = useState(false)
    // const [error, setError] = useState(false)
    // const [freelancersList, setFreelancesList] = useState([])

  // const {  theme } = useTheme()
  // const { data, isLoading, error } = useFetch(
  //   `http://localhost:8000/freelances`
  // )
  // const freelancersList = data?.freelancersList

  // if (error) {reelancersList?.map((profile)
  //     return <span>Oups il y a eu un problème</span>
  // }

  // on récupère le store grâce au hook useStore()
  const dispatch = useDispatch()

  // on utilise useEffect pour lancer la requête au chargement du composant
  useEffect(() => {
    // on exécute notre action asynchrone avec le store en paramètre
    dispatch(fetchOrUpdateFreelances)
    // On suit la recommandation d'ESLint de passer le store
    // en dépendances car il est utilisé dans l'effet
    // cela n'as pas d'impacte sur le fonctionnement car le store ne change jamais
  }, [dispatch])

  const theme = useSelector(selectTheme)

  const freelances = useSelector(selectFreelances)

  if (freelances.status === 'rejected') {
    return <span>Il y a un problème</span>
  }

  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {freelances.status === 'pending' || freelances.status === 'void' ?  (
        <LoaderWrapper>
            {/* data-testid nous permet d'acceder sur cet element */}
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {freelances.data.freelancersList.map((profile)  => (
            <Link key={`freelance-${profile.id}`} to={`/profile/${profile.id}`}>
              <Card
                label={profile.job}
                title={profile.name}
                picture={profile.picture}
                theme={theme}
              />
            </Link>
          ))}
        </CardsContainer>
      )}
    </div>
  )
}

export default Freelances