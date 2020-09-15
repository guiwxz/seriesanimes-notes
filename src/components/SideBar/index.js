import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import './styles.css';

export default function SideBar() {
    const dispatch = useDispatch();

    const [activeClass, setActiveClass] = useState('watching');
    const editTitle = localStorage.getItem('editTitle');

    function setActive(tipo){
        dispatch({
            type: "SET_ACTIVE",
            tipo
        })
    }

    return (
        <div className="buttons-section">
            <button className={activeClass === "watching" ? "active-button" : "sidebar-button"} onClick={() => {setActive("watching"); setActiveClass("watching")}}>WATCHING</button>
            <button className={activeClass === "toWatch" ? "active-button" : "sidebar-button"} onClick={() => {setActive("toWatch"); setActiveClass("toWatch")}}>TO WATCH</button>
            <button className={activeClass === "ended" ? "active-button" : "sidebar-button"} onClick={() => {setActive("ended"); setActiveClass("ended")}}>ENDED</button>
            <button className={activeClass === "edit" ? "active-button" : "sidebar-button"} onClick={() => {setActive("edit"); setActiveClass("edit")}}>{editTitle}</button>
        </div>
    )
}
