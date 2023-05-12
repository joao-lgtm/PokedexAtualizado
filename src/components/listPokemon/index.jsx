import './style.css'
import React, { useState,useEffect } from 'react'
import { Modal } from '../../components/modal';

export function ListPokemon({id,name, sprit}){
    const [modalOpen, setModalOpen] = useState();

    function openModal() {
        setModalOpen(true);
    }
      function onClose() {
        setModalOpen(false);
      }

    return(
        <>
            <li className='list-pokemon' >
              <div>
                <div onClick={openModal} >
                    <img src={sprit}/>
                    <p>{id}</p>
                    <p>{name}</p>  
                </div>
                
              </div>
            </li>     
            {modalOpen && <Modal onClose={onClose} id={id}/>}   
            </>
    )
}