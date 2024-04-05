import { configureStore, createSlice  } from '@reduxjs/toolkit'


let favoriteMatches = createSlice({
    name: 'favoriteMatches',
    initialState: [],
    reducers: {
        addFavoriteMatch(state, action){
            console.log(action.payload)
            state.push(action.payload)
        },
        removeFavoriteMatch(state, action){
            console.log(action.payload)
            state.splice(state.indexOf(action.payload), 1)
        }
    }
})

export const { addFavoriteMatch } = favoriteMatches.actions
export const { removeFavoriteMatch } = favoriteMatches.actions
  export default configureStore({
    reducer: {
      favoriteMatches : favoriteMatches.reducer
    }
  }) 