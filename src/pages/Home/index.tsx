import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Lottie from 'lottie-react';
import pokebalLoading from '../../assets/pokebalLoading.json';
import { ListPokemon } from '../../components/listPokemon';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export function Home() {
  const [pokemonDisplayCount, setPokemonDisplayCount] = useState(50);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]); // Definindo o tipo como um array de Pokemons
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${pokemonDisplayCount}`
        );
        const requests = response.data.results.map((result: { url: string }) =>
          axios.get(result.url)
        );
        const responses = await Promise.all(requests);

        const newPokemonList: Pokemon[] = responses.map(response => {
          const { id, name, sprites } = response.data;
          return { id, name, sprites };
        });

        console.log(newPokemonList);

        setPokemonList(newPokemonList);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonDisplayCount]);

  return (
    <main>
      <div className="container-pokemon">
        <ul>
          {pokemonList.map(pokemon => (
            <ListPokemon
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemon.sprites.front_default}
            />
          ))}
        </ul>
        {isLoading && (
          <div className="Loading-content">
            <div className="tet"></div>
            <Lottie
              className="animation-Loading"
              animationData={pokebalLoading}
              loop={true}
            />
          </div>
        )}
        {!isLoading && (
          <div className="loading-area">
            <button
              className="button-loading"
              onClick={() => setPokemonDisplayCount(pokemonDisplayCount + 50)}
            >
              Carregar mais
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
