import axios from 'axios'
import { Ability, Evolution, EvolutionChain, Pokemon, PokemonPage, PokemonSimple } from '../interfaces/pokemon'
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

export async function getPokemonEvolution(pokemonName: string): Promise<Evolution[]> {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon-species/${pokemonName}`);
    const evolutionChainUrl = response.data.evolution_chain.url;
    const evolutionChainResponse = await axios.get(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.data;

    const evolutions: Evolution[] = extractEvolutions(evolutionChainData.chain);

    return evolutions;
  } catch (error) {
    throw new Error("Erro ao buscar evolução")
  }
}

const extractEvolutions = (evolutionChain: EvolutionChain): Evolution[] => {
  const evolutions: Evolution[] = [];
  const extractEvolution = (evolutionData: EvolutionChain) => {
    const { species } = evolutionData;
    const evolution: Evolution = {
      name: species.name,
      id: getNumberInsideBars(species.url) || 0,
    };

    evolutions.push(evolution);

    if (evolutionData.evolves_to.length > 0) {
      evolutionData.evolves_to.forEach((nextEvolution) => {
        extractEvolution(nextEvolution);
      });
    }
  };

  extractEvolution(evolutionChain);

  return evolutions;
};
