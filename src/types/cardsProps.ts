import { PokemonType } from "./type";

export interface CardProps {
    id: string;
    name: string;
    sprite: string;
    types: PokemonType[];
    moves: string[];
    weight: string;
    height: string;
    abilities: string[];
    stats: {
      name: string;
    };
    isLegendary: boolean;
    isMythical: boolean;
    color: string;
    method_evolution: any;
    evolves_from: any;
    varieties: string;
    species: string;
  }