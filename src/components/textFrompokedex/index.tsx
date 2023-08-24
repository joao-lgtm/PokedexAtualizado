import React, { useState , ChangeEvent, FormEvent } from "react";
import { textInfo, textpokedex } from "../../types";
import  './style.css';

export function TextFromPokedex( {species} ) {
  const textPokedex = species;
  console.log(textPokedex)
  const [texto, setTexto] = useState<string>("");
  const [texto1, setTexto1] = useState<string>("");
  const [textoInfo, setTextoInfo] = useState<textInfo>();
  const [filters, setFilters] = useState([]);

  const handleVersionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedVersion = event.target.value;
    setTexto(selectedVersion);
    const filteredLanguages = textPokedex.filter(
      (element) => element.version.name === selectedVersion
    );
    setFilters(filteredLanguages);
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    setTexto1(selectedLanguage);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const filteredLanguages = textPokedex.filter(
        (element) => element.version.name === texto && element.language.name === texto1
      );
      setTextoInfo(filteredLanguages);
  };

  return (
    <>
      <form className='form-language' onSubmit={handleSubmit}>
        <label>Escolha um idioma de versão: </label>
        <select
          className='version-select'
          name="version"
          id="version"
          value={texto}
          onChange={handleVersionChange}
        >
          <option value="">Selecione...</option>
        {
          textPokedex  &&
            textPokedex.map((element, index) => (
              <option key={index} value={element.version.name}>
                {element.version.name}
              </option>
            ))
        }
        </select>
        {
          filters.length > 0 && (
            <select
              className='language-select'
                name='language'
                id='language'
                value={texto1}
                onChange={handleLanguageChange}
            >
              <option value=''>Selecione...</option>
              {filters.map((element: textpokedex, index) => (
                <option key={index} value={element.language.name}>
                  {element.language.name}
                </option>
              ))}
            </select>
        )}
        <button className='button-submit' type='submit'><span className='submit-text'>Enviar</span></button>
      </form>
      <div className='text-container'>
        <div className='title'>
          <span>  Pokedex Text </span>
        </div>
        <div className='text'>
          <span>{ textoInfo && textoInfo[0]?.flavor_text}</span>
        </div>
      </div>
    </>
  );
}