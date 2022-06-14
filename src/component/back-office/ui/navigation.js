import React from 'react';
import { NavLink } from 'react-router-dom';


export function Navigation () {
    return (
        <nav>
            <ul>
                <li><NavLink className={({ isActive }) => 
                      (isActive ? 'active' : '')} to='admin/recipes'>Recipes</NavLink></li>
                <li><NavLink className={({ isActive }) => 
                      (isActive ? 'active' : '')} to='admin/ingredients'>Ingrédients</NavLink></li>
                <li><NavLink className={({ isActive }) => 
                      (isActive ? 'active' : '')} to='admin/utensils'>Ustensiles</NavLink></li>
                <li><NavLink className={({ isActive }) => 
                      (isActive ? 'active' : '')} to='admin/tags'>Tags</NavLink></li>
                <li><NavLink className={({ isActive }) => 
                      (isActive ? 'active' : '')} to='admin/users'>Utilisateurs</NavLink></li>
            </ul>
        </nav>
    )
}