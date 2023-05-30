import { PokemonSimple } from '../interfaces/pokemon'

function PokemonCard(props: PokemonSimple) {


  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.id}</h2>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`} alt={props.name} />
    </div>
  )
}

export default PokemonCard
