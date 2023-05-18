import './style.css';
import axios from "axios";
import React, { useState, useEffect } from "react";

export function EvolutionAndForms({ id, method_evolution, evolves_from, varieties }) {
  const [evolution, setEvolution] = useState([]);
  const [images, setImages] = useState([]);
  const [forms, setForms] = useState([]);
  const [imagesForms, setImagesForms] = useState([]);
console.log(varieties)
  useEffect(() => {
    const fetchSpritesForms = async (urls) => {
      try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const sprites = responses.map(response => response.data.sprites.other["official-artwork"].front_default);
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
        const sprites = responses.map(response => response.data.sprites.other["official-artwork"].front_default);
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
    }

    if (method_evolution?.chain?.species.name === "eevee") {
      evolutions.forEach((evolution) => {
        urls.push(`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`);
      });
    }

    fetchSprites(urls);
  }, [method_evolution, varieties]);

  useEffect(() => {
    const te = [];
    varieties.forEach((forms2, object) => {
      if (forms2.is_default === false) {
        te.push(forms2.pokemon.name);
        console.log(te)
        setForms([
          te[0],
          te[1],
          te[2]
        ]);
      }
    });

    if (method_evolution?.chain?.species.name === "eevee") {
      const evolutions = method_evolution?.chain?.evolves_to || [];
      const names = evolutions.map(evolution => evolution.species.name);

      setEvolution([
        method_evolution?.chain?.species.name,
        ...names.slice(0, 8).map(name => name || "null")
      ]);
    } else if (method_evolution?.chain?.species.name) {
      setEvolution([
        method_evolution.chain.species.name,
        method_evolution.chain.evolves_to[0]?.species.name || "null",
        method_evolution.chain.evolves_to[0]?.evolves_to[0]?.species.name || "null",
        "null",
        "null"
      ]);
    }
  }, [method_evolution, varieties]);

  return (
    <div className="evolutions">
      {evolution.map((name, index) => 
      // console.log(name, index, "evolutions")
        name !== "null" && (
          <div key={index}>
            <img style={{ width: "100px" }} src={images[index]} alt={name} />
            <span>{name}</span>
          </div>
        )
      
      )}
      {forms.map((form,index) =>(
        // console.log(form ,index, "forms")
       form !== "null" && (
        <div key={index}>
          <img style={{ width: "100px" }} src={imagesForms[index]}/>
          <span>{form}</span>
        </div>
      )
      ))
      }
    </div>
  );
}