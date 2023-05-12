import './style.css';


export function Info({weight,height,abilities,isLegendary,isMythical}){
    return(
        <div className="info">
                <div className='weight-and-height'>
                    <div>
                        <span>Peso:</span> <span>{weight}</span>
                    </div>
                    <div>
                        <span>Altura:</span><span>{height}</span>
                    </div>
                    <div>
                    <span>habilidades:</span>
                        {
                        abilities.map(({ability}) => (

                         <p>{ability.name}</p>
                        ))}
                    </div>
                    <div>
                        <span>Lendario:</span> <span>{isLegendary ? 'Sim' : 'Não'}</span>
                    </div>
                    <div>
                        <span>Mitico:</span>   <span>{isMythical ? 'Sim' : 'Não'}</span> 
                    </div>
                    
                </div> 
            </div>       
    )
}