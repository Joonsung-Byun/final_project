import { configureStore, createSlice  } from '@reduxjs/toolkit'


let favoriteMatches = createSlice({
    name: 'favoriteMatches',
    initialState: [],
    reducers: {
        addFavoriteMatch(state, action){
            state.push(action.payload)
        },
        removeFavoriteMatch(state, action){
            return state.filter(match => match != action.payload)
        }
    }
})

export const { addFavoriteMatch, removeFavoriteMatch } = favoriteMatches.actions
 

export default configureStore({
    reducer: {
      favoriteMatches : favoriteMatches.reducer
    }
  }) 