import { useEffect, useState } from "react"
import { getPokemon } from "../services/pokemon"
import { CaughtPokemon, Pokemon } from "../interfaces/pokemon"
import { Link } from "react-router-dom"
import { editCaughtPokemon } from "../services/database"

interface PokemonDetailsProps {
  id: number | string
  customPhoto?: string
}
export default function PokemonDetails(props: PokemonDetailsProps) {
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon>()
  const [pokemonPhoto, setPokemonPhoto] = useState<string>(props.customPhoto || '')
  const changePokemonPhoto = (photo: string) => {

    const updatedPokemon: CaughtPokemon = {
      id: pokemonDetail?.id || props.id as number,
      name: pokemonDetail?.name || '',
      customPhoto: photo
    };

    editCaughtPokemon(updatedPokemon)
      .then(() => {
        console.log('Pokémon atualizado com sucesso!');
        setPokemonPhoto(photo)
      })
      .catch((error) => {
        console.error('Erro ao atualizar Pokémon:', error);
      });
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      if (!reader.result) {
        return
      }
      const base64 = reader.result.toString()
   
      changePokemonPhoto(base64)
    }
  }

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
      <img src={pokemonPhoto || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`} alt={pokemonDetail?.name} />
      <h2><Link to={`/?type=${pokemonDetail?.types[0]?.type.name}`} reloadDocument>{pokemonDetail?.types[0]?.type.name}</Link></h2>
      {/*  */}
      <label htmlFor="changePhoto">
        TROCAR
        
      </label>
      <input id="changePhoto" name="changePhoto" type="file" onChange={handleFileChange} style={{display: 'none'}} />
    </div>
  )
}