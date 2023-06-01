import '../styles/CapturePokemonBar.css'
import { cleanSelectedPokemons } from '../store/modules/pokemonSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { addMultipleCaughtPokemons } from '../services/database'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export default function CapturePokemonBar() {
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const dispatch = useDispatch()
  const confirmCapture = () => {
    addMultipleCaughtPokemons(pokemon.selectedPokemons as never)
    .then(() => {
      dispatch(cleanSelectedPokemons())
      toast.success('Pokemons capturados com sucesso!')
    })
    .catch((error) => {
      toast.error(error)
    });
    
  }
 return (
    <div className='CapturePokemonBar'>
      <ToastContainer />
      <h1>{pokemon.selectedPokemons.length}</h1>
      <button onClick={()=>confirmCapture()}>Confirmar Captura</button>
    </div>
  )
}