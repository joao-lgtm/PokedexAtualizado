import './style.css';
import React, { useState } from 'react';
import { Status } from '../statusPokemon';
import { Info } from '../infoPokemon';
import { EvolutionAndForms } from '../evolutions/index';
import { TextFromPokedex } from '../textFrompokedex';
import { CardProps, PokemonType, Section } from '../../types'

export function Card({
  id,
  name,
  sprite,
  types,
  moves,
  weight,
  height,
  abilities,
  stats,
  isLegendary,
  isMythical,
  color,
  method_evolution,
  evolves_from,
  varieties,
  species,
}: CardProps) {
  const [sinal, setSinal] = useState<number>(1);

  const sections: Section[] = [
    {
      id: 1,
      name: 'status',
      component: <Status key={stats.name} stats={stats} />,
    },
    {
      id: 2,
      name: 'info',
      component: (
        <Info
          key={name}
          weight={weight}
          height={height}
          abilities={abilities}
          isLegendary={isLegendary}
          isMythical={isMythical}
        />
      ),
    },
    {
      id: 3,
      name: 'evolution & Forms',
      component: (
        <EvolutionAndForms
          key={id}
          method_evolution={method_evolution}
          varieties={varieties}
        />
      ),
    },
    {
      id: 4,
      name: 'names and text Pokedex',
      component: (
        <TextFromPokedex key={name} species={species} />
      ),
    },
  ];

  function renderContent() {
    const selectedSection = sections.find((section) => section.id === sinal);
    return selectedSection?.component || null;
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h1 className='card-title'>{name}</h1>
        <div className='sprite'>
          <img className='sprite-img' src={sprite} alt='Foto-1' />
        </div>
        <div className='info-pokemon'>
          <div className='type'>
            {types.map((type: PokemonType, index: number) => (
              <img
                key={index}
                src={`src/assets/${type.type.name}.png`}
                className='type-img'
                alt={type.type.name}
              />
            ))}
          </div>
          <div className='menu-info'>
            <ul>
              {sections.map((section) => (
                <li
                  key={section.id}
                  value={section.id}
                  onClick={() => setSinal(section.id)}
                >
                  {section.name}
                </li>
              ))}
            </ul>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
