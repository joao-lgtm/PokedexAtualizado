import arrow_forwards from "../../assets/arrow_forward_ios.svg"
import React, { useState, useEffect } from "react";

export function EvolutioRender ({filterEvolution=[],images=[],forms=[],imagesForms=[],methodLevels=[],imagensItens1,imagensItens2,imagensItens3}){

console.log( filterEvolution,images,forms,imagesForms)
return (
    <div className="evolutions-and-forms">
    <div className="evolutions">
      <h3>evolutions</h3>
      <div className="evolution-container">
      {filterEvolution
        .map((name, index) => (
          <React.Fragment key={index}>
            <div className="mini-card">
              <div className="Name">
                <img style={{ width: "5rem" }} src={images[index]} alt={name} />
                <span>{name}</span>
              </div>
           
            </div>
            {index !== filterEvolution.length - 1 && index === 0 &&
           <div style={{display: 'flex',alignItems:'center'}}>
          
            <div className="level-and-requirements">
              <span>{methodLevels[0][0]}</span>
              <span>{methodLevels[0][2]  === "dark" ?` ${methodLevels[0][1]} membro do time ${methodLevels[0][2]}`: methodLevels[0][0] === "gender" ? methodLevels[0][1] == 2 ? "Man" : "feminino": methodLevels[0][0] === "item" || methodLevels[0][0] === "held_item" ? imagensItens1 && <div className="img-itens"><img src={imagensItens1.url} alt='imagem itens'/><span>{methodLevels[0][1]}</span></div>: methodLevels[0][1]}</span>
              <span>{methodLevels[0][2] === "use-item" ? "" :methodLevels[0][2]} </span>
            </div>
             <img style={{ width: "1.875rem" }} src={arrow_forwards} alt="arrow" />
            </div>
           }
           {index !== filterEvolution.length - 1 &&  name !== "eevee" &&  index === 1 &&
           <div style={{display: 'flex', alignItems:'center'}}>
            
            <div className="level-and-requirements">
              <span>{methodLevels[1][0]}</span>
              <span>{methodLevels[1][2]  === "dark" ?` ${methodLevels[1][1]} membro do time ${methodLevels[1][2]}`: methodLevels[1][0] === "gender" ? methodLevels[1][1] == 2 ? "Man" : "feminino": methodLevels[1][0] === "item" || methodLevels[1][0] === "held_item"? imagensItens2 && <div className="img-itens"><img src={imagensItens2.url} alt='imagem itens'/> <span>{methodLevels[1][1]}</span></div> : methodLevels[1][1]}</span>
              <span>{methodLevels[1][2]  === "use-item" ? "" :methodLevels[1][2]}</span>
            </div>
            <img style={{ width: "1.875rem"}} src={arrow_forwards} alt="arrow" />
            </div>
            }
            {index !== filterEvolution.length - 1 &&  name !== "eevee" &&  index === 2 &&
            <div style={{display: 'flex',alignItems:'center'}}>
            <h3>or</h3>
            <div className="level-and-requirements">
              <span>{methodLevels[2][0]}</span>
              <span>{methodLevels[2][2]  === "dark" ?` ${methodLevels[2][1]} membro do time ${methodLevels[2][2]}`: methodLevels[2][0] === "gender" ? methodLevels[2][1] == 2 ? "Man" : "feminino": methodLevels[2][0] === "item"  || methodLevels[2][0] === "held_item"  ?imagensItens3 && <div className="img-itens"><img src={imagensItens3.url} alt='imagem itens'/> <span>{methodLevels[2][1]}</span></div> : methodLevels[2][1]}</span>
              <span>{methodLevels[2][2] === "use-item" ? "" :methodLevels[2][2]} </span>
            </div>
            <img style={{ width: "1.875rem"}} src={arrow_forwards} alt="arrow" />
            </div>
            }
          </React.Fragment>
        ))}
        </div>
    </div> 
    
     
    
    {forms && forms[0] != undefined &&
        <div className="forms">
          <h3>Forms</h3>
            <div className="forms-container">
                  {forms.map((form, index) =>
                    form !== "null" && form !== undefined ? (
                      <div className="card-forms" key={index}>
                        <div className="Name">
                          <img style={{ width: "5.625rem" }} src={imagesForms[index]} alt={form} />
                          <span>{form}</span>
                        </div>
                      </div>
                      
                    ) : null
                  )}
              </div>
          </div>
      }
  </div>


);

    
}