import './style.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { EvolutioRender } from '../evolutionRender';

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
          evolutionInitialFilter[0][0] ? evolutionInitialFilter[0][0] : "Null",
          evolutionInitialFilter[0][1]?.name ? evolutionInitialFilter[0][1]?.name : evolutionInitialFilter[0][1] ?  evolutionInitialFilter[0][1] : "Null",
          evolutionInitialFilter[1] != undefined ||  evolutionInitialFilter[1] != null ? evolutionInitialFilter[1][1]?.name ? evolutionInitialFilter[1][1]?.name : evolutionInitialFilter[1][1] ?  evolutionInitialFilter[1][1] : "null" : ""
      ];
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
        evolutionMiddleFilter[0][0] ? evolutionMiddleFilter[0][0] : "Null",
        evolutionMiddleFilter[0][1]?.name ? evolutionMiddleFilter[0][1]?.name : evolutionMiddleFilter[0][1] ?  evolutionMiddleFilter[0][1] : "Null",
        evolutionMiddleFilter[1] ? evolutionMiddleFilter[1][1]?.name ? evolutionMiddleFilter[1][1]?.name : evolutionMiddleFilter[1][1] ?  evolutionMiddleFilter[1][1] : "Null" : ""
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
        evolutionFinalFilter[0][0] ? evolutionFinalFilter[0][0]  : "Null",
        evolutionFinalFilter[0][1]?.name ? evolutionFinalFilter[0][1]?.name : evolutionFinalFilter[0][1] ?  evolutionFinalFilter[0][1] : "Null",
        evolutionFinalFilter[1] ? evolutionFinalFilter[1][1]?.name ? evolutionFinalFilter[1][1]?.name : evolutionFinalFilter[1][1] ?  evolutionFinalFilter[1][1] : "Null" : ""
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
    <EvolutioRender
    filterEvolution={filterEvolution}
    forms={forms}
    images={images}
    imagesForms={imagesForms}
    methodLevels={methodLevels}
    imagensItens1={imagensItens1}
    imagensItens2={imagensItens2}
    imagensItens3={imagensItens3}
    />
  );
}
