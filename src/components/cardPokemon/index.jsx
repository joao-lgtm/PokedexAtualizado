import './style.css';
import React, { useEffect, useState } from 'react';
import { Status } from '../statusPokemon';
import { Info } from '../infoPokemon';
import { EvolutionAndForms } from './../evolutions/index';

export function Card({
  id,
  name,
  sprite,
  types = [],
  moves = [],
  weight = '',
  height = '',
  abilities = [],
  stats = [],
  isLegendary,
  isMythical,
  color = '',
  method_evolution,
  evolves_from,
  varieties = []
}) {
  const [sinal, setSinal] = useState(1);

  function renderContent() {
    if (sinal === 1) {
      return (
        <Status key={stats.name} stats={stats} />
      );
    } else if (sinal === 2) {
      return (
        <Info
          key={name}
          weight={weight}
          height={height}
          abilities={abilities}
          isLegendary={isLegendary}
          isMythical={isMythical}
        />
      );
    }
    else if (sinal === 3) {
      return (
        <EvolutionAndForms
          key={id}
          id={id}
          method_evolution={method_evolution}
          evolves_from={evolves_from}
          varieties={varieties}
        />
      );
    }
    else if (sinal === 4) {
      return (
        <Info
          key={name}
          weight={weight}
          height={height}
          abilities={abilities}
          isLegendary={isLegendary}
          isMythical={isMythical}
        />
      );
    }
    else if (sinal === 5) {
      return (
        <Info
          key={name}
          weight={weight}
          height={height}
          abilities={abilities}
          isLegendary={isLegendary}
          isMythical={isMythical}
        />
      );
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">{name}</h1>
        <div className="sprite">
          <img className="sprite-img" src={sprite} alt="Foto-1" />
        </div>
        <div className="info-pokemon">
          <div className="type">
            {types.map((type) => (
              <img
                key={type.type.name}
                src={`src/assets/${type.type.name}.png`}
                className="type-img"
                alt={type.type.name}
              />
            ))}
          </div>
          <div className="menu-info">
            <ul>
              <li value={1} onClick={e => setSinal(e.target.value)}>
                status
              </li>
              <li value={2} onClick={e => setSinal(e.target.value)}>
                info
              </li>
              <li value={3} onClick={e => setSinal(e.target.value)}>
                evolution & Forms
              </li>
              <li value={4} onClick={e => setSinal(e.target.value)}>
                moves
              </li>
              <li value={5} onClick={e => setSinal(e.target.value)}>
                names and text Pokedex
              </li>
            </ul>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}