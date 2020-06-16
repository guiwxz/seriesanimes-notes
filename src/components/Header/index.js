import React, { useState } from 'react';
import { useDispatch } from 'react-redux' 
import { FiPlusSquare, FiEdit, FiCheckSquare } from 'react-icons/fi'
import './styles.css';


export default function Header(props){
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const [editName, setEditName] = useState(localStorage.getItem('editTitle') || 'Edit Title');
    const [edit, setEdit] = useState(false);


    function addAnime(title) {
      localStorage.setItem(props.tipo, localStorage.getItem(props.tipo) !== null ? localStorage.getItem(props.tipo)+","+title : title);
      dispatch({ 
        type: 'ADD_ANIME',
        title,  
        tipo: props.tipo
      })
      setTitle('');
    }

    function editSection(name){
      localStorage.setItem('editTitle', name);
      setEdit(false);
    }
    
    return(
      !edit ? (
          <header>
            <div className="edit-button">
              <h1>{props.tipo !== "edit" ? props.title : editName}</h1>
              {props.tipo === "edit" && 
                <button className="reset-button" onClick={() => {setEdit(true)}}><FiEdit size={17} /></button>
              }
            </div>
            
            <div className="add-new">
                <input spellCheck="false" placeholder="Add new" value={title} onChange={ e => setTitle(e.target.value) }/>
                <button className="reset-button" onClick={() => addAnime(title)}><FiPlusSquare size={25}/></button>
            </div>
          </header>
      ) : (
          <header>
            <div className="edit-button">
              <h1>{editName}</h1>            
            </div>

            <div className="edit-div">
              <input maxLength="" value={editName} spellCheck="false" className="edit-input" placeholder="Edit section title" onChange={e => setEditName(e.target.value) }/>
              <button className="reset-button" onClick={() => editSection(editName)}><FiCheckSquare size={22}/></button>
            </div>
          </header>
      )
    )
}
