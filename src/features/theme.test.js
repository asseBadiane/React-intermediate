import * as themeActions from './theme'
import themeReducer from './theme'

describe("Thme Action", () => {
    it('should cretae a toggle action object', () => {
        expect(themeActions.toggle()).toEqual({
            type: 'theme/toggle'
        })
       
    })
    it('should cretae a set action onjet', () => {
        expect(themeActions.set('light')).toEqual({
            type: 'theme/set',
            payload:'light'
        })
        expect(themeActions.set('dark')).toEqual({
            type: 'theme/set',
            payload:'dark'
        })
       
    })
})
 
describe('Theme reducer', () => {
    it('should return the initial state when state is undefined', () => {
        expect(themeReducer('light', { type: '@INIT' })).toEqual('light')
    })
 
    it('should toggle theme', () => {
        expect(themeReducer('light', themeActions.toggle())).toEqual('dark')
        expect(themeReducer('dark', themeActions.toggle())).toEqual('light')
    })
 
    it('should set theme', () => {
        expect(themeReducer('light', themeActions.set('light'))).toEqual('light')
        expect(themeReducer('dark', themeActions.set('light'))).toEqual('light')
    })
 
    it('should return state on invalid action', () => {
    expect(themeReducer('light', { type: 'INVALID' })).toEqual('light')
    })
})