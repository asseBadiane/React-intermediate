import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render } from '../../utils/test'
// import { render, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Freelances from './'
import '@testing-library/jest-dom/extend-expect'
// import { Loader } from '../../utils/style/Atoms'
// import { ThemeProvider } from '../../utils/context'

const freelancersMockedData = [
    {
        name: 'Harry Potter',
        job: 'Magicien frontend',
        picture: '',
    },
    {
        name: 'Hermione Granger',
        job: 'Magicienne fullstack',
        picture: '',
    },
]
const server = setupServer(
    // On précise ici l'url qu'il faudra "intercepter"
    rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
        // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
        return res(ctx.json({ freelancersList: freelancersMockedData}))
    })
)
 
// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

// beforeAll  est exécuté avant les tests ;

// beforeEach  est exécuté avant chaque test ;

// et afterEach  est exécuté après chacun des tests.

// describe('Freelances', () => {
//     <Loader theme={theme} data-testid="loader" />
// // ```
// // Et dans notre test, on le récupère avec :
// // ```
//     test('Should render without crash', async () => {
//         render(
//             <ThemeProvider>
//                 <Freelances />
//             </ThemeProvider>
//         )
//         expect(screen.getByTestId('loader')).toBeTruthy()
//     })
// })


// function Wrapper({ children }) {
//     return <ThemeProvider>{children}</ThemeProvider>
// }
// ```
// Et dans notre test, on le récupère avec :
// ```
// it('Should display freelances names', async () => {
//     render(
        // <ThemeProvider>
            // <Freelances />,  { wrapper: Wrapper } 
        // </ThemeProvider>
    // )
    // expect(screen.getByTestId('loader')).toBeTruthy()
    // await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    // await waitFor(() => {
    //     screen.getByText('Harry Potter')
    //     screen.getByText('Hermione Granger')
    // })
// })
 
it('Should display freelancers names after loader is removed', async () => {
    render(<Freelances />)
  
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('Hermione Granger')).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()

})