import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
    Home,
    Header,
    Navigation,
    IngredientsList,
    RecipesList, 
    TagsList,
    UsersList,
    UtensilsList,
    RecipeItem,
} from './component/index';
import './App.scss';
// import poweroff from '/icons/poweroff.svg'


function App() {    
  return (
    <div className="App">
        <Header />
        <button type='button' className='logout'>
            <img alt='Se déconnecter' src={process.env.PUBLIC_URL + '/icons/icon__power-off.svg'} />
        </button>
        <Navigation />   
        <Routes className='main-content'>
            <Route exact path='/' element={< Home />} />
            <Route exact path='/admin/ingredients' element={< IngredientsList />} />
            <Route exact path='/admin/recipes' element={< RecipesList />} />
            <Route exact path='/admin/tags' element={< TagsList />} />
            <Route exact path='/admin/users' element={< UsersList />} />
            <Route exact path='/admin/utensils' element={< UtensilsList />} />
            <Route exact path='/admin/recipes/:id' element={< RecipeItem />}/>
        </Routes>
    </div>
  );
}

export default App;
