import { selectPokemon, removeSelectedPokemon } from '../store/modules/pokemonSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { CaughtPokemon } from '../interfaces/pokemon'
import { removeCaughtPokemon } from '../services/database'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PokemonCardProps {
  id: number
  name: string
  isPokedex?: boolean
}

export default function PokemonCard(props: PokemonCardProps) {
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const dispatch = useDispatch()
  const isSelected = pokemon.selectedPokemons.some((pokemon: CaughtPokemon) => pokemon.id === props.id)
  const isCaught =pokemon.caughtPokemons.some((pokemon: CaughtPokemon) => pokemon.id === props.id)
  const buttonText = ()=>{
    if(isCaught) {
      return 'Capturado'
    }
    if(isSelected) {
      return 'Remover'
    }else{
      return 'Selecionar'
    }
  }
  const handleRemovePokemon = (id: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    removeCaughtPokemon(id)
    .then(() => {
      toast.success('Pokemon removido com sucesso!')
    })
    .catch((error) => {
      toast.error(error);
    });
  }
  const handleSelectPokemon = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()

    if(isSelected) {
      dispatch(removeSelectedPokemon({id: props.id, name:props.name, customPhoto:''}))
    }else{
      dispatch(selectPokemon({id: props.id, name:props.name, customPhoto:''}))
    }
  }



  return (
    <div>
      <ToastContainer />
      <h1>{props.name}</h1>
      <h2>{ String(isSelected) }</h2>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`} alt={props.name} />
      {props.isPokedex? <button onClick={(event)=>handleRemovePokemon(props.id, event)}>Remover</button>: <button onClick={(event) => handleSelectPokemon(event) } disabled={isCaught}>{ buttonText() }</button>}
      
    </div>
  )
}