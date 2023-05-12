import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './style.css';
import { ListPokemon } from '../../components/listPokemon';

export function Home() {
  const [pokemonDisplayCount, setPokemonDisplayCount] = useState(50);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonDisplayCount}`)
      .then(response => {
        const requests = response.data.results.map(result => axios.get(result.url));
        Promise.all(requests)
          .then(responses => {
            const newPokemonList = responses.map(response => {
              const { id, name, sprites } = response.data;
              return { id, name, sprites };
            });
            setPokemonList(newPokemonList);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [pokemonDisplayCount]);

  return (
    <main>
      <div className="container-pokemon">
        <ul>
          {pokemonList.map(pokemon => (
            <ListPokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} sprit={pokemon.sprites.front_default}/>
          ))}
        </ul>
        {isLoading && <p>Carregando...</p>}
        {!isLoading && (
          <button onClick={() => setPokemonDisplayCount(pokemonDisplayCount + 50)}>
            Carregar mais
          </button>
        )}
      </div>
    </main>
  );
}