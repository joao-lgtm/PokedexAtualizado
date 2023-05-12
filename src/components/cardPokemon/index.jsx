import './style.css';
import React, { useEffect, useState } from 'react';
import { Status } from '../statusPokemon';
import { Info } from '../infoPokemon';

export function Card({
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
              <li value={1} onClick={() => setSinal(1)}>
                status
              </li>
              <li value={2} onClick={() => setSinal(2)}>
                info
              </li>
            </ul>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}