
import React from 'react'
import { NavLink } from 'react-router-dom'
import './AppHeader.css'

function AppHeader() {
    return (
        <div className="App-Header">
            <div className="App-Title">
                <h2>Firestore App</h2>
            </div>
            <div className="App-Link">
                <NavLink to='/add-new-item' className="New-Link">+ New Item</NavLink>
            </div>
        </div>
    )
}

export default AppHeader