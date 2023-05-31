import { useEffect, useState } from "react"
import { getPokemon } from "../services/pokemon"
import { CaughtPokemon, Pokemon } from "../interfaces/pokemon"
import { Link } from "react-router-dom"
import { RootState } from "../store"
import { useSelector } from 'react-redux'

interface PokemonDetailsProps {
  id: number | string
}
export default function PokemonDetails(props: PokemonDetailsProps) {
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon>()
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const isCaught =pokemon.caughtPokemons.some((pokemon: CaughtPokemon) => pokemon.id === props.id)
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
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`} alt={pokemonDetail?.name} />
      <h2><Link to={`/?type=${pokemonDetail?.types[0]?.type.name}`} reloadDocument>{pokemonDetail?.types[0]?.type.name}</Link></h2>
    </div>
  )
}