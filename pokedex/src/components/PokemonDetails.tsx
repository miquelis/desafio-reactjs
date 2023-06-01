import { useEffect, useState } from "react"
import { getPokemon } from "../services/pokemon"
import { CaughtPokemon, Pokemon } from "../interfaces/pokemon"
import { Link } from "react-router-dom"
import { editCaughtPokemon } from "../services/database"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        setPokemonPhoto(photo)
      })
      .catch((error) => {
        toast.error(error);
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
      <ToastContainer />
      <img src={pokemonPhoto || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`} alt={pokemonDetail?.name} />
      <h2><Link to={`/?type=${pokemonDetail?.types[0]?.type.name}`} reloadDocument>{pokemonDetail?.types[0]?.type.name}</Link></h2>
     
      <label htmlFor="changePhoto">
        TROCAR
        
      </label>
      <input id="changePhoto" name="changePhoto" type="file" onChange={handleFileChange} style={{display: 'none'}} />
    </div>
  )
}