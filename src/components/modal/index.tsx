import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';
import { Card } from '../../components/cardPokemon';
import Lottie from 'lottie-react';
import pokebalLoading from '../../assets/pokebalLoading.json'
import { CardProps } from '../../types';
import { ArrowBack } from '../../assets/arrow-back';



export function Modal({ onClose ,id}) {
  const [pokemon, setPokemon] = useState<CardProps>();
  const [isLoading, setIsLoading] = useState(false);


  async function getPokemon(id) {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const   req   = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
      const   response = await axios.get(req.data.evolution_chain.url);
      const { data: species } = await axios.get(data.species.url);
      let color;
      switch (species.color.name) {
            case 'white':
            color = '#939AA1';
            break;
            case 'black':
              color = '#45565B';
            break;
            case 'purple':
              color = '#B567CE';
            break;
            case 'blue':
              color = '#5091D5';
            break;
            case 'red':
              color = '#FF9D54';
            break;
            case 'green':
              color = '#60B953';
            break;
            case 'yellow':
              color = '#F1D33E';
            break;
            case 'pink':
              color = '#EE93E3';
            break;
            case 'gray':
              color = '#55879E';
            break;
            case 'brown':
              color = '#DA7843';
            break;
      }
      
      setPokemon({
        id: id,
        name: data.name,
        sprite: data.sprites.other['official-artwork'].front_default,
        types: data.types,
        moves: data.moves,
        weight: data.weight,
        height: data.height,
        baseExperience: data.base_experience,
        abilities: data.abilities,
        stats: data.stats,
        isLegendary: species.is_legendary,
        isMythical: species.is_mythical,
        color: color,
        method_evolution: response.data,
        evolves_from: req.data.evolves_from_species,
        varieties: req.data.varieties,
        species: species.flavor_text_entries
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    // chama a função getPokemon com o id desejado
    getPokemon(id); // exemplo: id 25 é Pikachu
    
  }, []);

  return (
    <>
    {isLoading && <><div className='tet'></div><div className="Loading-content" ><Lottie className="animation-Loading" animationData={pokebalLoading} loop={true} /> </div> </>}
    
    {!isLoading && <div className='modal'>
      <div className='tet'></div>
      <div className='modal-content' style={{backgroundColor: `${pokemon?.color}` }}>
        <div className='container-card'>
          <div className='close'>
              <ArrowBack className={'back-arrow'} onclose={onClose}/>
            </div>
          {pokemon?.name && <Card {...pokemon} key={pokemon.name} />}
        </div>
      </div> 
    </div>
  }
  </>
  );
}

