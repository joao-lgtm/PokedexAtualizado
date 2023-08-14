import React, { useState } from "react";

export function TextFromPokedex( species ) {
  const textPokedex = species.species;
  const [texto, setTexto] = useState("");
  const [texto1, setTexto1] = useState("");
  const [textoInfo, setTextoInfo] = useState();
  const [filters, setFilters] = useState([]);

  const handleVersionChange = (event) => {
    const selectedVersion = event.target.value;
    setTexto(selectedVersion);
    const filteredLanguages = textPokedex.filter(
      (element) => element.version.name === selectedVersion
    );
    setFilters(filteredLanguages);
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setTexto1(selectedLanguage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const filteredLanguages = textPokedex.filter(
        (element) => element.version.name === texto && element.language.name === texto1
      );
      setTextoInfo(filteredLanguages);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Escolha um idioma de versão:</label>
        <select
          name="version"
          id="version"
          value={texto}
          onChange={handleVersionChange}
        >
          <option value="">Selecione...</option>
          {textPokedex  &&
            textPokedex.map((element, index) => (
              <option key={index} value={element.version.name}>
                {element.version.name}
              </option>
            ))
    }
        </select>
        {filters.length > 0 && (
          <select
            name='language'
            id='language'
            value={texto1}
            onChange={handleLanguageChange}
          >
            <option value=''>Selecione...</option>
            {filters.map((element, index) => (
              <option key={index} value={element.language.name}>
                {element.language.name}
              </option>
            ))}
          </select>
        )}
        <button type='submit'>Enviar</button>
      </form>

      <div className=''>
            <span>{ textoInfo && textoInfo[0].flavor_text}</span>
      </div>
    </>
  );
}