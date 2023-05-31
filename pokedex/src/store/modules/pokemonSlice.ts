import { createSlice } from '@reduxjs/toolkit'
import { CaughtPokemon } from '../../interfaces/pokemon'

const initialState = {
  selectedPokemons: [],
  caughtPokemons: [],
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    selectPokemon: (state: { selectedPokemons: Array<CaughtPokemon> }, action: { payload: CaughtPokemon }) => {
      state.selectedPokemons = [...state.selectedPokemons, action.payload]
    },
    removeSelectedPokemon: (state: { selectedPokemons: Array<CaughtPokemon> }, action: { payload: CaughtPokemon }) => {
      state.selectedPokemons = state.selectedPokemons.filter(pokemon => pokemon.id !== action.payload.id)
    },
    cleanSelectedPokemons: (state: { selectedPokemons: Array<CaughtPokemon> }) => {
      state.selectedPokemons = []
    },
    updateCaughtPokemons: (state: { caughtPokemons: Array<CaughtPokemon> }, action: { payload: CaughtPokemon[] }) => {
      state.caughtPokemons = action.payload
    }
  },
})

export const { selectPokemon, removeSelectedPokemon, updateCaughtPokemons, cleanSelectedPokemons } = pokemonSlice.actions
export default pokemonSlice.reducer