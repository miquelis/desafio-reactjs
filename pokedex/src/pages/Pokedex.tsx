import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { ReactElement, useState, useEffect } from 'react'
import PokemonDetails from '../components/PokemonDetails'
import { CaughtPokemon } from '../interfaces/pokemon'
import PokemonCard from '../components/PokemonCard'
import useModal from '../hooks/useModal'
import Modal from '../components/Modal'
export default function Pokedex() {
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const [pokemonCards, setPokemonCards] = useState<ReactElement[]>([])
  const { isOpen, toggle } = useModal();
  const [selectedPokemon, setSelectedPokemon] = useState<CaughtPokemon>()

  useEffect(() => {
    const handleDetails =(pokemon: CaughtPokemon) => {
      toggle()
      setSelectedPokemon(pokemon)
    }
    const pokemonCards = pokemon.caughtPokemons.map((pokemon: CaughtPokemon) => {
      return (
        <li onClick={()=> handleDetails(pokemon)} key={pokemon.id}>
          <PokemonCard  {...pokemon} isPokedex={true} />
        </li>
      )
    })

    setPokemonCards(pokemonCards)
  }, [pokemon.caughtPokemons])
  return (
    <>
     <ul>
      {pokemonCards} 
    </ul>
    <Modal  isOpen={isOpen} toggle={toggle}>
      <PokemonDetails id={selectedPokemon?.id || 0} customPhoto={selectedPokemon?.customPhoto} />
    </Modal>
    </>
   
  )
}


