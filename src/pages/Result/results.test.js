import { formatJobList, formatQueryParams } from "./"

describe('La fonction formatJobList', () => {
    test('Ceci est mon premier test', () => {
        const expectedState = 'item2'
        expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
    })
    test('Ne met pas de virgule pour le derniere element', () => {
        const expectedState = 'item3'
        expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
    })
})


// Jusqu'à maintenant, vous avez utilisé "test" pour écrire vos tests. Mais il existe un alias pour cette fonction : it()  

// Comme pour tout, il existe des conventions de rédaction de tests pour que les appellations
//  soient les plus explicites possibles. Une des conventions possibles consiste à commencer 
//  tous les tests par "should". Dans ce cas, c'est encore plus explicite d'utiliser l'alias it 
//   dont je viens de vous parler. Ce qui aurait donné dans notre cas

// describe('The formatJobList function', () => {
//     it('should add a comma to a word', () => {
//         const expectedState = 'item2,'
//         expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
//     })
 
//     it('should not add a comma to the last element of the list', () => {
//         const expectedState = 'item3'
//         expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
//     })
// })

describe('The fonction formatQueryParams', () => {
    it('Should use the right format param', () => {
        const expectedState = 'a1=answer1'
        expect(formatQueryParams({ 1 : 'answer1' })).toEqual(expectedState)
    })
    it('Should concatenate params with an &', () => {
        const expectedState = 'a1=answer1&a2=answer2'
        expect(formatQueryParams({ 1 : 'answer1', 2 : 'answer2' })).toEqual(expectedState)
    })
})