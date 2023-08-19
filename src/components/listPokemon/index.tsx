import './style.css'
import React, { useState,useEffect } from 'react'
import { Modal } from '../modal';

export function ListPokemon({id,name, sprite}){
    const [modalOpen, setModalOpen] = useState<boolean>();

    function openModal() {
        setModalOpen(true);
    }
      function onClose() {
        setModalOpen(false);
      }

    return(
        <>
            <li className='list-pokemon' >
                <div className= 'list-card' onClick={openModal} >
                    <img src={sprite}/>
                   <div><span>{id} -</span> <span>{name}</span></div>
                </div>
            </li>     
            {modalOpen && <Modal onClose={onClose} id={id}/>}   
            </>
    )
}