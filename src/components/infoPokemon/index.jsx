import './style.css';


export function Info({weight,height,abilities,isLegendary,isMythical}){


    function virgula(abilities) {
        if (abilities.length <= 1) {
          return abilities[0].ability.name;
        } else {
          var elementosExcetoUltimo = abilities.slice(0, -1).map(objeto => objeto.ability.name).join(', ');
          return elementosExcetoUltimo + ', ' + abilities[abilities.length - 1].ability.name;
        }
      }
        
    


    return(
        <div className='weight-and-height'>
            <div>
            <span>Peso:</span> <span>{parseFloat(`${weight / 10}`).toFixed(2)}kg ({parseFloat(`${weight / 4.536}`).toFixed(2)} lbs)</span>
            </div>
            <div>
                <span>Altura:</span><span>{parseFloat(`${height/10}`).toFixed(2)}m</span>
            </div>
            <div>
            <span>habilidades:</span>
                <span>
                {
                    virgula(abilities)
                }
                </span> 
            </div>
            <div>
                <span>Lendario:</span> <span>{isLegendary ? 'Sim' : 'Não'}</span>
            </div>
            <div>
                <span>Mitico:</span>   <span>{isMythical ? 'Sim' : 'Não'}</span> 
            </div>                
        </div>   
    )
}