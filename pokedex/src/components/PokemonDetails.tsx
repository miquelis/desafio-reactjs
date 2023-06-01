import { ReactElement, useEffect, useState } from "react"
import { getAbilityShortEffect, getPokemon, getPokemonEvolution } from "../services/pokemon"
import { CaughtPokemon, Pokemon } from "../interfaces/pokemon"
import { Link } from "react-router-dom"
import { editCaughtPokemon } from "../services/database"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/PokemonDetails.css'
import { translateBaseStat } from "../utils/strings"
interface PokemonDetailsProps {
  id: number | string
  customPhoto?: string
}
export default function PokemonDetails(props: PokemonDetailsProps) {
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon>()
  const [pokemonPhoto, setPokemonPhoto] = useState<string>(props.customPhoto || '')
  const [pokemonTypes, setPokemonTypes] = useState<ReactElement[]>([])
  const [pokemonAbilities, setPokemonAbilities] = useState<ReactElement[]>([])
  const [pokemonStats, setPokemonStats] = useState<ReactElement[]>([])
  const [pokemonEvolutions, setPokemonEvolutions] = useState<ReactElement[]>([])
  const baseStats = ['hp', 'attack', 'defense', 'speed']
  const handleShortEffect = (abilityName: string) => () => {
   
    getAbilityShortEffect(abilityName).then((effect) => {
      toast.info(effect)
    }).catch((error) => {
      toast.error(error.message);
    })
   
  }
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
    }).catch((error) => {
      toast.error(error.message);
    })

    
  }, [props.id])
  useEffect(() => {
    
    if (!pokemonDetail) {
      return
    }
    
    getPokemonEvolution(pokemonDetail.name).then((evolution) => {
      if (!evolution) {
        return
      }
      const pokemonEvolutions = evolution.map((pokemon) => {
        return (
          <li className="PokemonDetail__EvolutionItem" key={pokemon.id}>
            <img className="PokemonDetail__EvolutionImage" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
            <h2 className="PokemonDetail__EvolutionName">{pokemon.name}</h2>
          </li>
        )}
      )
      setPokemonEvolutions(pokemonEvolutions || [])
    }).catch((error) => {
      toast.error(error.message);
    })
    const pokemonTypes = pokemonDetail?.types.map((type) => {
      return (
        <li className="PokemonDetails__Item" key={type.type.name}><Link to={`/?type=${type.type.name}`} reloadDocument >{type.type.name}</Link></li>
      )
    })
    setPokemonTypes(pokemonTypes || [])
    const pokemonAbilities = pokemonDetail?.abilities.map((ability) => {
      return (
        <li className="PokemonDetails__Item pointer" onClick={handleShortEffect(ability.ability.name)} key={ability.ability.name}>{ability.ability.name}</li>
      )
    })
    setPokemonAbilities(pokemonAbilities || [])
    const pokemonStats = pokemonDetail?.stats.map((stat) => {
      if(!baseStats.includes(stat.stat.name)) {
        return <li key={stat.stat.name}></li>
      }
      return (
        <li className="PokemonDetail__StatsItem" key={stat.stat.name}><h2 >{translateBaseStat(stat.stat.name)}: {stat.base_stat}</h2></li>
      )
    })
    setPokemonStats(pokemonStats || [])
  }, [pokemonDetail])
  return (
    <div className="PokemonDetails">
      
      <div className="PokemonDetails__Header">
        <img className="PokemonDetails__Image" src={pokemonPhoto || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`} 
        alt={pokemonDetail?.name} />
      </div>
      <div className="PokemonDetails__Bio">
        <h1 className="PokemonDetails__Name">{pokemonDetail?.name}</h1>
        <ul className="PokemonDetails__List">
          {pokemonTypes}
        </ul>
        <div className="PokemonDetail__Stature">
          <h2>Peso: {pokemonDetail && pokemonDetail?.weight / 10} KG</h2>
          <h2>Tamanho: {pokemonDetail && pokemonDetail?.height / 10} M</h2>
        </div>
        
        <ul className="PokemonDetail__Stats">
          {pokemonStats}
        </ul>
        <ul className="PokemonDetails__List">
          {pokemonAbilities}
        </ul>
        <div>
          <ul className="PokemonDetails__List">
            {pokemonEvolutions}
          </ul>
        </div>
        <label htmlFor="changePhoto" >
          <button className="PokemonDetails__ChangePhoto">Trocar Foto</button> 
          
        </label>
        <input id="changePhoto" name="changePhoto" type="file" onChange={handleFileChange} style={{display: 'none'}} />
      </div>
      
    </div>
  )
}