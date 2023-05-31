import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { ReactElement, useState, useEffect } from 'react'
import PokemonDetails from '../components/PokemonDetails'
export default function Pokedex() {
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const [pokemonCards, setPokemonCards] = useState<ReactElement[]>([])

  useEffect(() => {
    const pokemonCards = pokemon.caughtPokemons.map((pokemon) => {
      return (
        <li  key={pokemon}>
          <PokemonDetails  id={pokemon} />
        </li>
     )
    })
    setPokemonCards(pokemonCards)
  }, [pokemon.caughtPokemons])
  return (
    <ul>
      {pokemonCards} 
    </ul>
  )
}


