import { useEffect, useState } from "react"
import { getPokemon } from "../services/pokemon"
import { Pokemon } from "../interfaces/pokemon"
import { Link } from "react-router-dom"

interface PokemonDetailsProps {
  id: number | string
}
export default function PokemonDetails(props: PokemonDetailsProps) {
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon>()
  useEffect(() => {
    getPokemon(props.id).then((pokemon) => {
      if (!pokemon) {
        return
      }
      setPokemonDetail(pokemon)
    }
    )
  }, [props.id])
  return (
    <div>
      <h1>{props.id}</h1>
      <h2><Link to={`/?type=${pokemonDetail?.types[0]?.type.name}`} reloadDocument>{pokemonDetail?.types[0]?.type.name}</Link></h2>
    </div>
  )
}