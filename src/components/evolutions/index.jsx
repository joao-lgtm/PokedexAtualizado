import './style.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import arrow_forwards from "../../assets/arrow_forward_ios.svg"

export function EvolutionAndForms({method_evolution,  varieties }) {
  const [evolution, setEvolution]       = useState([]);
  const [methodLevels, setMethodLevels] = useState([]);
  const [images, setImages]             = useState([]);
  const [forms, setForms]               = useState([]);
  const [imagesForms, setImagesForms]   = useState([]);
  const [itemImageUrl, setItemImageUrl] = useState(null);


  useEffect(() => {
    const fetchSpritesForms = async (urls) => {
      try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const sprites   = responses.map(response => response.data.sprites.other["official-artwork"].front_default);
        const newImages = sprites.map((sprite) => sprite || 'valor padrão');
        setImagesForms(newImages);
      } catch (error) {
        console.error(error);
      }
    };

    const urlsForms = [];
    varieties.forEach((pokemon) => {
      if (pokemon.is_default === false) {
        urlsForms.push(pokemon.pokemon.url);
      }
    });

    fetchSpritesForms(urlsForms);

    const fetchSprites = async (urls) => {
      try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const sprites   = responses.map(response => response.data.sprites.other["official-artwork"].front_default);
        const newImages = sprites.map((sprite) => sprite || 'valor padrão');
        setImages(newImages);
        
      } catch (error) {
        console.error(error);
      }
    };
    
    const urls = [];

    if (method_evolution) {
      urls.push(`https://pokeapi.co/api/v2/pokemon/${method_evolution.chain.species.name}`);
    }

    const evolutions = method_evolution?.chain?.evolves_to;
    if (evolutions?.length > 0 && method_evolution?.chain?.species.name !== "eevee") {
      urls.push(`https://pokeapi.co/api/v2/pokemon/${evolutions[0].species.name}`);
      if (evolutions[0].evolves_to.length > 0 && method_evolution?.chain?.species.name !== "eevee") {
        urls.push(`https://pokeapi.co/api/v2/pokemon/${evolutions[0].evolves_to[0].species.name}`);
      }
      if (evolutions[0].evolves_to.length > 1 && method_evolution?.chain?.species.name !== "eevee") {
        urls.push(`https://pokeapi.co/api/v2/pokemon/${evolutions[0].evolves_to[1]?.species.name}` || '');
      }
    }
    if (method_evolution?.chain?.species.name === "eevee") {
      evolutions.forEach((evolution) => {
        urls.push(`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`);
      });
    }
    fetchSprites(urls);
  }, [method_evolution, varieties]);

  useEffect(() => {
    let evolutionArray1
    let evolutionArray2
    let evolutionArray3
    const te = [];
    varieties.forEach((forms2, object) => {
      if (forms2.is_default === false) {
        te.push(forms2.pokemon.name);
        setForms([
          te[0],
          te[1],
          te[2]
        ]);
      }
    });
  
    if (method_evolution?.chain?.species.name === "eevee") {
      const evolutions  = method_evolution?.chain?.evolves_to || [];
      const names       = evolutions.map(evolution => evolution.species.name);
  
      setEvolution([
        method_evolution?.chain?.species.name,
        ...names.slice(0, 8).map(name => name || "null")
      ]);
    }  if (method_evolution?.chain?.species.name) {

      const evolutionInitial  = method_evolution.chain.evolves_to[0]?.evolution_details[0];
      const evolutionMiddle   = method_evolution.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0];
      const evolutionFinal    = method_evolution.chain.evolves_to[0]?.evolves_to[1]?.evolution_details[0];

      setEvolution([
        method_evolution.chain.species.name,
        method_evolution.chain.evolves_to[0]?.species.name || "null",
        method_evolution.chain.evolves_to[0]?.evolves_to[0]?.species.name || "null",
        method_evolution.chain.evolves_to[0]?.evolves_to[1]?.species.name || "null",
      ]);

      if(evolutionInitial != undefined){
      const EvolutionInitialObject = Object.entries(evolutionInitial)
      const evolutionInitialFilter = EvolutionInitialObject.filter(itens => itens[1] != null && itens[1] != false)
      evolutionArray1 = [
          evolutionInitialFilter[0][0] ? evolutionInitialFilter[0][0] : "aqui",
          evolutionInitialFilter[0][1]?.name ? evolutionInitialFilter[0][1]?.name : evolutionInitialFilter[0][1] ?  evolutionInitialFilter[0][1] : "aqui",
          evolutionInitialFilter[1][1]?.name ? evolutionInitialFilter[1][1]?.name : evolutionInitialFilter[1][1] ?  evolutionInitialFilter[1][1] : "aqui"
      ];

      
    }
    if(evolutionMiddle != undefined){
      const EvolutionMiddleObject = Object.entries(evolutionMiddle)
      const evolutionMiddleFilter = EvolutionMiddleObject.filter(itens => itens[1] != null && itens[1] != false)
      evolutionArray2 = [
        evolutionMiddleFilter[0][0] ? evolutionMiddleFilter[0][0] : "aqui",
        evolutionMiddleFilter[0][1]?.name ? evolutionMiddleFilter[0][1]?.name : evolutionMiddleFilter[0][1] ?  evolutionMiddleFilter[0][1] : "aqui",
        evolutionMiddleFilter[1] ? evolutionMiddleFilter[1][1]?.name ? evolutionMiddleFilter[1][1]?.name : evolutionMiddleFilter[1][1] ?  evolutionMiddleFilter[1][1] : "aqui" : ""
      ];
    }

    if(evolutionFinal != undefined){
      const evolutionFinalObject = Object.entries(evolutionFinal)
      const evolutionFinalFilter = evolutionFinalObject.filter(itens => itens[1] != null && itens[1] != false)
      
      evolutionArray3 = [
        evolutionFinalFilter[0][0] ? evolutionFinalFilter[0][0]  : "aqui",
        evolutionFinalFilter[0][1]?.name ? evolutionFinalFilter[0][1]?.name : evolutionFinalFilter[0][1] ?  evolutionFinalFilter[0][1] : "aqui",
        evolutionFinalFilter[1] ? evolutionFinalFilter[1][1]?.name ? evolutionFinalFilter[1][1]?.name : evolutionFinalFilter[1][1] ?  evolutionFinalFilter[1][1] : "aqui" : ""
      ];
    }

    setMethodLevels([
      evolutionArray1 ? evolutionArray1 : "null",
      evolutionArray2 ? evolutionArray2 : "null",
      evolutionArray3 ? evolutionArray3 : "null"
    ]);
    

    
    }
  }, [method_evolution, varieties]);

  function getImagesItens(name) {
    const url = `https://pokeapi.co/api/v2/item/${name}/`;
  
    return axios
      .get(url)
      .then(response => {
        const data = response.data;
        setItemImageUrl(data.sprites.default)
        return itemImageUrl
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  const filterEvolution = evolution.filter(evolution => evolution != 'null');
  return (
    <div className="evolutions-and-forms">
      <div className="evolutions">
        {filterEvolution
          .map((name, index) => (
            <React.Fragment key={index}>
              <div className="mini-card">
                <img style={{ width: "80px" }} src={images[index]} alt={name} />
                <span>{name}</span>
              </div>
              
             {index !== filterEvolution.length - 1 && name !== "eevee" && <img style={{ width: "30px" }} src={arrow_forwards} alt="arrow" />}

             {index !== filterEvolution.length - 1 && index === 0 &&<div className="level-and-requirements">
              <span>{methodLevels[0][0]}</span>
              <span>{methodLevels[0][2]  === "dark" ?` ${methodLevels[0][1]} membro do time ${methodLevels[0][2]}`: methodLevels[0][0] === "gender" ? methodLevels[0][1] == 2 ? "Man" : "feminino": methodLevels[0][0] === "item" ? <img src={getImagesItens(methodLevels[0][1])}/>: methodLevels[0][1]}</span>
              <span>{methodLevels[0][2]} </span>
             </div>}
             {index !== filterEvolution.length - 1 &&  index === 1 && <div className="level-and-requirements">
             <span>{methodLevels[1][0]}</span>
              <span>{methodLevels[1][1]}</span>
              <span>{methodLevels[1][2]} </span>
              </div>}
              {index !== filterEvolution.length - 1 &&  name !== "eevee" &&  index === 2 && <div className="level-and-requirements">
             <span>{methodLevels[2][0]}</span>
              <span>{methodLevels[2][2]  === "dark" ?` ${methodLevels[2][1]} membro do time ${methodLevels[2][2]}`: methodLevels[2][0] === "gender" ? methodLevels[2][1] == 2 ? "Man" : "feminino": methodLevels[2][0] === "item" ? getImagesItens(methodLevels[2][1]) : methodLevels[2][1]}</span>
              <span>{methodLevels[2][2]} </span>
              </div>}
              {name === "eevee" && (
                <img style={{ width: "30px" }} src={arrow_forwards} alt="arrow" />
              )}
            </React.Fragment>
            
          ))}
    
     
    
      </div> 
      
       


      
      <div className="forms">
        {forms.map((form, index) =>
          form !== "null" && form !== undefined ? (
            <div className="mini-card" key={index}>
              <img style={{ width: "90px" }} src={imagesForms[index]} alt={form} />
              <span>{form}</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}