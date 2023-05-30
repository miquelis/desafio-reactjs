import '../styles/CapturePokemonBar.css'
import { capturePokemon, removeSelectedPokemon } from '../store/modules/pokemonSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'

export const CapturePokemonBar = () => {
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const dispatch = useDispatch()
  const confirmCapture = () => {
    dispatch(capturePokemon(pokemon.selectedPokemons as never))
    dispatch(removeSelectedPokemon(pokemon.selectedPokemons as never))
  }
 return (
    <div className='CapturePokemonBar'>
      <h1>{pokemon.selectedPokemons.length}</h1>
      <button onClick={()=>confirmCapture()}>Confirmar Captura</button>
    </div>
  )
}

export default CapturePokemonBar