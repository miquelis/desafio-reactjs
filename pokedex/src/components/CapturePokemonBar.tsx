import '../styles/CapturePokemonBar.css'
import { cleanSelectedPokemons } from '../store/modules/pokemonSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { addMultipleCaughtPokemons } from '../services/database'

export default function CapturePokemonBar() {
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const dispatch = useDispatch()
  const confirmCapture = () => {
    addMultipleCaughtPokemons(pokemon.selectedPokemons as never)
    .then(() => {
      dispatch(cleanSelectedPokemons())
      console.log('Lista de Pokémons adicionada com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao adicionar a lista de Pokémons:', error);
    });
    
  }
 return (
    <div className='CapturePokemonBar'>
      <h1>{pokemon.selectedPokemons.length}</h1>
      <button onClick={()=>confirmCapture()}>Confirmar Captura</button>
    </div>
  )
}