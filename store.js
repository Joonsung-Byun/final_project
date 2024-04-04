import { configureStore, createSlice  } from '@reduxjs/toolkit'


let favoriteMatches = createSlice({
    name: 'favoriteMatches',
    initialState: [],
    reducers: {
        addFavoriteMatch(state, action){
            console.log(action.payload)
            state.push(action.payload)

        }
    }
})

export const { addFavoriteMatch } = favoriteMatches.actions
  
  export default configureStore({
    reducer: {
      favoriteMatches : favoriteMatches.reducer
    }
  }) 