import '../styles/index.css'
import { ReactElement, useEffect, useState, useCallback } from 'react'
import { getPokemons, getPokemon, getPokemonsByType } from '../services/pokemon'
import PokemonCard from '../components/PokemonCard'
import Modal from '../components/Modal'
import useModal from '../hooks/useModal'
import PokemonDetails from '../components/PokemonDetails'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import CapturePokemonBar from '../components/CapturePokemonBar'
import { Link } from "react-router-dom";
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  const pokemon = useSelector((state: RootState) => state.pokemon)
  const [pokemonCards, setPokemonCards] = useState<ReactElement[]>([])
  const { isOpen, toggle } = useModal();
  const [selectedPokemon, setSelectedPokemon] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ReactElement[]|null>(null);
  const [searchParams] = useSearchParams();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 
    setSearchTerm(event.target.value.trim());
  };

  const searchPokemon = () => {
    if (searchTerm === '') {
      setSearchResults(null)
      return
    }
    getPokemon(searchTerm).then((pokemon) => {
      if (!pokemon) {
        return
      }
      
      setSearchResults([
        <li onClick={() => handleDetails(pokemon.id)} key={pokemon.id}>
          <PokemonCard {...pokemon} />
        </li>
      ])
      
    })
  }
  const handleDetails = useCallback((id: number) => {
    toggle()
    setSelectedPokemon(id)
  }, [toggle])


  useEffect(() => {
    if(searchParams.get('type')) {
      getPokemonsByType(searchParams.get('type') as string).then((pokemons) => {
        if (!pokemons) {
          return
        }
        const pokemonsCards = pokemons.map((pokemon) => {
          return (
            <li onClick={()=> handleDetails(pokemon.id)} key={pokemon.id}>
              <PokemonCard  {...pokemon} />
            </li>
          )
        })
        setPokemonCards(pokemonsCards)
      })
      return
    }

    getPokemons().then((pokemons) => {
      if (!pokemons) {
        return
      }
      const pokemonsCards = pokemons.map((pokemon) => {
        return (
          <li onClick={()=> handleDetails(pokemon.id)} key={pokemon.id}>
            <PokemonCard  {...pokemon} />
          </li>
       )
      })
      setPokemonCards(pokemonsCards)
      
    }).catch((error) => {
      toast.error(error.message);
    })

  }, [searchParams])

  return (
    <>
     
      <Modal  isOpen={isOpen} toggle={toggle}>
        <PokemonDetails id={selectedPokemon} />
      </Modal>
      
      <header>
        <div className='flex'>
          <Link to={'/'}>Inicio</Link>
          <Link to={'/pokedex'}>Pokedex</Link>
        </div>
        <div className='flex'>
          <input type="text" id="searchInput" 
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Digite um nome ou número" />
          <button onClick={searchPokemon}>Buscar</button>
        </div>
      </header>

      <main>
        <ul className='Pokemon__List'>
          {!searchResults? pokemonCards:searchResults}
        </ul>
      </main>
      
      <footer>
        { pokemon.selectedPokemons.length > 0 && <CapturePokemonBar />}
      </footer>
    </>
  )
}
