import  './style.css';
import React, { useEffect, useState } from 'react';

export function Status({stats}){     
    return (
        <div className='stat'>
        {stats.map(({ base_stat, stat }) => (
          <div className='name-stats'>
            <div className='text-stats'>
              <div>
                <span className='name'>{stat.name} </span>
              </div>
              <div>
                <span className='stats'>{base_stat} </span>
              </div>
            </div>
                <div className='progress-bar'>
                  <div className={`progress-bar-inner-${stat.name}`} style={{ width: `${(base_stat * 100) / 300}%` }}>
                  </div>
                </div>
              <div className='text-left'>
                <span >300</span>
              </div>
          </div>
        ))}
      </div>
    )
}