import axios from 'axios'
import { Pokemon, PokemonPage, PokemonSimple } from '../interfaces/pokemon'
import { getNumberInsideBars } from '../utils/strings'
const BASE_URL = 'https://pokeapi.co/api/v2'

export async function getPokemons() {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/?limit=20&offset=0`)
    const pokemonPage = response.data as PokemonPage
    return pokemonPage.results.map(pokemon => {
      return {
        id: getNumberInsideBars(pokemon.url),
        name: pokemon.name,
        url: pokemon.url
      }
    }) as PokemonSimple[]
  } catch (error) {
    console.error(error)
  }
}

export async function getPokemon(id: string | number) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`)
    const pokemon = response.data as Pokemon[]
    return pokemon
  } catch (error) {
    console.error(error)
  }
}