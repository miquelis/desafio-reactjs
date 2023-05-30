import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedPokemons: [],
  caughtPokemons: [],
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    selectPokemon: (state: { selectedPokemons: Array<number> }, action: { payload: number }) => {
      state.selectedPokemons = [...state.selectedPokemons, action.payload]
    },
    removeSelectedPokemon: (state: { selectedPokemons: Array<number> }, action: { payload: number[] }) => {
      state.selectedPokemons = state.selectedPokemons.filter(pokemon => !action.payload.includes(pokemon))
    },
    capturePokemon: (state: { caughtPokemons: Array<number> }, action: { payload: number[] }) => {
      state.caughtPokemons = [...state.caughtPokemons, ...action.payload]
    },
    removeCaughtPokemon: (state: { caughtPokemons: Array<number> }, action: { payload: number }) => {
      state.caughtPokemons = state.caughtPokemons.filter(pokemon => pokemon !== action.payload)
    }
  },
})

export const { selectPokemon, capturePokemon, removeSelectedPokemon, removeCaughtPokemon } = pokemonSlice.actions
export default pokemonSlice.reducer