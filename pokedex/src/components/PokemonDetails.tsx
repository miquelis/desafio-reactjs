import { useEffect } from "react"
import { getPokemon } from "../services/pokemon"

interface PokemonDetailsProps {
  id: number | string
}
export default function PokemonDetails(props: PokemonDetailsProps) {

  useEffect(() => {
    getPokemon(props.id).then((pokemon) => {
      console.log(pokemon)
    }
    )
  }, [props.id])
  return (
    <div>
      <h1>{props.id}</h1>
    </div>
  )
}