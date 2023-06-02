import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { ReactElement, useState, useEffect } from 'react'
import PokemonDetails from '../components/PokemonDetails'
import { CaughtPokemon } from '../interfaces/pokemon'
import PokemonCard from '../components/PokemonCard'
import useModal from '../hooks/useModal'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'
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
      <div className='flex'>
        <Link to={'/'}>Inicio</Link>
        <Link to={'/pokedex'}>Pokedex</Link>
      </div>
      {pokemon.caughtPokemons.length === 0 && <h1>Pokedex vazia, procure mais pokemons!</h1>}
      <ul className='Pokemon__List'>
        {pokemonCards} 
      </ul>
      <Modal  isOpen={isOpen} toggle={toggle}>
        <PokemonDetails id={selectedPokemon?.id || 0} customPhoto={selectedPokemon?.customPhoto} />
      </Modal>
    </>
   
  )
}


