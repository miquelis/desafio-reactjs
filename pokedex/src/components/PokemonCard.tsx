import { selectPokemon, removeSelectedPokemon } from '../store/modules/pokemonSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'

interface PokemonCardProps {
  id: number
  name: string
}

export default function PokemonCard(props: PokemonCardProps) {
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const dispatch = useDispatch()
  const isSelected = pokemon.selectedPokemons.includes(props.id as never)
  const isCaught = pokemon.caughtPokemons.includes(props.id as never)
  const buttonText = ()=>{
    if(isCaught) {
      return 'Capturado'
    }
    if(isSelected) {
      return 'Selecionado'
    }else{
      return 'Selecionar'
    }
  }

  const handleSelectPokemon = (id: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()

    if(isSelected) {
      dispatch(removeSelectedPokemon([id]))
    }else{
      dispatch(selectPokemon(id))
    }
  }
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{ String(isSelected) }</h2>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`} alt={props.name} />
      <button onClick={(event) => handleSelectPokemon(props.id, event) } disabled={isCaught}>{ buttonText() }</button>
    </div>
  )
}