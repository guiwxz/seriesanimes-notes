import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiDelete, FiChevronRight, FiHash, FiPlay, FiCheck, FiX } from 'react-icons/fi'
import { Tooltip } from '@material-ui/core';

import Header from '../Header'

import './styles.css'

import addAnimeOnStorage from '../../utils/addAnimeOnStorage'

export default function List() {
    const state = useSelector(state => state) // o return dessa func é oq a gente quer usar la do store
                                              // nesse caso é tudo    
    const dispatch = useDispatch();

    function addAnime(title, tipo) {
      addAnimeOnStorage(title, tipo);
      dispatch({ 
        type: 'ADD_ANIME',
        title,  
        tipo,
      })
    }

    function removeAnime(i, tipo){    
      dispatch({
        type: 'REMOVE_ANIME',
        tipo,
        pos: i
      })

    }   

    function changeAnimeEp(e, i){
      dispatch({
        type: 'CHANGE_ANIME_EP',
        pos: i,
        value: e.target.value
      })
    }

    function changeTimesEnded(e, i){
      dispatch({
        type: 'CHANGE_TIMES_ENDED',
        pos: i,
        value: e.target.value
      })
    }

    function setWatching(i, title){
      addAnime(title, "watching");
      removeAnime(i, "toWatch")
    }

    function setEnded(i, title, eps){
      const titleWithCounter = `${title} (${eps})`;

      addAnime(titleWithCounter, "ended");
      removeAnime(i, "watching")
    }
    

    return (
        <div className="list-content">
            <div className="header-section">
              {state.watchingActive && <Header tipo="watching" title="WATCHING"/>}
              {state.toWatchActive && <Header tipo="toWatch" title="TO WATCH"/>}
              {state.endedActive && <Header tipo="ended" title="ENDED"/>}
              {state.editActive && <Header tipo="edit" title="<EDIT>"/>}
            </div>

            <div className="list-section">             
              <ul>
                {state.watchingActive && state.watching.map((anime, i) => (
                  <div key={i} className="div-list">
                    <li><FiChevronRight size={15} style={{marginRight: '5px'}}/>{anime}</li>
                    <div className="watching-ep-div">
                      <i>Ep: </i><input type="number" value={state.watchingEp[i]} className="ep-input" min="0" onChange={(e) => changeAnimeEp(e, i)} />
                      <Tooltip title="Set Ended">
                        <button className="setEnded-button" onClick={() => {setEnded(i, anime, state.watchingEp[i])}}><FiCheck size={20}/></button>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <button className="delete-button" onClick={() => {removeAnime(i, 'watching')}}><FiX size={20} /></button>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </ul>
              
              <ul>
                {state.toWatchActive && state.toWatch.map((anime, i) => (
                  <div key={i} className="div-list">
                    <li style={{display: 'flex', alignItems: 'center'}}>
                      <Tooltip title="Set Watching">
                        <button onClick={(e) => setWatching(i, anime)} className="setWatching-button">
                          <FiPlay size={15} className="setWatching-icon"/>
                        </button>
                      </Tooltip>
                      {anime}
                    </li>                   
                    <button className="delete-button" onClick={() => {removeAnime(i, 'toWatch')}}><FiDelete size={20}/></button>
                  </div>
                ))}
              </ul>
             
              <ul>
                {state.endedActive && state.ended.map((anime, i) => (
                  <div key={i} className="div-list">
                    <li style={{listStyle: 'decimal', marginLeft: '20px'}}>{anime}</li>
                    <div className="ended-times-div">
                      <div>
                        <i style={{fontSize: '14px'}}>x</i><input type="number" value={state.timesEnded[i]} className="times-input" min="1" onChange={(e) => changeTimesEnded(e, i)} />
                      </div>
                      <button className="delete-button" onClick={() => {removeAnime(i, 'ended')}}><FiDelete size={20}/></button>
                    </div>
                  </div>
                ))}
              </ul>

              <ul>
                {state.editActive && state.edit.map((anime, i) => (
                  <div key={i} className="div-list">
                    <li><FiHash size={15} style={{marginRight: '7px'}}/>{anime}</li>
                    <button className="delete-button" onClick={() => {removeAnime(i, 'edit')}}><FiDelete size={20}/></button>
                  </div>
                ))}
              </ul>            
            </div>
        </div>
    )
}










/*
{watching && <Header title="Watching"/>}
          {watching && watchingAnimesArray.map((anime,i) => (
            <li key={i}>{anime}</li>
          ))}
          {toWatch && <Header title="To Watch"/>}
          {toWatch && toWatchAnimes.map((anime,i) => (
            <li key={i}>{anime}</li>
          ))}
*/