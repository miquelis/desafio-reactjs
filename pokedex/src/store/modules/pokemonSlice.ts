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
    capturePokemon: (state: { caughtPokemons: Array<number> }, action: { payload: number }) => {
      state.caughtPokemons = [...state.caughtPokemons, action.payload]
    },
  },
})

export const { selectPokemon, capturePokemon } = pokemonSlice.actions
export default pokemonSlice.reducer