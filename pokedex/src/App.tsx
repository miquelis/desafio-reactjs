import { ReactElement, useEffect, useState } from 'react'
import './styles/App.css'
import { getPokemons } from './services/pokemon'
import PokemonCard from './components/PokemonCard'
import Modal from './components/Modal'
import useModal from './hooks/useModal'
import PokemonDetails from './components/PokemonDetails'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store'
import { selectPokemon } from './store/modules/pokemonSlice'

function App() {
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const dispatch = useDispatch()
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
            <button onClick={(e) =>{ e.stopPropagation(); dispatch(selectPokemon(pokemon.id)) }}>Capturar</button>
          </li>
       )
      })
      setPokemonCards(pokemonCards)
    })
  }, [toggle, dispatch])

  return (
    <>
    <h1>{ pokemon.selectedPokemons.length }</h1>
    <h2>{ pokemon.selectedPokemons }</h2>
    <ul>
      {pokemonCards} 
    </ul>
      
      <Modal  isOpen={isOpen} toggle={toggle}>
        <PokemonDetails id={selectedPokemon} />
      </Modal>
    </>
  )
}

export default App
