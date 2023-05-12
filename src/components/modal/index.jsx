import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';
import { Card } from '../../components/cardPokemon';
import backArrow from '../../assets/arrow_back3.svg';

export function Modal({ onClose ,id}) {
  const [pokemon, setPokemon] = useState({});

  async function getPokemon(id) {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const { data: species } = await axios.get(data.species.url);
      console.log(species,'species');
      console.log(data,'data')
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
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // chama a função getPokemon com o id desejado
    getPokemon(id); // exemplo: id 25 é Pikachu
  }, []);

  return (
    <div className="modal">
      <div className="modal-content" style={{backgroundColor: `${pokemon.color}` }}>
        <div className="container-card">
          <div className='close'>
            <img className='back-arrow'
              src={backArrow} 
              onClick={onClose}
              ></img>
            </div>
          {pokemon.name && <Card {...pokemon} key={pokemon.name} />}
        </div>
      </div>
      <div className='tet'></div>
    </div>
  );
}

