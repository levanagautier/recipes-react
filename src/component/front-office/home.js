import React, { useState, useEffect } from 'react';

export function Home () {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
      fetch('http://localhost:8080/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
    }, [])

    useEffect(() => {
        console.log(recipes)

    }, [recipes])

    return (
        <section>
            { 
                recipes.map(recipe => (
                    <article key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        {
                            recipe.SubRecipes?.map(subrecipe => (<div>{JSON.stringify(subrecipe.instructions)}</div>))
                        }
                    </article>))
            }
        </section>
    )
}