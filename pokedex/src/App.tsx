import { ReactElement, useEffect, useState } from 'react'
import './styles/App.css'
import { getPokemons } from './services/pokemon'
import PokemonCard from './components/PokemonCard'
import Modal from './components/Modal'
import useModal from './hooks/useModal'
import PokemonDetails from './components/PokemonDetails'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import CapturePokemonBar from './components/CapturePokemonBar'


function App() {
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const [pokemonCards, setPokemonCards] = useState<ReactElement[]>([])
  const { isOpen, toggle } = useModal();
  const [selectedPokemon, setSelectedPokemon] = useState<number>(1)


  useEffect(() => {
    const handleDetails = (id: number) => {
      toggle()
      setSelectedPokemon(id)
    }

    getPokemons().then((pokemons) => {
      if (!pokemons) {
        return
      }
      const pokemonCards = pokemons.map((pokemon) => {
        return (
          <li onClick={()=> handleDetails(pokemon.id)} key={pokemon.id}>
            <PokemonCard  {...pokemon} />
          </li>
       )
      })
      setPokemonCards(pokemonCards)
    })
  }, [toggle])

  return (
    <>
      <ul>
        {pokemonCards} 
      </ul>
      { pokemon.selectedPokemons.length > 0 && <CapturePokemonBar />}
      <Modal  isOpen={isOpen} toggle={toggle}>
        <PokemonDetails id={selectedPokemon} />
      </Modal>
    </>
  )
}

export default App
