// import { useContext, useEffect } from 'react'
import { SurveyContext } from '../../utils/context'
import styled, { useTheme } from 'styled-components'
// import { useFetch, useTheme } from '../../utils/hooks'
// import { StyledLink, Loader } from '../../utils/style/Atoms'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchOrUpdateResults } from '../../features/results'
// import { selectResults } from '../../utils/selectors'
import EmptyList from '../../components/EmptyList'
import { useQueries } from 'react-query'
import { useContext } from 'react'
import { Loader, StyledLink } from '../../utils/style/Atoms'
import colors from '../../utils/style/colors'


const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 28px;
  max-width: 60%;
  text-align: center;
  & > span {
    padding-left: 10px;
  }
`

const DescriptionWrapper = styled.div`
  padding: 60px;
`

const JobTitle = styled.span`
  color: ${({ theme }) =>
    theme === 'light' ? colors.primary : colors.backgroundLight};
  text-transform: capitalize;
`

const JobDescription = styled.div`
  font-size: 18px;
  & > p {
    color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
    margin-block-start: 5px;
  }
  & > span {
    font-size: 20px;
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export function formatJobList(title, listlength, index) {
    if (index === listlength - 1) {
      return title
    }
    return `${title}`
  
}

// function formatFetchParams(answers) {
//   const answerNumbers = Object.keys(answers)

//   return answerNumbers.reduce((previousParams, answerNumber, index) => {
//     const isFirstParam = index === 0
//     const separator = isFirstParam ? '' : '&'
//     return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
//   }, '')
// }
export function formatQueryParams(answers) {
  const answerNumbers = Object.keys(answers)

  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstParam = index === 0
    const separator = isFirstParam ? '' : '&'
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
  }, '')
}

// export function formatJobList(title, listLength, index) {
//   if (index === listLength - 1) {
//     return title
//   } else {
//     return `${title},`
//   }
// }

function Results() {
  const { theme } = useTheme()
  const { answers } = useContext(SurveyContext)
  const fetchParams = formatQueryParams(answers)
  // const queryParams = formatQueryParams(answers)
  // const { data, isLoading, error } = useFetch(
  //   `http://localhost:8000/results?${queryParams}`
  // )
  // const results = useSelector(selectResults)

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchOrUpdateResults)
  // }, [dispatch])

  // if (results.status === 'rejected') {
  //   return <span>Il y a un problème</span>
  // }

  const { data, isLoading, error } = 
  useQueries(['results', fetchParams], async () => {
    const response = await fetch(`http://localhost:8000/results?${fetchParams}`)
    const data = await response.json()
    return data

  })
   if (error) {
      return <span>Il y a un problème</span>
    }

  const resultsData = data?.resultsData

  // const isLoading = results.status === 'void' || results.status === 'pending' || results.status === 'updating'
  if (resultsData?.length < 1) {
    return <EmptyList theme={theme} />
  }

  return isLoading ? (
    <LoaderWrapper>
    <Loader data-testid="loader" />
  </LoaderWrapper>
) : (
  <ResultsContainer theme={theme}>
    <ResultsTitle theme={theme}>
      Les compétences dont vous avez besoin :
      {resultsData &&
        resultsData.map((result, index) => (
          <JobTitle
            key={`result-title-${index}-${result.title}`}
            theme={theme}
          >
            {formatJobList(result.title, resultsData.length, index)}
          </JobTitle>
        ))}
    </ResultsTitle>
    <StyledLink $isFullLink to="/freelances">
      Découvrez nos profils
    </StyledLink>
    <DescriptionWrapper>
      {resultsData &&
        resultsData.map((result, index) => (
          <JobDescription
            theme={theme}
            key={`result-detail-${index}-${result.title}`}
          >
            <JobTitle theme={theme} data-testid="job-title">
              {result.title}
            </JobTitle>
            <p data-testid="job-description">{result.description}</p>
          </JobDescription>
        ))}
    </DescriptionWrapper>
  </ResultsContainer>
  )
}

export default Results