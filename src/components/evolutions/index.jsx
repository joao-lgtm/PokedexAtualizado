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
  const [imagensItens1, setimagensItens1]   = useState();
  const [imagensItens2, setimagensItens2]   = useState();
  const [imagensItens3, setimagensItens3]   = useState();



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
          evolutionInitialFilter[1] != undefined ||  evolutionInitialFilter[1] != null ? evolutionInitialFilter[1][1]?.name ? evolutionInitialFilter[1][1]?.name : evolutionInitialFilter[1][1] ?  evolutionInitialFilter[1][1] : "null" : ""
      ];
      console.log(evolutionArray1,'aqui')
    if(evolutionArray1[0] === "item"){
      const name = evolutionArray1[1]
      
      const url = `https://pokeapi.co/api/v2/item/${name}/`
      axios.get(url)
      .then(response => {
         const data = response.data.sprites.default
        setimagensItens1({
          url: data
        })
        
      })
      .catch(err => { console.error(err) });}
      else if(evolutionArray1[0] === "held_item" && evolutionArray1[0] != undefined){
        const name = evolutionArray1[1]
        const url = `https://pokeapi.co/api/v2/item/${name}/`
        axios.get(url)
        .then(response => {
           const data = response.data.sprites.default
          setimagensItens1({
            url: data
          })
        })
        .catch(err => { console.error(err) });}

      
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

    if(evolutionArray2 === undefined){
    ""
      }else{
          const name = evolutionArray2[1]
      const url = `https://pokeapi.co/api/v2/item/${name}/`
      axios.get(url)
      .then(response => {
         const data = response.data.sprites.default
         console.log(data)
        setimagensItens2({
          url: data
        })
      })
      .catch(err => 
        { console.error(err) });
      }

    if(evolutionFinal != undefined){
      const evolutionFinalObject = Object.entries(evolutionFinal)
      const evolutionFinalFilter = evolutionFinalObject.filter(itens => itens[1] != null && itens[1] != false)
      
      evolutionArray3 = [
        evolutionFinalFilter[0][0] ? evolutionFinalFilter[0][0]  : "aqui",
        evolutionFinalFilter[0][1]?.name ? evolutionFinalFilter[0][1]?.name : evolutionFinalFilter[0][1] ?  evolutionFinalFilter[0][1] : "aqui",
        evolutionFinalFilter[1] ? evolutionFinalFilter[1][1]?.name ? evolutionFinalFilter[1][1]?.name : evolutionFinalFilter[1][1] ?  evolutionFinalFilter[1][1] : "aqui" : ""
      ];
      if(evolutionArray3[0] === "item" && evolutionArray3[0] != undefined){
        const name = evolutionArray3[1]
        const url = `https://pokeapi.co/api/v2/item/${name}/`
        axios.get(url)
        .then(response => {
           const data = response.data.sprites.default
          setimagensItens3({
            url: data
          })
        })
        .catch(err => { console.error(err) });}
        else if(evolutionArray3[0] === "held_item" && evolutionArray3[0] != undefined){
          const name = evolutionArray3[1]
          const url = `https://pokeapi.co/api/v2/item/${name}/`
          axios.get(url)
          .then(response => {
             const data = response.data.sprites.default
            setimagensItens3({
              url: data
            })
          })
          .catch(err => { console.error(err) });}
    }

    setMethodLevels([
      evolutionArray1 ? evolutionArray1 : "null",
      evolutionArray2 ? evolutionArray2 : "null",
      evolutionArray3 ? evolutionArray3 : "null"
    ]);
    
    
    
    
    }
  }, [method_evolution, varieties]);

  const filterEvolution = evolution.filter(evolution => evolution != 'null');



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
                  <img style={{ width: "80px" }} src={images[index]} alt={name} />
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
               <img style={{ width: "30px" }} src={arrow_forwards} alt="arrow" />
              </div>
             }
             {index !== filterEvolution.length - 1 &&  name !== "eevee" &&  index === 1 &&
             <div style={{display: 'flex', alignItems:'center'}}>
              
              <div className="level-and-requirements">
                <span>{methodLevels[1][0]}</span>
                <span>{methodLevels[1][2]  === "dark" ?` ${methodLevels[1][1]} membro do time ${methodLevels[1][2]}`: methodLevels[1][0] === "gender" ? methodLevels[1][1] == 2 ? "Man" : "feminino": methodLevels[1][0] === "item" || methodLevels[1][0] === "held_item"? imagensItens2 && <div className="img-itens"><img src={imagensItens2.url} alt='imagem itens'/> <span>{methodLevels[1][1]}</span></div> : methodLevels[1][1]}</span>
                <span>{methodLevels[1][2]  === "use-item" ? "" :methodLevels[1][2]}</span>
              </div>
              <img style={{ width: "30px"}} src={arrow_forwards} alt="arrow" />
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
                            <img style={{ width: "90px" }} src={imagesForms[index]} alt={form} />
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
