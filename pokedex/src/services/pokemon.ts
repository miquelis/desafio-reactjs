import axios from 'axios'
import { Ability, Pokemon, PokemonPage, PokemonSimple } from '../interfaces/pokemon'
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
    throw new Error("Erro ao buscar pokemons")
  }
}

export async function getPokemonsByType(type: string) {
  try {
    const response = await axios.get(`${BASE_URL}/type/${type}`)
    const pokemonsByType = response.data.pokemon as Array<{ slot: number, pokemon: PokemonSimple }>
    return pokemonsByType.map(pokemon => {
      return {
        id: getNumberInsideBars(pokemon.pokemon.url),
        name: pokemon.pokemon.name,
        url: pokemon.pokemon.url
      }
    }) as PokemonSimple[]
  } catch (error) {
    throw new Error("Erro ao buscar pokemons por tipo")
  }
}

export async function getPokemon(id: string | number) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`)
    const pokemon = response.data as Pokemon
    return pokemon as Pokemon
  } catch (error) {
    throw new Error("Erro ao buscar pokemon")
  }
}

export async function getAbilityShortEffect(id: string | number) {
  try {
    const response = await axios.get(`${BASE_URL}/ability/${id}`)
    const ability = response.data
    return ability.effect_entries[0].short_effect as string
  } catch (error) {
    throw new Error("Erro ao buscar habilidade")
  }
}